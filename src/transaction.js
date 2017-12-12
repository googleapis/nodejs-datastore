/*!
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var arrify = require('arrify');
var common = require('@google-cloud/common');
var flatten = require('lodash.flatten');
var is = require('is');
var prop = require('propprop');
var util = require('util');

var entity = require('./entity.js');
var Request = require('./request.js');

/**
 * A transaction is a set of Datastore operations on one or more entities. Each
 * transaction is guaranteed to be atomic, which means that transactions are
 * never partially applied. Either all of the operations in the transaction are
 * applied, or none of them are applied.
 *
 * @see [Transactions Reference]{@link https://cloud.google.com/datastore/docs/concepts/transactions}
 *
 * @class
 * @extends {Request}
 * @param {Datastore} datastore A Datastore instance.
 * @mixes module:datastore/request
 *
 * @example
 * const Datastore = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 * const transaction = datastore.transaction();
 */
function Transaction(datastore, options) {
  /**
   * @name Transaction#datastore
   * @type {Datastore}
   */
  this.datastore = datastore;

  /**
   * @name Transaction#projectId
   * @type {string}
   */
  this.projectId = datastore.projectId;
  /**
   * @name Transaction#namespace
   * @type {string}
   */
  this.namespace = datastore.namespace;

  options = options || {};

  this.id = options.id;
  this.readOnly = options.readOnly === true;

  this.request = datastore.request_.bind(datastore);

  // A queue for entity modifications made during the transaction.
  this.modifiedEntities_ = [];

  // Queue the callbacks that process the API responses.
  this.requestCallbacks_ = [];

  // Queue the requests to make when we send the transactional commit.
  this.requests_ = [];
}

util.inherits(Transaction, Request);

/*! Developer Documentation
 *
 * Below, we override two methods that we inherit from DatastoreRequest:
 * `delete` and `save`. This is done because:
 *
 *   A) the documentation needs to be different for a transactional save, and
 *   B) we build up a "modifiedEntities_" array on this object, used to build
 *      the final commit request with.
 */

/**
 * Commit the remote transaction and finalize the current transaction instance.
 *
 * If the commit request fails, we will automatically rollback the transaction.
 *
 * @param {object} [gaxOptions] Request configuration options, outlined here:
 *     https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this request.
 *   If the commit fails, we automatically try to rollback the transaction (see
 *   {module:datastore/transaction#rollback}).
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * const Datastore = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 * const transaction = datastore.transaction();
 *
 * transaction.commit(function(err, apiResponse) {
 *   if (err) {
 *     // Transaction could not be committed.
 *   }
 * });
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * transaction.commit().then(function(data) {
 *   var apiResponse = data[0];
 * });
 */
Transaction.prototype.commit = function(gaxOptions, callback) {
  var self = this;

  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  callback = callback || common.util.noop;

  if (this.skipCommit) {
    setImmediate(callback);
    return;
  }

  var keys = {};

  this.modifiedEntities_
    // Reverse the order of the queue to respect the "last queued request wins"
    // behavior.
    .reverse()
    // Limit the operations we're going to send through to only the most
    // recently queued operations. E.g., if a user tries to save with the same
    // key they just asked to be deleted, the delete request will be ignored,
    // giving preference to the save operation.
    .filter(function(modifiedEntity) {
      var key = modifiedEntity.entity.key;

      if (!entity.isKeyComplete(key)) {
        return true;
      }

      var stringifiedKey = JSON.stringify(modifiedEntity.entity.key);

      if (!keys[stringifiedKey]) {
        keys[stringifiedKey] = true;
        return true;
      }
    })
    // Group entities together by method: `save` mutations, then `delete`. Note:
    // `save` mutations being first is required to maintain order when assigning
    // IDs to incomplete keys.
    .sort(function(a, b) {
      return a.method < b.method ? 1 : a.method > b.method ? -1 : 0;
    })
    // Group arguments together so that we only make one call to each method.
    // This is important for `DatastoreRequest.save`, especially, as that method
    // handles assigning auto-generated IDs to the original keys passed in. When
    // we eventually execute the `save` method's API callback, having all the
    // keys together is necessary to maintain order.
    .reduce(function(acc, entityObject) {
      var lastEntityObject = acc[acc.length - 1];
      var sameMethod =
        lastEntityObject && entityObject.method === lastEntityObject.method;

      if (!lastEntityObject || !sameMethod) {
        acc.push(entityObject);
      } else {
        lastEntityObject.args = lastEntityObject.args.concat(entityObject.args);
      }

      return acc;
    }, [])
    // Call each of the mutational methods (DatastoreRequest[save,delete]) to
    // build up a `req` array on this instance. This will also build up a
    // `callbacks` array, that is the same callback that would run if we were
    // using `save` and `delete` outside of a transaction, to process the
    // response from the API.
    .forEach(function(modifiedEntity) {
      var method = modifiedEntity.method;
      var args = modifiedEntity.args.reverse();

      Request.prototype[method].call(self, args, common.util.noop);
    });

  // Take the `req` array built previously, and merge them into one request to
  // send as the final transactional commit.
  var reqOpts = {
    mutations: flatten(this.requests_.map(prop('mutations'))),
  };

  this.request_(
    {
      client: 'DatastoreClient',
      method: 'commit',
      reqOpts: reqOpts,
      gaxOpts: gaxOptions,
    },
    function(err, resp) {
      if (err) {
        // Rollback automatically for the user.
        self.rollback(function() {
          // Provide the error & API response from the failed commit to the user.
          // Even a failed rollback should be transparent.
          // RE: https://github.com/GoogleCloudPlatform/google-cloud-node/pull/1369#discussion_r66833976
          callback(err, resp);
        });
        return;
      }

      // The `callbacks` array was built previously. These are the callbacks that
      // handle the API response normally when using the DatastoreRequest.save and
      // .delete methods.
      self.requestCallbacks_.forEach(function(cb) {
        cb(null, resp);
      });

      callback(null, resp);
    }
  );
};

