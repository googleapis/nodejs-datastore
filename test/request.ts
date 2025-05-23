// Copyright 2014 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as pfy from '@google-cloud/promisify';
import * as assert from 'assert';
import {after, afterEach, before, beforeEach, describe, it} from 'mocha';
import * as extend from 'extend';
import * as gax from 'google-gax';
import * as is from 'is';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import {PassThrough, Transform} from 'stream';

import {google} from '../protos/protos';
import * as ds from '../src';
import {entity, Entity, KeyProto} from '../src/entity.js';
import {IntegerTypeCastOptions, Query, QueryProto} from '../src/query.js';
import {outOfBoundsError} from './entity';
import {
  AllocateIdsResponse,
  RequestConfig,
  RequestOptions,
  PrepareEntityObjectResponse,
  CommitResponse,
  GetResponse,
  RequestCallback,
} from '../src/request';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

let promisified = false;
const fakePfy = Object.assign({}, pfy, {
  promisifyAll(klass: Function) {
    if (klass.name === 'DatastoreRequest') {
      promisified = true;
    }
  },
});

let v1FakeClientOverride: Function | null;
const fakeV1 = {
  FakeClient: class {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      return (v1FakeClientOverride || (() => {}))(...args);
    }
  },
};

class FakeQuery extends Query {}

describe('Request', () => {
  let Request: typeof ds.DatastoreRequest;
  let request: Any;
  let key: entity.Key;
  const sandbox = sinon.createSandbox();

  before(() => {
    Request = proxyquire('../src/request', {
      '@google-cloud/promisify': fakePfy,
      './entity': {entity},
      './query': {Query: FakeQuery},
      './v1': fakeV1,
    }).DatastoreRequest;
  });

  after(() => {
    v1FakeClientOverride = null;
  });

  beforeEach(() => {
    key = new entity.Key({
      namespace: 'namespace',
      path: ['Company', 123],
    });
    v1FakeClientOverride = null;
    request = new Request();
  });

  afterEach(() => sandbox.restore());

  describe('instantiation', () => {
    it('should promisify all the things', () => {
      assert(promisified);
    });
  });

  describe('prepareEntityObject_', () => {
    it('should clone an object', () => {
      const obj = {
        data: {
          nested: {
            obj: true,
          },
        },
        method: 'insert',
      };
      const expectedPreparedEntityObject = extend(true, {}, obj);
      const preparedEntityObject = Request.prepareEntityObject_(obj) as Any;
      assert.notStrictEqual(preparedEntityObject, obj);
      assert.notStrictEqual(preparedEntityObject.data.nested, obj.data.nested);
      assert.deepStrictEqual(
        preparedEntityObject,
        expectedPreparedEntityObject,
      );
    });

    it('should format an entity', () => {
      const key = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entityObject: any = {data: true};
      entityObject[entity.KEY_SYMBOL] = key;
      const preparedEntityObject = Request.prepareEntityObject_(
        entityObject,
      ) as Any;
      assert.strictEqual(preparedEntityObject.key, key);
      assert.strictEqual(preparedEntityObject.data.data, entityObject.data);
    });
  });

  describe('allocateIds', () => {
    const INCOMPLETE_KEY = {} as entity.Key;
    const ALLOCATIONS = 2;
    const OPTIONS = {
      allocations: ALLOCATIONS,
    };

    it('should throw if the key is complete', () => {
      sandbox.stub(entity, 'keyToKeyProto');
      sandbox.stub(entity, 'isKeyComplete').callsFake(key => {
        assert.strictEqual(key, INCOMPLETE_KEY);
        return true;
      });

      assert.throws(() => {
        request.allocateIds(INCOMPLETE_KEY, OPTIONS, assert.ifError);
      }, new RegExp('An incomplete key should be provided.'));
    });

    it('should make the correct request', done => {
      const keyProto = {} as KeyProto;
      sandbox.stub(entity, 'isKeyComplete');
      sandbox.stub(entity, 'keyToKeyProto').callsFake(key => {
        assert.strictEqual(key, INCOMPLETE_KEY);
        return keyProto;
      });

      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.client, 'DatastoreClient');
        assert.strictEqual(config.method, 'allocateIds');

        const expectedKeys: Array<{}> = [];
        expectedKeys.length = ALLOCATIONS;
        expectedKeys.fill(keyProto);
        assert.deepStrictEqual(config.reqOpts!.keys, expectedKeys);
        assert.strictEqual(config.gaxOpts, undefined);
        done();
      };

      request.allocateIds(INCOMPLETE_KEY, OPTIONS, assert.ifError);
    });

    it('should allow a numeric shorthand for allocations', done => {
      sandbox.stub(entity, 'isKeyComplete');
      sandbox.stub(entity, 'keyToKeyProto');
      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.reqOpts!.keys.length, ALLOCATIONS);
        done();
      };
      request.allocateIds(INCOMPLETE_KEY, ALLOCATIONS, assert.ifError);
    });

    it('should allow customization of GAX options', done => {
      sandbox.stub(entity, 'isKeyComplete');
      sandbox.stub(entity, 'keyToKeyProto');
      const options = Object.assign({}, OPTIONS, {
        gaxOptions: {},
      });

      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      request.allocateIds(INCOMPLETE_KEY, options, assert.ifError);
    });

    describe('error', () => {
      const ERROR = new Error('Error.');
      const API_RESPONSE = {};

      beforeEach(() => {
        request.request_ = (_: object, callback: Function) => {
          callback(ERROR, API_RESPONSE);
        };
      });

      it('should exec callback with error & API response', done => {
        sandbox.stub(entity, 'isKeyComplete');
        sandbox.stub(entity, 'keyToKeyProto');
        request.allocateIds(
          INCOMPLETE_KEY,
          OPTIONS,
          (err: Error, keys: null, resp: {}) => {
            assert.strictEqual(err, ERROR);
            assert.strictEqual(keys, null);
            assert.strictEqual(resp, API_RESPONSE);
            done();
          },
        );
      });
    });

    describe('success', () => {
      const KEY = {};
      const API_RESPONSE = {
        keys: [KEY],
      };

      beforeEach(() => {
        request.request_ = (_: object, callback: Function) => {
          callback(null!, API_RESPONSE);
        };
      });

      it('should create and return Keys & API response', done => {
        const key = {} as entity.Key;
        sandbox.stub(entity, 'isKeyComplete');
        sandbox.stub(entity, 'keyToKeyProto');
        sandbox.stub(entity, 'keyFromKeyProto').callsFake(keyProto => {
          assert.strictEqual(keyProto, API_RESPONSE.keys[0]);
          return key;
        });
        request.allocateIds(
          INCOMPLETE_KEY,
          OPTIONS,
          (err: Error, keys: entity.Key[], resp: AllocateIdsResponse) => {
            assert.ifError(err);
            assert.deepStrictEqual(keys, [key]);
            assert.strictEqual(resp, API_RESPONSE);
            done();
          },
        );
      });
    });
  });

  describe('createReadStream', () => {
    beforeEach(() => {
      request.request_ = () => {};
    });

    it('should throw if no keys are provided', () => {
      assert.throws(() => {
        request.createReadStream(null!);
      }, /At least one Key object is required/);
    });

    it('should convert key to key proto', done => {
      sandbox.stub(entity, 'keyToKeyProto').callsFake(key_ => {
        assert.strictEqual(key_, key);
        done();
        return {} as KeyProto;
      });

      request.createReadStream(key).on('error', done);
    });

    it('should make correct request when stream is ready', done => {
      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.client, 'DatastoreClient');
        assert.strictEqual(config.method, 'lookup');
        assert.deepStrictEqual(
          config.reqOpts!.keys[0],
          entity.keyToKeyProto(key),
        );
        done();
      };
      const stream = request.createReadStream(key);
      stream.emit('reading');
    });

    it('should allow customization of GAX options', done => {
      const options = {
        gaxOptions: {},
      };

      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      request.createReadStream(key, options).on('error', done).emit('reading');
    });

    it('should allow setting strong read consistency', done => {
      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.reqOpts!.readOptions!.readConsistency, 1);
        done();
      };

      request
        .createReadStream(key, {consistency: 'strong'})
        .on('error', done)
        .emit('reading');
    });

    it('should allow setting strong eventual consistency', done => {
      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.reqOpts!.readOptions!.readConsistency, 2);
        done();
      };

      request
        .createReadStream(key, {consistency: 'eventual'})
        .on('error', done)
        .emit('reading');
    });

    describe('error', () => {
      const error = new Error('Error.');
      const apiResponse = {a: 'b', c: 'd'};

      beforeEach(() => {
        request.request_ = (_: object, callback: Function) => {
          setImmediate(() => {
            callback(error, apiResponse);
          });
        };
      });

      it('should emit error', done => {
        request
          .createReadStream(key)
          .on('data', () => {})
          .on('error', (err: Error) => {
            assert.strictEqual(err, error);
            done();
          });
      });

      it('should end stream', done => {
        const stream = request.createReadStream(key);
        stream
          .on('data', () => {})
          .on('error', () => {
            setImmediate(() => {
              assert.strictEqual(stream.destroyed, true);
              done();
            });
          });
      });

      it('should emit an error from results decoding', done => {
        const largeInt = '922337203685477850';
        const propertyName = 'points';
        request.request_ = (config: RequestConfig, callback: Function) => {
          callback(null, {
            found: [
              {
                entity: {
                  properties: {
                    [propertyName]: {
                      integerValue: largeInt,
                      valueType: 'integerValue',
                    },
                  },
                },
              },
            ],
          });
        };

        const stream = request.createReadStream(key);

        stream
          .on('data', () => {})
          .on('error', (err: Error) => {
            assert.deepStrictEqual(
              err,
              outOfBoundsError({integerValue: largeInt, propertyName}),
            );
            setImmediate(() => {
              assert.strictEqual(stream.destroyed, true);
              done();
            });
          });
      });
    });

    describe('success', () => {
      const apiResponse = {
        found: [
          {
            entity: {
              key: {
                partitionId: {
                  projectId: 'grape-spaceship-123',
                },
                path: [
                  {
                    kind: 'Post',
                    name: 'post1',
                  },
                ],
              },
              properties: {
                title: {
                  stringValue: 'How to make the perfect pizza in your grill',
                },
                tags: {
                  arrayValue: {
                    values: [
                      {
                        stringValue: 'pizza',
                      },
                      {
                        stringValue: 'grill',
                      },
                    ],
                  },
                },
                rating: {
                  integerValue: '5',
                },
                author: {
                  stringValue: 'Silvano',
                },
                wordCount: {
                  integerValue: '400',
                },
                isDraft: {
                  booleanValue: false,
                },
              },
            },
          },
        ],
      };

      const expectedResult = entity.formatArray(apiResponse.found as Any)[0];

      const apiResponseWithMultiEntities = extend(true, {}, apiResponse);
      const entities = apiResponseWithMultiEntities.found;
      entities.push(entities[0]);

      const apiResponseWithDeferred = extend(true, {}, apiResponse) as Any;
      apiResponseWithDeferred.deferred = [
        apiResponseWithDeferred.found[0].entity.key,
      ];

      beforeEach(() => {
        request.request_ = (_: object, callback: Function) => {
          callback(null!, apiResponse);
        };
      });

      it('should format the results', done => {
        sandbox.stub(entity, 'formatArray').callsFake(arr => {
          assert.strictEqual(arr, apiResponse.found);
          setImmediate(done);
          return arr;
        });

        request.createReadStream(key).on('error', done).emit('reading');
      });

      describe('should pass `wrapNumbers` to formatArray', () => {
        let wrapNumbersOpts: boolean | IntegerTypeCastOptions | undefined;
        let formtArrayStub: Any;

        beforeEach(() => {
          formtArrayStub = sandbox
            .stub(entity, 'formatArray')
            .callsFake(arr => {
              assert.strictEqual(arr, apiResponse.found);
              return arr;
            });
        });

        afterEach(() => {
          formtArrayStub.restore();
        });

        it('should pass `wrapNumbers` to formatArray as undefined by default', done => {
          request.createReadStream(key).on('error', done).resume();

          setImmediate(() => {
            wrapNumbersOpts = formtArrayStub.getCall(0).args[1];
            assert.strictEqual(wrapNumbersOpts, undefined);
            done();
          });
        });

        it('should pass `wrapNumbers` to formatArray as bolean', done => {
          request
            .createReadStream(key, {wrapNumbers: true})
            .on('error', done)
            .resume();

          setImmediate(() => {
            wrapNumbersOpts = formtArrayStub.getCall(0).args[1];
            assert.strictEqual(typeof wrapNumbersOpts, 'boolean');
            done();
          });
        });

        it('should pass `wrapNumbers` to formatArray as IntegerTypeCastOptions', done => {
          const integerTypeCastOptions = {
            integerTypeCastFunction: () => {},
            properties: 'that',
          };

          request
            .createReadStream(key, {wrapNumbers: integerTypeCastOptions})
            .on('error', done)
            .resume();

          setImmediate(() => {
            wrapNumbersOpts = formtArrayStub.getCall(0).args[1];
            assert.strictEqual(wrapNumbersOpts, integerTypeCastOptions);
            assert.deepStrictEqual(wrapNumbersOpts, integerTypeCastOptions);
            done();
          });
        });
      });

      it('should continue looking for deferred results', done => {
        let numTimesCalled = 0;

        request.request_ = (config: RequestConfig, callback: Function) => {
          numTimesCalled++;

          if (numTimesCalled === 1) {
            callback(null!, apiResponseWithDeferred);
            return;
          }

          const expectedKeys = apiResponseWithDeferred.deferred
            .map(entity.keyFromKeyProto)
            .map(entity.keyToKeyProto);

          assert.deepStrictEqual(config.reqOpts!.keys, expectedKeys);
          done();
        };

        request.createReadStream(key).on('error', done).emit('reading');
      });

      it('should push results to the stream', done => {
        request
          .createReadStream(key)
          .on('error', done)
          .on('data', (entity: Entity) => {
            assert.deepStrictEqual(entity, expectedResult);
          })
          .on('end', done)
          .emit('reading');
      });

      it('should not push more results if stream was ended', done => {
        let entitiesEmitted = 0;

        request.request_ = (config: RequestConfig, callback: Function) => {
          setImmediate(() => {
            callback(null!, apiResponseWithMultiEntities);
          });
        };

        const stream = request.createReadStream([key, key]);
        stream
          .on('data', () => {
            entitiesEmitted++;
            stream.end();
          })
          .on('end', () => {
            assert.strictEqual(entitiesEmitted, 1);
            done();
          })
          .emit('reading');
      });

      it('should not get more results if stream was ended', done => {
        let lookupCount = 0;

        request.request_ = (config: RequestConfig, callback: Function) => {
          lookupCount++;
          setImmediate(() => {
            callback(null!, apiResponseWithDeferred);
          });
        };

        const stream = request.createReadStream(key);
        stream
          .on('error', done)
          .on('data', () => stream.end())
          .on('end', () => {
            assert.strictEqual(lookupCount, 1);
            done();
          })
          .emit('reading');
      });
    });
  });

  describe('delete', () => {
    it('should delete by key', done => {
      request.request_ = (config: RequestConfig, callback: Function) => {
        assert.strictEqual(config.client, 'DatastoreClient');
        assert.strictEqual(config.method, 'commit');
        assert(is.object((config.reqOpts as Any).mutations[0].delete));
        callback(null!);
      };
      request.delete(key, done);
    });

    it('should return apiResponse in callback', done => {
      const resp = {success: true};
      request.request_ = (config: RequestConfig, callback: Function) => {
        callback(null!, resp);
      };
      request.delete(
        key,
        (err: Error, apiResponse: [google.datastore.v1.CommitResponse]) => {
          assert.ifError(err);
          assert.deepStrictEqual(resp, apiResponse);
          done();
        },
      );
    });

    it('should multi delete by keys', done => {
      request.request_ = (config: RequestConfig, callback: Function) => {
        assert.strictEqual(config.reqOpts!.mutations!.length, 2);
        callback(null!);
      };
      request.delete([key, key], done);
    });

    it('should allow customization of GAX options', done => {
      const gaxOptions = {};
      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      request.delete(key, gaxOptions, assert.ifError);
    });

    describe('transactions', () => {
      beforeEach(() => {
        // Trigger transaction mode.
        request.id = 'transaction-id';
        request.requests_ = [];
      });

      it('should queue request', () => {
        request.delete(key);
        assert(is.object(request.requests_[0].mutations[0].delete));
      });
    });
  });

  describe('get', () => {
    it('should pass along readTime for reading snapshots', done => {
      const savedTime = Date.now();
      request.request_ = (config: RequestConfig, callback: RequestCallback) => {
        assert.deepStrictEqual(config, {
          client: 'DatastoreClient',
          method: 'lookup',
          gaxOpts: undefined,
          reqOpts: {
            keys: [
              {
                path: [
                  {
                    kind: 'Company',
                    id: 123,
                  },
                ],
                partitionId: {namespaceId: 'namespace'},
              },
            ],
            readOptions: {
              readTime: {
                seconds: Math.floor(savedTime / 1000),
              },
            },
          },
        });
        callback(null, {
          deferred: [],
          found: [],
          missing: [],
          readTime: {seconds: Math.floor(savedTime / 1000), nanos: 0},
        });
      };
      request.get(key, {readTime: savedTime}, (err: any) => {
        if (err) {
          throw err;
        }
        done();
      });
    });

    describe('success', () => {
      const keys = [key];
      const fakeEntities = [{a: 'a'}, {b: 'b'}];

      beforeEach(() => {
        request.createReadStream = sandbox.spy(() => {
          const stream = new Transform({objectMode: true});
          setImmediate(() => {
            fakeEntities.forEach(entity => stream.push(entity));
            stream.push(null);
          });
          return stream;
        });
      });

      it('should return an array of entities', done => {
        const options = {};

        request.get(keys, options, (err: Error, entities: Entity[]) => {
          assert.ifError(err);
          assert.deepStrictEqual(entities, fakeEntities);
          const spy = (request.createReadStream as Any).getCall(0);
          assert.strictEqual(spy.args[0], keys);
          assert.strictEqual(spy.args[1], options);
          done();
        });
      });

      it('should return a single entity', done => {
        request.get(key, (err: Error, entity: Entity) => {
          assert.ifError(err);
          assert.strictEqual(entity, fakeEntities[0]);
          done();
        });
      });

      it('should allow options to be omitted', done => {
        request.get(keys, (err: Error) => {
          assert.ifError(err);
          done();
        });
      });

      it('should default options to an object', done => {
        request.get(keys, null!, (err: Error) => {
          assert.ifError(err);
          const spy = (request.createReadStream as Any).getCall(0);
          assert.deepStrictEqual(spy.args[1], {});
          done();
        });
      });

      describe('should pass `wrapNumbers` to createReadStream', () => {
        it('should pass `wrapNumbers` to createReadStream as undefined by default', done => {
          request.get(keys, (err: Error) => {
            assert.ifError(err);

            const createReadStreamOptions =
              request.createReadStream.getCall(0).args[1];
            assert.strictEqual(createReadStreamOptions.wrapNumbers, undefined);
            done();
          });
        });

        it('should pass `wrapNumbers` to createReadStream as boolean', done => {
          request.get(keys, {wrapNumbers: true}, (err: Error) => {
            assert.ifError(err);

            const createReadStreamOptions =
              request.createReadStream.getCall(0).args[1];
            assert.strictEqual(
              typeof createReadStreamOptions.wrapNumbers,
              'boolean',
            );
            done();
          });
        });

        it('should pass `wrapNumbers` to createReadStream as IntegerTypeCastOptions', done => {
          const integerTypeCastOptions = {
            integerTypeCastFunction: () => {},
            properties: 'that',
          };

          request.get(
            keys,
            {wrapNumbers: integerTypeCastOptions},
            (err: Error) => {
              assert.ifError(err);

              const createReadStreamOptions =
                request.createReadStream.getCall(0).args[1];
              assert.strictEqual(
                createReadStreamOptions.wrapNumbers,
                integerTypeCastOptions,
              );
              assert.deepStrictEqual(
                createReadStreamOptions.wrapNumbers,
                integerTypeCastOptions,
              );
              done();
            },
          );
        });
      });
    });

    describe('error', () => {
      const error = new Error('err');

      beforeEach(() => {
        request.createReadStream = sandbox.spy(() => {
          const stream = new Transform({objectMode: true});
          setImmediate(() => {
            stream.emit('error', error);
          });
          return stream;
        });
      });

      it('send an error to the callback', done => {
        request.get(key, (err: Error) => {
          assert.strictEqual(err, error);
          done();
        });
      });
    });
  });

  describe('runQueryStream', () => {
    beforeEach(() => {
      request.request_ = () => {};
    });

    it('should clone the query', done => {
      let query = new FakeQuery();
      query.namespace = 'namespace';
      query = extend(true, new FakeQuery(), query);

      sandbox.stub(entity, 'queryToQueryProto').callsFake(query_ => {
        assert.notStrictEqual(query_, query);
        assert.deepStrictEqual(query_, query);
        done();
        return {} as QueryProto;
      });

      request.runQueryStream(query).on('error', done).emit('reading');
    });

    it('should make correct request when the stream is ready', done => {
      const query = {namespace: 'namespace'};
      const queryProto = {} as QueryProto;

      sandbox.stub(entity, 'queryToQueryProto').returns(queryProto);

      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.client, 'DatastoreClient');
        assert.strictEqual(config.method, 'runQuery');
        assert(is.empty(config.reqOpts!.readOptions));
        assert.strictEqual(config.reqOpts!.query, queryProto);
        assert.strictEqual(
          config.reqOpts!.partitionId!.namespaceId,
          query.namespace,
        );
        assert.strictEqual(config.gaxOpts, undefined);

        done();
      };

      request.runQueryStream(query).on('error', done).emit('reading');
    });

    it('should allow customization of GAX options', done => {
      sandbox.stub(entity, 'queryToQueryProto');
      const options = {
        gaxOptions: {},
      };

      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      request.runQueryStream({}, options).on('error', done).emit('reading');
    });

    it('should allow setting strong read consistency', done => {
      sandbox.stub(entity, 'queryToQueryProto');
      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.reqOpts!.readOptions!.readConsistency, 1);
        done();
      };

      request
        .runQueryStream({}, {consistency: 'strong'})
        .on('error', done)
        .emit('reading');
    });

    it('should allow setting strong eventual consistency', done => {
      sandbox.stub(entity, 'queryToQueryProto');
      request.request_ = (config: RequestConfig) => {
        assert.strictEqual(config.reqOpts!.readOptions!.readConsistency, 2);
        done();
      };

      request
        .runQueryStream({}, {consistency: 'eventual'})
        .on('error', done)
        .emit('reading');
    });

    describe('error', () => {
      const error = new Error('Error.');

      beforeEach(() => {
        request.request_ = (config: RequestConfig, callback: Function) => {
          callback(error);
        };
      });

      it('should emit error on a stream', done => {
        sandbox.stub(entity, 'queryToQueryProto');
        request
          .runQueryStream({})
          .on('error', (err: Error) => {
            assert.strictEqual(err, error);
            done();
          })
          .emit('reading');
      });

      it('should emit an error when encoding fails', done => {
        const error = new Error('Encoding error.');
        sandbox.stub(entity, 'queryToQueryProto').throws(error);
        request
          .runQueryStream({})
          .on('error', (err: Error) => {
            assert.strictEqual(err, error);
            done();
          })
          .emit('reading');
      });

      it('should emit an error from results decoding', done => {
        const largeInt = '922337203685477850';
        const propertyName = 'points';
        sandbox.stub(entity, 'queryToQueryProto');

        request.request_ = (config: RequestConfig, callback: Function) => {
          callback(null, {
            batch: {
              entityResults: [
                {
                  entity: {
                    properties: {
                      [propertyName]: {
                        integerValue: largeInt,
                        valueType: 'integerValue',
                      },
                    },
                  },
                },
              ],
            },
          });
        };

        const stream = request.runQueryStream({});

        stream
          .on('error', (err: Error) => {
            assert.deepStrictEqual(
              err,
              outOfBoundsError({integerValue: largeInt, propertyName}),
            );
            setImmediate(() => {
              assert.strictEqual(stream.destroyed, true);
              done();
            });
          })
          .emit('reading');
      });
    });

    describe('success', () => {
      const entityResultsPerApiCall: Any = {
        1: [{a: true}],
        2: [{b: true}, {c: true}],
      };

      const apiResponse = {
        batch: {
          entityResults: [{a: true}, {b: true}, {c: true}],
          endCursor: Buffer.from('abc'),
          moreResults: 'MORE_RESULTS_AFTER_LIMIT',
          skippedResults: 0,
        },
      };

      let formatArrayStub: Any;
      beforeEach(() => {
        request.request_ = (config: RequestConfig, callback: Function) => {
          callback(null, apiResponse);
        };

        formatArrayStub = sandbox
          .stub(entity, 'formatArray')
          .callsFake(array => {
            return array;
          });
      });

      it('should format results', done => {
        sandbox.stub(entity, 'queryToQueryProto');
        formatArrayStub.restore();
        sandbox.stub(entity, 'formatArray').callsFake(array => {
          assert.strictEqual(array, apiResponse.batch.entityResults);
          return array;
        });

        const entities: Array<{}> = [];

        request
          .runQueryStream({})
          .on('error', done)
          .on('data', (entity: Entity) => entities.push(entity))
          .on('end', () => {
            assert.deepStrictEqual(entities, apiResponse.batch.entityResults);
            done();
          });
      });

      describe('should pass `wrapNumbers` to formatArray', () => {
        let wrapNumbersOpts: boolean | IntegerTypeCastOptions | undefined;

        beforeEach(() => {
          sandbox.stub(entity, 'queryToQueryProto');
          formatArrayStub.restore();
          formatArrayStub = sandbox
            .stub(entity, 'formatArray')
            .callsFake(array => {
              return array;
            });
        });

        it('should pass `wrapNumbers` to formatArray as undefined by default', done => {
          request.runQueryStream({}).on('error', assert.ifError).resume();

          setImmediate(() => {
            wrapNumbersOpts = formatArrayStub.getCall(0).args[1];
            assert.strictEqual(wrapNumbersOpts, undefined);
            done();
          });
        });

        it('should pass `wrapNumbers` to formatArray as boolean', done => {
          request
            .runQueryStream({}, {wrapNumbers: true})
            .on('error', assert.ifError)
            .resume();

          setImmediate(() => {
            wrapNumbersOpts = formatArrayStub.getCall(0).args[1];
            assert.strictEqual(typeof wrapNumbersOpts, 'boolean');
            done();
          });
        });

        it('should pass `wrapNumbers` to formatArray as IntegerTypeCastOptions', done => {
          const integerTypeCastOptions = {
            integerTypeCastFunction: () => {},
            properties: 'that',
          };

          request
            .runQueryStream({}, {wrapNumbers: integerTypeCastOptions})
            .on('error', assert.ifError)
            .resume();

          setImmediate(() => {
            wrapNumbersOpts = formatArrayStub.getCall(0).args[1];
            assert.strictEqual(wrapNumbersOpts, integerTypeCastOptions);
            assert.deepStrictEqual(wrapNumbersOpts, integerTypeCastOptions);
            done();
          });
        });
      });

      it('should re-run query if not finished', done => {
        const query = {
          limitVal: 1,
          offsetVal: 8,
        };
        const queryProto = {
          limit: {
            value: query.limitVal,
          },
        } as {} as QueryProto;

        let timesRequestCalled = 0;
        let startCalled = false;
        let offsetCalled = false;

        formatArrayStub.restore();
        sandbox.stub(entity, 'formatArray').callsFake(array => {
          assert.strictEqual(
            array,
            entityResultsPerApiCall[timesRequestCalled],
          );
          return entityResultsPerApiCall[timesRequestCalled];
        });

        request.request_ = (config: RequestConfig, callback: Function) => {
          timesRequestCalled++;

          const resp = extend(true, {}, apiResponse);
          resp.batch.entityResults =
            entityResultsPerApiCall[timesRequestCalled];

          if (timesRequestCalled === 1) {
            assert.strictEqual(config.client, 'DatastoreClient');
            assert.strictEqual(config.method, 'runQuery');
            resp.batch.moreResults = 'NOT_FINISHED';
            callback(null, resp);
          } else {
            assert.strictEqual(startCalled, true);
            assert.strictEqual(offsetCalled, true);
            assert.strictEqual(config.reqOpts!.query, queryProto);
            resp.batch.moreResults = 'MORE_RESULTS_AFTER_LIMIT';
            callback(null, resp);
          }
        };

        FakeQuery.prototype.start = function (endCursor) {
          assert.strictEqual(
            endCursor,
            apiResponse.batch.endCursor.toString('base64'),
          );
          startCalled = true;
          return this;
        };

        sandbox.stub(FakeQuery.prototype, 'offset').callsFake(offset_ => {
          const offset = query.offsetVal - apiResponse.batch.skippedResults;
          assert.strictEqual(offset_, offset);
          offsetCalled = true;
          return {} as FakeQuery;
        });

        sandbox.stub(FakeQuery.prototype, 'limit').callsFake(limit_ => {
          if (timesRequestCalled === 1) {
            assert.strictEqual(
              limit_,
              entityResultsPerApiCall[1].length - query.limitVal,
            );
          } else {
            // Should restore the original limit.
            assert.strictEqual(limit_, query.limitVal);
          }
          return {} as FakeQuery;
        });

        sandbox.stub(entity, 'queryToQueryProto').callsFake(query_ => {
          if (timesRequestCalled > 1) {
            assert.strictEqual(query_, query);
          }
          return queryProto;
        });

        const entities: Array<{}> = [];
        let info: Any;

        request
          .runQueryStream(query)
          .on('error', done)
          .on('info', (_info: object) => {
            info = _info;
          })
          .on('data', (entity: Entity) => {
            entities.push(entity);
          })
          .on('end', () => {
            const allResults = ([] as Array<{}>).slice
              .call(entityResultsPerApiCall[1])
              .concat(entityResultsPerApiCall[2]);

            assert.deepStrictEqual(entities, allResults);

            assert.deepStrictEqual(info, {
              endCursor: apiResponse.batch.endCursor.toString('base64'),
              moreResults: apiResponse.batch.moreResults,
            });

            done();
          });
      });

      it('should handle large limitless queries', done => {
        let timesRequestCalled = 0;

        const query = {
          limitVal: -1,
        };

        request.request_ = (_: object, callback: Function) => {
          let batch;
          if (++timesRequestCalled === 2) {
            batch = {};
          } else {
            batch = {
              moreResults: 'NOT_FINISHED',
              endCursor: Buffer.from('abc'),
            };
          }
          callback(null, {batch});
        };

        sandbox.stub(entity, 'queryToQueryProto').returns({} as QueryProto);
        const limitStub = sandbox.stub(FakeQuery.prototype, 'limit');

        request
          .runQueryStream(query)
          .on('error', done)
          .on('data', () => {})
          .on('end', () => {
            assert.strictEqual(timesRequestCalled, 2);
            assert.strictEqual(limitStub.called, false);
            done();
          });
      });

      it('should not push more results if stream was ended', done => {
        let timesRequestCalled = 0;
        let entitiesEmitted = 0;

        sandbox.stub(entity, 'queryToQueryProto');

        request.request_ = (config: RequestConfig, callback: Function) => {
          timesRequestCalled++;

          const resp = extend(true, {}, apiResponse);
          resp.batch.entityResults =
            entityResultsPerApiCall[timesRequestCalled];

          if (timesRequestCalled === 1) {
            resp.batch.moreResults = 'NOT_FINISHED';
            callback(null, resp);
          } else {
            resp.batch.moreResults = 'MORE_RESULTS_AFTER_LIMIT';
            callback(null, resp);
          }
        };

        const stream = request
          .runQueryStream({})
          .on('data', () => {
            entitiesEmitted++;
            stream.end();
          })
          .on('end', () => {
            assert.strictEqual(entitiesEmitted, 1);
            done();
          });
      });

      it('should not get more results if stream was ended', done => {
        let timesRequestCalled = 0;
        sandbox.stub(entity, 'queryToQueryProto');
        request.request_ = (config: RequestConfig, callback: Function) => {
          timesRequestCalled++;
          callback(null!, apiResponse);
        };

        const stream = request.runQueryStream({});
        stream
          .on('error', done)
          .on('data', () => stream.end())
          .on('end', () => {
            assert.strictEqual(timesRequestCalled, 1);
            done();
          });
      });
    });
  });

  describe('runQuery', () => {
    const query = {};

    describe('success', () => {
      const fakeInfo = {};
      const fakeEntities = [{a: 'a'}, {b: 'b'}];

      beforeEach(() => {
        request.runQueryStream = sandbox.spy(() => {
          const stream = new Transform({objectMode: true});

          setImmediate(() => {
            stream.emit('info', fakeInfo);

            fakeEntities.forEach(entity => {
              stream.push(entity);
            });

            stream.push(null);
          });

          return stream;
        });
      });

      it('should return an array of entities', done => {
        const options = {};

        request.runQuery(
          query,
          options,
          (err: Error | null, entities: Entity[], info: {}) => {
            assert.ifError(err);
            assert.deepStrictEqual(entities, fakeEntities);
            assert.strictEqual(info, fakeInfo);

            const spy = request.runQueryStream.getCall(0);
            assert.strictEqual(spy.args[0], query);
            assert.strictEqual(spy.args[1], options);
            done();
          },
        );
      });

      describe('should pass `wrapNumbers` to runQueryStream', () => {
        it('should pass `wrapNumbers` to runQueryStream as undefined by default', done => {
          request.runQuery(query, (err: Error) => {
            assert.ifError(err);

            const runQueryOptions = request.runQueryStream.getCall(0).args[1];
            assert.strictEqual(runQueryOptions.wrapNumbers, undefined);
            done();
          });
        });

        it('should pass `wrapNumbers` to runQueryStream boolean', done => {
          request.runQuery(query, {wrapNumbers: true}, (err: Error) => {
            assert.ifError(err);

            const runQueryOptions = request.runQueryStream.getCall(0).args[1];
            assert.strictEqual(typeof runQueryOptions.wrapNumbers, 'boolean');
            done();
          });
        });

        it('should pass `wrapNumbers` to runQueryStream as IntegerTypeCastOptions', done => {
          const integerTypeCastOptions = {
            integerTypeCastFunction: () => {},
            properties: 'that',
          };

          request.runQuery(
            query,
            {wrapNumbers: integerTypeCastOptions},
            (err: Error) => {
              assert.ifError(err);

              const runQueryOptions = request.runQueryStream.getCall(0).args[1];
              assert.strictEqual(
                runQueryOptions.wrapNumbers,
                integerTypeCastOptions,
              );
              assert.deepStrictEqual(
                runQueryOptions.wrapNumbers,
                integerTypeCastOptions,
              );
              done();
            },
          );
        });
      });

      it('should allow options to be omitted', done => {
        request.runQuery(query, (err: Error) => {
          assert.ifError(err);
          done();
        });
      });

      it('should default options to an object', done => {
        request.runQuery(query, null, (err: Error) => {
          assert.ifError(err);

          const spy = request.runQueryStream.getCall(0);
          assert.deepStrictEqual(spy.args[0], {});
          done();
        });
      });
    });

    describe('error', () => {
      const error = new Error('err');

      beforeEach(() => {
        request.runQueryStream = sandbox.spy(() => {
          const stream = new Transform({objectMode: true});

          setImmediate(() => {
            stream.emit('error', error);
          });

          return stream;
        });
      });

      it('send an error to the callback', done => {
        request.runQuery(query, (err: Error) => {
          assert.strictEqual(err, error);
          done();
        });
      });
    });
  });

  describe('merge', () => {
    let Transaction: typeof ds.Transaction;
    let transaction: ds.Transaction;
    const PROJECT_ID = 'project-id';
    const NAMESPACE = 'a-namespace';

    const DATASTORE = {
      request_() {},
      projectId: PROJECT_ID,
      namespace: NAMESPACE,
    } as {} as ds.Datastore;

    const key = {
      namespace: 'ns',
      kind: 'Company',
      path: ['Company', null],
    };
    const entityObject = {};

    before(() => {
      Transaction = proxyquire('../src/transaction.js', {
        '@google-cloud/promisify': fakePfy,
      }).Transaction;
    });

    beforeEach(() => {
      transaction = new Transaction(DATASTORE);

      transaction.request_ = () => {};

      transaction.commit = async () => {
        return [{}] as CommitResponse;
      };
      request.datastore = {
        transaction: () => transaction,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (transaction as any).run = (callback?: Function) => {
        callback!(null);
      };

      transaction.get = async () => {
        return [entityObject] as GetResponse;
      };

      transaction.commit = async () => {
        return [{}] as CommitResponse;
      };
    });

    afterEach(() => sandbox.restore());

    it('should return merge object for entity', done => {
      const updatedEntityObject = {
        status: 'merged',
      };

      transaction.save = (modifiedData: PrepareEntityObjectResponse) => {
        assert.deepStrictEqual(
          modifiedData.data,
          Object.assign({}, entityObject, updatedEntityObject),
        );
      };

      request.merge({key, data: updatedEntityObject}, done);
    });

    it('should return merge objects for entities', done => {
      const updatedEntityObject = [
        {
          id: 1,
          status: 'merged',
        },
        {
          id: 2,
          status: 'merged',
        },
      ];

      transaction.commit = async () => {
        transaction.modifiedEntities_.forEach((entity, index) => {
          assert.deepStrictEqual(
            entity.args[0].data,
            Object.assign({}, entityObject, updatedEntityObject[index]),
          );
        });
        return [{}] as CommitResponse;
      };

      request.merge(
        [
          {key, data: updatedEntityObject[0]},
          {key, data: updatedEntityObject[1]},
        ],
        done,
      );
    });

    it('transaction should rollback if error on transaction run!', done => {
      sandbox
        .stub(transaction, 'run')
        .callsFake((gaxOption, callback?: Function) => {
          callback = typeof gaxOption === 'function' ? gaxOption : callback!;
          callback(new Error('Error'));
        });

      request.merge({key, data: null}, (err: Error) => {
        assert.strictEqual(err.message, 'Error');
        done();
      });
    });

    it('transaction should rollback if error for for transaction get!', done => {
      sandbox.stub(transaction, 'get').rejects(new Error('Error'));

      request.merge({key, data: null}, (err: Error) => {
        assert.strictEqual(err.message, 'Error');
        done();
      });
    });

    it('transaction should rollback if error for for transaction commit!', done => {
      sandbox.stub(transaction, 'commit').rejects(new Error('Error'));

      request.merge({key, data: null}, (err: Error) => {
        assert.strictEqual(err.message, 'Error');
        done();
      });
    });

    it('should avoid the rollback exception in transaction.run', done => {
      sandbox
        .stub(transaction, 'run')
        .callsFake((gaxOption, callback?: Function) => {
          callback = typeof gaxOption === 'function' ? gaxOption : callback!;
          callback(new Error('Error.'));
        });

      sandbox
        .stub(transaction, 'rollback')
        .rejects(new Error('Rollback Error.'));

      request.merge({key, data: null}, (err: Error) => {
        assert.strictEqual(err.message, 'Error.');
        done();
      });
    });

    it('should avoid the rollback exception in transaction.get/commit', done => {
      sandbox.restore();
      sandbox.stub(transaction, 'get').rejects(new Error('Error.'));

      sandbox
        .stub(transaction, 'rollback')
        .rejects(new Error('Rollback Error.'));

      request.merge({key, data: null}, (err: Error) => {
        assert.strictEqual(err.message, 'Error.');
        done();
      });
    });
  });

  describe('prepareGaxRequest_', () => {
    const CONFIG = {
      client: 'FakeClient', // name set at top of file
      method: 'method',
      reqOpts: {
        a: 'b',
        c: 'd',
      },
      gaxOpts: {
        a: 'b',
        c: 'd',
      },
    };

    const PROJECT_ID = 'project-id';

    beforeEach(() => {
      const clients_ = new Map();
      clients_.set(CONFIG.client, {
        [CONFIG.method]() {},
      });
      request.datastore = {
        clients_,
        auth: {
          getProjectId(callback: Function) {
            callback(null, PROJECT_ID);
          },
        },
      };
    });

    it('should get the project ID', done => {
      request.datastore.auth.getProjectId = () => {
        done();
      };
      request.prepareGaxRequest_(CONFIG, assert.ifError);
    });

    it('should return error if getting project ID failed', done => {
      const error = new Error('Error.');

      request.datastore.auth.getProjectId = (callback: Function) => {
        callback(error);
      };
      request.prepareGaxRequest_(CONFIG, (err: Error) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should initiate and cache the client', () => {
      const fakeClient = {
        [CONFIG.method]() {},
      };
      v1FakeClientOverride = (options: object) => {
        assert.deepStrictEqual(options, request.datastore.options);
        return fakeClient;
      };
      request.datastore.clients_ = new Map();
      request.prepareGaxRequest_(CONFIG, assert.ifError);
      const client = request.datastore.clients_.get(CONFIG.client);
      assert.strictEqual(client, fakeClient);
    });

    it('should return the cached client', done => {
      v1FakeClientOverride = () => {
        done(new Error('Should not re-instantiate a GAX client.'));
      };

      request.prepareGaxRequest_(CONFIG, (err: Error, requestFn: Function) => {
        assert.ifError(err);
        requestFn();
        done();
      });
    });

    it('should send gaxOpts', done => {
      request.datastore.clients_ = new Map();
      request.datastore.clients_.set(CONFIG.client, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [CONFIG.method](_: object, gaxO: any) {
          delete gaxO.headers;
          assert.deepStrictEqual(gaxO, CONFIG.gaxOpts);
          done();
        },
      });

      request.prepareGaxRequest_(CONFIG, (err: Error, requestFn: Function) => {
        assert.ifError(err);
        requestFn();
      });
    });

    it('should send google-cloud-resource-prefix', done => {
      request.datastore.clients_ = new Map();
      request.datastore.clients_.set(CONFIG.client, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [CONFIG.method](_: object, gaxO: any) {
          assert.deepStrictEqual(gaxO.headers, {
            'google-cloud-resource-prefix': 'projects/' + PROJECT_ID,
          });
          done();
        },
      });

      request.prepareGaxRequest_(CONFIG, (err: Error, requestFn: Function) => {
        assert.ifError(err);
        requestFn();
      });
    });

    describe('commit', () => {
      it('should set the mode', done => {
        request.datastore.clients_ = new Map();
        request.datastore.clients_.set(CONFIG.client, {
          commit(reqOpts: RequestOptions) {
            assert.strictEqual(reqOpts.mode, 'NON_TRANSACTIONAL');
            done();
          },
        });
        const config = Object.assign({}, CONFIG, {
          method: 'commit',
        });
        request.prepareGaxRequest_(
          config,
          (err: Error, requestFn: Function) => {
            assert.ifError(err);
            requestFn();
          },
        );
      });
    });

    describe('transaction', () => {
      const TRANSACTION_ID = 'transaction';

      beforeEach(() => {
        request.id = TRANSACTION_ID;
      });

      it('should set the commit transaction info', done => {
        request.datastore.clients_ = new Map();
        request.datastore.clients_.set(CONFIG.client, {
          commit(reqOpts: RequestOptions) {
            assert.strictEqual(reqOpts.mode, 'TRANSACTIONAL');
            assert.strictEqual(reqOpts.transaction, TRANSACTION_ID);
            done();
          },
        });

        const config = Object.assign({}, CONFIG, {
          method: 'commit',
        });
        request.prepareGaxRequest_(
          config,
          (err: Error, requestFn: Function) => {
            assert.ifError(err);
            requestFn();
          },
        );
      });

      it('should set the rollback transaction info', done => {
        request.datastore.clients_ = new Map();
        request.datastore.clients_.set(CONFIG.client, {
          rollback(reqOpts: RequestOptions) {
            assert.strictEqual(reqOpts.transaction, TRANSACTION_ID);
            done();
          },
        });

        const config = Object.assign({}, CONFIG, {
          method: 'rollback',
        });
        request.prepareGaxRequest_(
          config,
          (err: Error, requestFn: Function) => {
            assert.ifError(err);
            requestFn();
          },
        );
      });

      it('should set the lookup transaction info', done => {
        const config = extend(true, {}, CONFIG, {
          method: 'lookup',
        });

        request.datastore.clients_ = new Map();
        request.datastore.clients_.set(CONFIG.client, {
          lookup(reqOpts: RequestOptions) {
            assert.strictEqual(
              reqOpts.readOptions!.transaction,
              TRANSACTION_ID,
            );
            done();
          },
        });

        request.prepareGaxRequest_(
          config,
          (err: Error, requestFn: Function) => {
            assert.ifError(err);
            requestFn();
          },
        );
      });

      it('should set the runQuery transaction info', done => {
        const config = extend(true, {}, CONFIG, {
          method: 'runQuery',
        });

        request.datastore.clients_ = new Map();
        request.datastore.clients_.set(CONFIG.client, {
          runQuery(reqOpts: RequestOptions) {
            assert.strictEqual(
              reqOpts.readOptions!.transaction,
              TRANSACTION_ID,
            );
            done();
          },
        });

        request.prepareGaxRequest_(
          config,
          (err: Error, requestFn: Function) => {
            assert.ifError(err);
            requestFn();
          },
        );
      });

      it('should throw if read consistency is specified', () => {
        const config = extend(true, {}, CONFIG, {
          method: 'runQuery',
          reqOpts: {
            readOptions: {
              readConsistency: 1,
            },
          },
        });

        assert.throws(() => {
          request.prepareGaxRequest_(config, assert.ifError);
        }, /Read consistency cannot be specified in a transaction\./);
      });
    });
  });

  describe('request_', () => {
    const CONFIG = {};

    it('should pass config to prepare function', done => {
      request.prepareGaxRequest_ = (config: {}) => {
        assert.strictEqual(config, CONFIG);
        done();
      };

      request.request_(CONFIG, assert.ifError);
    });

    it('should execute callback with error from prepare function', done => {
      const error = new Error('Error.');

      request.prepareGaxRequest_ = (config: {}, callback: Function) => {
        callback(error);
      };

      request.request_(CONFIG, (err: Error) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should execute returned request function with callback', done => {
      const requestFn = (callback: Function) => {
        callback(); // done()
      };

      request.prepareGaxRequest_ = (config: {}, callback: Function) => {
        callback(null, requestFn);
      };

      request.request_(CONFIG, done);
    });
  });

  describe('requestStream_', () => {
    let GAX_STREAM: gax.CancellableStream = {} as gax.CancellableStream;
    const CONFIG = {};

    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (GAX_STREAM as any) = new PassThrough();
      request.prepareGaxRequest_ = (config: {}, callback: Function) => {
        callback(null, () => GAX_STREAM);
      };
    });

    it('should expose an abort function', done => {
      GAX_STREAM.cancel = done;

      const requestStream = request.requestStream_(CONFIG);
      requestStream.emit('reading');
      requestStream.abort();
    });

    it('should prepare the request once reading', done => {
      request.prepareGaxRequest_ = (config: {}) => {
        assert.strictEqual(config, CONFIG);
        done();
      };

      const requestStream = request.requestStream_(CONFIG);
      requestStream.emit('reading');
    });

    it('should destroy the stream with prepare error', done => {
      const error = new Error('Error.');
      request.prepareGaxRequest_ = (config: {}, callback: Function) => {
        callback(error);
      };
      const requestStream = request.requestStream_(CONFIG);
      requestStream.emit('reading');
      requestStream.on('error', (err: Error) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should destroy the stream with GAX error', done => {
      const error = new Error('Error.');
      const requestStream = request.requestStream_(CONFIG);
      requestStream.emit('reading');
      GAX_STREAM.emit('error', error);
      requestStream.on('error', (err: Error) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should emit response from GAX stream', done => {
      const response = {};
      const requestStream = request.requestStream_(CONFIG);
      requestStream.emit('reading');
      requestStream.on('response', (resp: {}) => {
        assert.strictEqual(resp, response);
        done();
      });
      GAX_STREAM.emit('response', response);
    });
  });
});