/**
 * Create a query for the specified kind. See {module:datastore/query} for all
 * of the available methods.
 *
 * @see [Datastore Queries]{@link https://cloud.google.com/datastore/docs/concepts/queries}
 *
 * @see {@link Query}
 *
 * @param {string} [namespace] Namespace.
 * @param {string} kind The kind to query.
 * @returns {Query}
 *
 * @example
 * const Datastore = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 * const transaction = datastore.transaction();
 *
 * // Run the query inside the transaction.
 * transaction.run(function(err) {
 *   if (err) {
 *     // Error handling omitted.
 *   }
 *
 *   var query = transaction.createQuery('Company');
 *
 *   query.run(function(err, entities) {
 *     if (err) {
 *       // Error handling omitted.
 *     }
 *
 *     transaction.commit(function(err) {
 *       if (!err) {
 *         // Transaction committed successfully.
 *       }
 *     });
 *   });
 * });
 */
Transaction.prototype.createQuery = function() {
  return this.datastore.createQuery.apply(this, arguments);
};

/**
 * Delete all entities identified with the specified key(s) in the current
 * transaction.
 *
 * @param {Key|Key[]} key Datastore key object(s).
 *
 * @example
 * const Datastore = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 * const transaction = datastore.transaction();
 *
 * transaction.run(function(err) {
 *   if (err) {
 *     // Error handling omitted.
 *   }
 *
 *   // Delete a single entity.
 *   transaction.delete(datastore.key(['Company', 123]));
 *
 *   // Delete multiple entities at once.
 *   transaction.delete([
 *     datastore.key(['Company', 123]),
 *     datastore.key(['Product', 'Computer'])
 *   ]);
 *
 *   transaction.commit(function(err) {
 *     if (!err) {
 *       // Transaction committed successfully.
 *     }
 *   });
 * });
 */
Transaction.prototype.delete = function(entities) {
  var self = this;

  arrify(entities).forEach(function(ent) {
    self.modifiedEntities_.push({
      entity: {
        key: ent,
      },
      method: 'delete',
      args: [ent],
    });
  });
};

/**
 * Reverse a transaction remotely and finalize the current transaction instance.
 *
 * @param {object} [gaxOptions] Request configuration options, outlined here:
 *     https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this request.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * const Datastore = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 * const transaction = datastore.transaction();
 *
 * transaction.run(function(err) {
 *   if (err) {
 *     // Error handling omitted.
 *   }
 *
 *   transaction.rollback(function(err) {
 *     if (!err) {
 *       // Transaction rolled back successfully.
 *     }
 *   });
 * });
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * transaction.rollback().then(function(data) {
 *   var apiResponse = data[0];
 * });
 */
Transaction.prototype.rollback = function(gaxOptions, callback) {
  var self = this;

  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  callback = callback || common.util.noop;

  this.request_(
    {
      client: 'DatastoreClient',
      method: 'rollback',
      gaxOpts: gaxOptions,
    },
    function(err, resp) {
      self.skipCommit = true;

      callback(err || null, resp);
    }
  );
};

/**
 * Begin a remote transaction. In the callback provided, run your transactional
 * commands.
 *
 * @param {object} [options] Configuration object.
 * @param {object} [options.gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
 * @param {boolean} [options.readOnly=false] A read-only transaction cannot
 *     modify entities.
 * @param {string} [options.transactionId] The ID of a previous transaction.
 * @param {function} callback The function to execute within the context of
 *     a transaction.
 * @param {?error} callback.err An error returned while making this request.
 * @param {Transaction} callback.transaction This transaction
 *     instance.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * const Datastore = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 * const transaction = datastore.transaction();
 *
 * transaction.run(function(err, transaction) {
 *   // Perform Datastore transactional operations.
 *   var key = datastore.key(['Company', 123]);
 *
 *   transaction.get(key, function(err, entity) {
 *     entity.name = 'Google';
 *
 *     transaction.save({
 *       key: key,
 *       data: entity
 *     });
 *
 *     transaction.commit(function(err) {
 *       if (!err) {
 *         // Data saved successfully.
 *       }
 *     });
 *   });
 * });
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * transaction.run().then(function(data) {
 *   var transaction = data[0];
 *   var apiResponse = data[1];
 * });
 */
Transaction.prototype.run = function(options, callback) {
  var self = this;

  if (is.fn(options)) {
    callback = options;
    options = {};
  }

  options = options || {};
  callback = callback || common.util.noop;

  var reqOpts = {
    transactionOptions: {},
  };

  if (options.readOnly || this.readOnly) {
    reqOpts.transactionOptions.readOnly = {};
  }

  if (options.transactionId || this.id) {
    reqOpts.transactionOptions.readWrite = {
      previousTransaction: options.transactionId || this.id,
    };
  }

  if (options.transactionOptions) {
    reqOpts.transactionOptions = options.transactionOptions;
  }

  this.request_(
    {
      client: 'DatastoreClient',
      method: 'beginTransaction',
      reqOpts: reqOpts,
      gaxOpts: options.gaxOptions,
    },
    function(err, resp) {
      if (err) {
        callback(err, null, resp);
        return;
      }

      self.id = resp.transaction;

      callback(null, self, resp);
    }
  );
};

/**
 * Insert or update the specified object(s) in the current transaction. If a key
 * is incomplete, its associated object is inserted and the original Key object
 * is updated to contain the generated ID.
 *
 * This method will determine the correct Datastore method to execute (`upsert`,
 * `insert`, or `update`) by using the key(s) provided. For example, if you
 * provide an incomplete key (one without an ID), the request will create a new
 * entity and have its ID automatically assigned. If you provide a complete key,
 * the entity will be updated with the data specified.
 *
 * By default, all properties are indexed. To prevent a property from being
 * included in *all* indexes, you must supply an `excludeFromIndexes` array. See
 * below for an example.
 *
 * @param {object|object[]} entities Datastore key object(s).
 * @param {Key} entities.key Datastore key object.
 * @param {string[]} [entities.excludeFromIndexes] Exclude properties from
 *     indexing using a simple JSON path notation. See the example below to see
 *     how to target properties at different levels of nesting within your
 *     entity.
 * @param {object} entities.data Data to save with the provided key.
 *
 * @example
 * <caption>Save a single entity.</caption>
 * const Datastore = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 * const transaction = datastore.transaction();
 *
 * // Notice that we are providing an incomplete key. After the transaction is
 * // committed, the Key object held by the `key` variable will be populated
 * // with a path containing its generated ID.
 * //-
 * const key = datastore.key('Company');
 *
 * transaction.run(function(err) {
 *   if (err) {
 *     // Error handling omitted.
 *   }
 *
 *   transaction.save({
 *     key: key,
 *     data: {
 *       rating: '10'
 *     }
 *   });
 *
 *   transaction.commit(function(err) {
 *     if (!err) {
 *       // Data saved successfully.
 *     }
 *   });
 * });
 *
 * @example
 * const Datastore = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 * const transaction = datastore.transaction();
 *
 * // Use an array, `excludeFromIndexes`, to exclude properties from indexing.
 * // This will allow storing string values larger than 1500 bytes.
 *
 * transaction.run(function(err) {
 *   if (err) {
 *     // Error handling omitted.
 *   }
 *
 *   transaction.save({
 *     key: key,
 *     excludeFromIndexes: [
 *       'description',
 *       'embeddedEntity.description',
 *       'arrayValue[].description'
 *     ],
 *     data: {
 *       description: 'Long string (...)',
 *       embeddedEntity: {
 *         description: 'Long string (...)'
 *       },
 *       arrayValue: [
 *         {
 *           description: 'Long string (...)'
 *         }
 *       ]
 *     }
 *   });
 *
 *   transaction.commit(function(err) {
 *     if (!err) {
 *       // Data saved successfully.
 *     }
 *   });
 * });
 *
 * @example
 * <caption>Save multiple entities at once.</caption>
 * const Datastore = require('@google-cloud/datastore');
 * const datastore = new Datastore();
 * const transaction = datastore.transaction();
 * const companyKey = datastore.key(['Company', 123]);
 * const productKey = datastore.key(['Product', 'Computer']);
 *
 * transaction.run(function(err) {
 *   if (err) {
 *     // Error handling omitted.
 *   }
 *
 *   transaction.save([
 *     {
 *       key: companyKey,
 *       data: {
 *         HQ: 'Dallas, TX'
 *       }
 *     },
 *     {
 *       key: productKey,
 *       data: {
 *         vendor: 'Dell'
 *       }
 *     }
 *   ]);
 *
 *   transaction.commit(function(err) {
 *     if (!err) {
 *       // Data saved successfully.
 *     }
 *   });
 * });
 */
Transaction.prototype.save = function(entities) {
  var self = this;

  arrify(entities).forEach(function(ent) {
    self.modifiedEntities_.push({
      entity: {
        key: ent.key,
      },
      method: 'save',
      args: [ent],
    });
  });
};

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Transaction, {
  exclude: ['createQuery', 'delete', 'save'],
});

/**
 * Reference to the {@link Transaction} class.
 * @name module:@google-cloud/datastore.Transaction
 * @see Transaction
 */
module.exports = Transaction;
