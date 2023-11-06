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
import arrify = require('arrify');
import * as assert from 'assert';
import {afterEach, beforeEach, before, describe, it} from 'mocha';
import * as proxyquire from 'proxyquire';

import {
  Datastore,
  DatastoreOptions,
  DatastoreClient,
  DatastoreRequest,
  Query,
  TransactionOptions,
  Transaction,
} from '../src';
import {Entity} from '../src/entity';
import * as tsTypes from '../src/transaction';
import * as sinon from 'sinon';
import {Callback, CallOptions, ClientStub} from 'google-gax';
import {CommitCallback, RequestConfig} from '../src/request';
import {SECOND_DATABASE_ID} from './index';
import {google} from '../protos/protos';
import {RunCallback} from '../src/transaction';
import * as protos from '../protos/protos';
const async = require('async');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
type Path = string | [string] | [string, number];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {entity} = require('../src/entity');

let promisified = false;
const fakePfy = Object.assign({}, pfy, {
  promisifyAll(klass: Function, options: pfy.PromisifyAllOptions) {
    if (klass.name !== 'Transaction') {
      return;
    }
    promisified = true;
    assert.deepStrictEqual(options.exclude, [
      'createAggregationQuery',
      '#commitAsync',
      'createQuery',
      'delete',
      'insert',
      'parseRunAsync',
      'parseTransactionResponse',
      'runAsync',
      'save',
      'update',
      'upsert',
    ]);
  },
});

async.each(
  [{}, {databaseId: SECOND_DATABASE_ID}],
  (clientOptions: DatastoreOptions) => {
    describe('Transaction', () => {
      let Transaction: typeof tsTypes.Transaction;
      let transaction: tsTypes.Transaction;
      const TRANSACTION_ID = 'transaction-id';
      const PROJECT_ID = 'project-id';
      const NAMESPACE = 'a-namespace';

      const DEFAULT_DATASTORE = {
        request_() {},
        projectId: PROJECT_ID,
        namespace: NAMESPACE,
      } as {} as Datastore;

      const DATASTORE = Object.assign(DEFAULT_DATASTORE, clientOptions);

      function key(path: Path) {
        return new entity.Key({path: arrify(path)});
      }

      before(() => {
        Transaction = proxyquire('../src/transaction.js', {
          '@google-cloud/promisify': fakePfy,
        }).Transaction;
      });

      beforeEach(() => {
        transaction = new Transaction(DATASTORE);
      });

      describe('instantiation', () => {
        it('should promisify all the things', () => {
          assert(promisified);
        });

        it('should localize the datastore instance', () => {
          assert.strictEqual(transaction.datastore, DATASTORE);
        });

        it('should localize the namespace', () => {
          assert.strictEqual(transaction.namespace, NAMESPACE);
        });

        it('should localize the transaction ID', () => {
          const options = {
            id: 'transaction-id',
          };

          const transaction = new Transaction(DATASTORE, options);
          assert.strictEqual(transaction.id, options.id);
        });

        it('should localize readOnly', () => {
          const options = {
            readOnly: true,
          };

          const transaction = new Transaction(DATASTORE, options);
          assert.strictEqual(transaction.readOnly, true);
        });

        it('should localize request function', done => {
          const fakeDataset: Any = {
            request_: {
              bind(context: {}) {
                assert.strictEqual(context, fakeDataset);

                setImmediate(() => {
                  assert.strictEqual(transaction.request, fakeDataset.request);
                  done();
                });

                return fakeDataset.request;
              },
            },
          };

          const transaction = new Transaction(fakeDataset);
        });

        it('should localize default properties', () => {
          assert.deepStrictEqual(transaction.modifiedEntities_, []);
          assert.deepStrictEqual(transaction.requestCallbacks_, []);
          assert.deepStrictEqual(transaction.requests_, []);
        });
      });

      describe.only('run without setting up transaction id', () => {
        // These tests were created so that when transaction.run is restructured we
        // can be confident that it works the same way as before.
        const testResp = {
          transaction: Buffer.from(Array.from(Array(100).keys())),
        };
        const namespace = 'run-without-mock';
        const projectId = 'project-id';
        const testErrorMessage = 'test-error';
        const options = {
          projectId,
          namespace,
        };
        const datastore = new Datastore(options);
        const transactionWithoutMock = datastore.transaction();
        const dataClientName = 'DatastoreClient';
        let dataClient: ClientStub | undefined;
        let originalBeginTransactionMethod: Function;

        beforeEach(async () => {
          // In this before hook, save the original beginTransaction method in a variable.
          // After tests are finished, reassign beginTransaction to the variable.
          // This way, mocking beginTransaction in this block doesn't affect other tests.
          const gapic = Object.freeze({
            v1: require('../src/v1'),
          });
          // Datastore Gapic clients haven't been initialized yet so we initialize them here.
          datastore.clients_.set(
            dataClientName,
            new gapic.v1[dataClientName](options)
          );
          dataClient = datastore.clients_.get(dataClientName);
          if (dataClient && dataClient.beginTransaction) {
            originalBeginTransactionMethod = dataClient.beginTransaction;
          }
        });

        afterEach(() => {
          // beginTransaction has likely been mocked out in these tests.
          // We should reassign beginTransaction back to its original value for tests outside this block.
          if (dataClient && originalBeginTransactionMethod) {
            dataClient.beginTransaction = originalBeginTransactionMethod;
          }
        });

        describe('should pass error back to the user', async () => {
          beforeEach(() => {
            // Mock out begin transaction and send error back to the user
            // from the Gapic layer.
            if (dataClient) {
              dataClient.beginTransaction = (
                request: protos.google.datastore.v1.IBeginTransactionRequest,
                options: CallOptions,
                callback: Callback<
                  protos.google.datastore.v1.IBeginTransactionResponse,
                  | protos.google.datastore.v1.IBeginTransactionRequest
                  | null
                  | undefined,
                  {} | null | undefined
                >
              ) => {
                callback(new Error(testErrorMessage), testResp);
              };
            }
          });

          it('should send back the error when awaiting a promise', async () => {
            try {
              await transactionWithoutMock.run();
              assert.fail('The run call should have failed.');
            } catch (error: any) {
              // TODO: Substitute type any
              assert.strictEqual(error['message'], testErrorMessage);
            }
          });
          it('should send back the error when using a callback', done => {
            const runCallback: RunCallback = (
              error: Error | null,
              transaction: Transaction | null,
              response?: google.datastore.v1.IBeginTransactionResponse
            ) => {
              assert(error);
              assert.strictEqual(error.message, testErrorMessage);
              assert.strictEqual(transaction, null);
              assert.strictEqual(response, testResp);
              done();
            };
            transactionWithoutMock.run({}, runCallback);
          });
        });
        describe('should pass response back to the user', async () => {
          beforeEach(() => {
            // Mock out begin transaction and send a response
            // back to the user from the Gapic layer.
            if (dataClient) {
              dataClient.beginTransaction = (
                request: protos.google.datastore.v1.IBeginTransactionRequest,
                options: CallOptions,
                callback: Callback<
                  protos.google.datastore.v1.IBeginTransactionResponse,
                  | protos.google.datastore.v1.IBeginTransactionRequest
                  | null
                  | undefined,
                  {} | null | undefined
                >
              ) => {
                callback(null, testResp);
              };
            }
          });
          it('should send back the response when awaiting a promise', async () => {
            const [transaction, resp] = await transactionWithoutMock.run();
            assert.strictEqual(transaction, transactionWithoutMock);
            assert.strictEqual(resp, testResp);
          });
          it('should send back the response when using a callback', done => {
            const runCallback: RunCallback = (
              error: Error | null,
              transaction: Transaction | null,
              response?: google.datastore.v1.IBeginTransactionResponse
            ) => {
              assert.strictEqual(error, null);
              assert.strictEqual(response, testResp);
              assert.strictEqual(transaction, transactionWithoutMock);
              done();
            };
            transactionWithoutMock.run({}, runCallback);
          });
          // TODO: Add a test here for calling commit
          describe('commit without setting up transaction id when run returns a response', () => {
            // These tests were created so that when transaction.commit is restructured we
            // can be confident that it works the same way as before.
            const testCommitResp = {
              mutationResults: [
                {
                  key: {
                    path: [
                      {
                        kind: 'some-kind',
                      },
                    ],
                  },
                },
              ],
            };
            const namespace = 'run-without-mock';
            const projectId = 'project-id';
            const testErrorMessage = 'test-commit-error';
            const options = {
              projectId,
              namespace,
            };
            const datastore = new Datastore(options);
            let transactionWithoutMock: Transaction;
            const dataClientName = 'DatastoreClient';
            let dataClient: ClientStub | undefined;
            let originalCommitMethod: Function;

            beforeEach(async () => {
              // Create a fresh transaction for each test because transaction state changes after a commit.
              transactionWithoutMock = datastore.transaction();
              // In this before hook, save the original beginTransaction method in a variable.
              // After tests are finished, reassign beginTransaction to the variable.
              // This way, mocking beginTransaction in this block doesn't affect other tests.
              const gapic = Object.freeze({
                v1: require('../src/v1'),
              });
              // Datastore Gapic clients haven't been initialized yet so we initialize them here.
              datastore.clients_.set(
                dataClientName,
                new gapic.v1[dataClientName](options)
              );
              dataClient = datastore.clients_.get(dataClientName);
              if (dataClient && dataClient.commit) {
                originalCommitMethod = dataClient.commit;
              }
              if (dataClient && dataClient.beginTransaction) {
                dataClient.beginTransaction = (
                  request: protos.google.datastore.v1.IBeginTransactionRequest,
                  options: CallOptions,
                  callback: Callback<
                    protos.google.datastore.v1.IBeginTransactionResponse,
                    | protos.google.datastore.v1.IBeginTransactionRequest
                    | null
                    | undefined,
                    {} | null | undefined
                  >
                ) => {
                  callback(null, testResp);
                };
              }
            });

            afterEach(() => {
              // beginTransaction has likely been mocked out in these tests.
              // We should reassign beginTransaction back to its original value for tests outside this block.
              if (dataClient && originalCommitMethod) {
                dataClient.commit = originalCommitMethod;
              }
            });

            describe('should pass error back to the user', async () => {
              beforeEach(() => {
                // Mock out begin transaction and send error back to the user
                // from the Gapic layer.
                if (dataClient) {
                  dataClient.commit = (
                    request: protos.google.datastore.v1.ICommitRequest,
                    options: CallOptions,
                    callback: Callback<
                      protos.google.datastore.v1.ICommitResponse,
                      | protos.google.datastore.v1.ICommitRequest
                      | null
                      | undefined,
                      {} | null | undefined
                    >
                  ) => {
                    callback(new Error(testErrorMessage), testCommitResp);
                  };
                }
              });

              it('should send back the error when awaiting a promise', async () => {
                try {
                  await transactionWithoutMock.run();
                  await transactionWithoutMock.commit();
                  assert.fail('The run call should have failed.');
                } catch (error: any) {
                  // TODO: Substitute type any
                  assert.strictEqual(error['message'], testErrorMessage);
                }
              });
              it('should send back the error when using a callback', done => {
                const commitCallback: CommitCallback = (
                  error: Error | null | undefined,
                  response?: google.datastore.v1.ICommitResponse
                ) => {
                  assert(error);
                  assert.strictEqual(error.message, testErrorMessage);
                  assert.strictEqual(response, testCommitResp);
                  done();
                };
                transactionWithoutMock.run(
                  (
                    error: Error | null,
                    transaction: Transaction | null,
                    response?: google.datastore.v1.IBeginTransactionResponse
                  ) => {
                    transactionWithoutMock.commit(commitCallback);
                  }
                );
              });
            });
            describe('should pass response back to the user', async () => {
              beforeEach(() => {
                // Mock out begin transaction and send a response
                // back to the user from the Gapic layer.
                if (dataClient) {
                  dataClient.commit = (
                    request: protos.google.datastore.v1.ICommitRequest,
                    options: CallOptions,
                    callback: Callback<
                      protos.google.datastore.v1.ICommitResponse,
                      | protos.google.datastore.v1.ICommitRequest
                      | null
                      | undefined,
                      {} | null | undefined
                    >
                  ) => {
                    callback(null, testCommitResp);
                  };
                }
              });
              it('should send back the response when awaiting a promise', async () => {
                await transactionWithoutMock.run();
                const [commitResults] = await transactionWithoutMock.commit();
                assert.strictEqual(commitResults, testCommitResp);
              });
              it('should send back the response when using a callback', done => {
                const commitCallback: CommitCallback = (
                  error: Error | null | undefined,
                  response?: google.datastore.v1.ICommitResponse
                ) => {
                  assert.strictEqual(error, null);
                  assert.strictEqual(response, testCommitResp);
                  done();
                };
                transactionWithoutMock.run(
                  (
                    error: Error | null,
                    transaction: Transaction | null,
                    response?: google.datastore.v1.IBeginTransactionResponse
                  ) => {
                    transactionWithoutMock.commit(commitCallback);
                  }
                );
              });
            });
          });
        });
      });

      describe('commit', () => {
        beforeEach(done => {
          transaction.id = TRANSACTION_ID;
          transaction.request_ = (config, callback) => {
            done();
            callback(null, {
              transaction: Buffer.from(Array.from(Array(100).keys())),
            });
          };
          transaction.run();
        });

        afterEach(() => {
          sinon.restore();
        });

        it('should commit', done => {
          transaction.request_ = config => {
            assert.strictEqual(config.client, 'DatastoreClient');
            assert.strictEqual(config.method, 'commit');
            assert.deepStrictEqual(config.gaxOpts, {});
            done();
          };
          transaction.commit();
        });

        it('should accept gaxOptions', done => {
          const gaxOptions = {};

          transaction.request_ = config => {
            assert.deepStrictEqual(config.gaxOpts, {});
            done();
          };

          transaction.commit(gaxOptions);
        });

        it('should skip the commit', done => {
          transaction.skipCommit = true;

          // If called, the test will blow up.
          transaction.request_ = done;

          transaction.commit(done);
        });

        describe('errors', () => {
          const error = new Error('Error.');
          const apiResponse = {};

          const rollbackError = new Error('Error.');
          const rollbackApiResponse = {};

          beforeEach(() => {
            transaction.rollback = ((callback: Function) => {
              callback(rollbackError, rollbackApiResponse);
            }) as Any;

            transaction.request_ = (config, callback) => {
              callback(error, apiResponse);
            };
          });

          it('should pass the commit error to the callback', done => {
            transaction.commit((err, resp) => {
              assert.strictEqual(err, error);
              assert.strictEqual(resp, apiResponse);
              done();
            });
          });
        });

        it('should pass apiResponse to callback', done => {
          const resp = {success: true};
          transaction.request_ = (config, callback) => {
            callback(null, resp);
          };
          transaction.commit((err, apiResponse) => {
            assert.ifError(err);
            assert.deepStrictEqual(resp, apiResponse);
            done();
          });
        });

        it('should group mutations & execute original methods', () => {
          const deleteArg1 = key(['Product', 123]);
          const deleteArg2 = key(['Product', 234]);

          const saveArg1 = {key: key(['Product', 345]), data: ''};
          const saveArg2 = {key: key(['Product', 456]), data: ''};

          // Queue saves & deletes in varying order.
          transaction.delete(deleteArg1);
          transaction.save(saveArg1);
          transaction.delete(deleteArg2);
          transaction.save(saveArg2);

          const args: Array<{}> = [];

          const deleteStub = sinon
            .stub(Datastore.prototype, 'delete')
            .callsFake(a => {
              args.push(a);
            });
          const saveStub = sinon
            .stub(Datastore.prototype, 'save')
            .callsFake(a => {
              args.push(a);
            });

          transaction.request_ = () => {};

          transaction.commit();

          assert.strictEqual(deleteStub.calledOnce, true);
          assert.strictEqual(saveStub.calledOnce, true);

          assert.strictEqual(args.length, 2);

          // Save arguments must come first.
          assert.deepStrictEqual(args, [
            [saveArg1, saveArg2],
            [deleteArg1, deleteArg2],
          ]);
        });

        it('should honor ordering of mutations (last wins)', () => {
          // The delete should be ignored.
          transaction.delete(key(['Product', 123]));
          transaction.save({key: key(['Product', 123]), data: ''});

          const deleteSpy = sinon
            .stub(Datastore.prototype, 'delete')
            .callsFake(() => {});
          const saveStub = sinon
            .stub(Datastore.prototype, 'save')
            .callsFake(() => {});

          transaction.request_ = () => {};

          transaction.commit();
          assert.strictEqual(deleteSpy.notCalled, true);
          assert.strictEqual(saveStub.calledOnce, true);
        });

        it('should not squash key-incomplete mutations', done => {
          transaction.save({key: key(['Product']), data: ''});
          transaction.save({key: key(['Product']), data: ''});

          sinon
            .stub(Datastore.prototype, 'save')
            .callsFake((entities: Entity[]) => {
              assert.strictEqual(entities.length, 2);
              done();
            });

          transaction.request_ = () => {};

          transaction.commit();
        });

        it('should send the built request object', done => {
          transaction.requests_ = [
            {
              mutations: [{a: 'b'}, {c: 'd'}],
            },
            {
              mutations: [{e: 'f'}, {g: 'h'}],
            },
          ];

          transaction.request_ = config => {
            assert.deepStrictEqual(config.reqOpts, {
              mutations: [{a: 'b'}, {c: 'd'}, {e: 'f'}, {g: 'h'}],
            });
            done();
          };

          transaction.commit();
        });

        it('should execute the queued callbacks', () => {
          let cb1Called = false;
          let cb2Called = false;

          transaction.requestCallbacks_ = [
            () => {
              cb1Called = true;
            },
            () => {
              cb2Called = true;
            },
          ];

          transaction.request_ = (config, cb) => {
            cb();
          };

          transaction.commit();

          assert(cb1Called);
          assert(cb2Called);
        });
      });

      describe('createQuery', () => {
        it('should return query from datastore.createQuery', () => {
          const args = ['0', '1']; // Query only accepts to accept string||null values
          const createQueryReturnValue = {};

          transaction.datastore.createQuery = function (...ags: Any) {
            assert.strictEqual(this, transaction);
            assert.strictEqual(ags[0], args[0]);
            assert.strictEqual(ags[1], args[1]);
            return createQueryReturnValue as Query;
          };

          const query = transaction.createQuery(args[0], args[1]); // verbose de-structure
          assert.strictEqual(query, createQueryReturnValue);
        });
      });

      describe('delete', () => {
        it('should push entities into a queue', () => {
          const keys = [
            key('Product123'),
            key('Product234'),
            key('Product345'),
          ];

          transaction.delete(keys);

          assert.strictEqual(transaction.modifiedEntities_.length, keys.length);

          transaction.modifiedEntities_.forEach((queuedEntity: Entity) => {
            assert.strictEqual(queuedEntity.method, 'delete');
            assert(keys.indexOf(queuedEntity.entity.key) > -1);
            assert.deepStrictEqual(queuedEntity.args, [
              queuedEntity.entity.key,
            ]);
          });
        });
      });

      describe('insert', () => {
        afterEach(() => {
          sinon.restore();
        });

        it('should prepare entity objects', done => {
          const entityObject = {};
          const preparedEntityObject = {prepared: true};
          const expectedEntityObject = Object.assign({}, preparedEntityObject, {
            method: 'insert',
          });

          sinon
            .stub(DatastoreRequest, 'prepareEntityObject_')
            .callsFake(obj => {
              assert.strictEqual(obj, entityObject);
              return preparedEntityObject as {};
            });

          transaction.save = (entities: Entity[]) => {
            assert.deepStrictEqual(entities[0], expectedEntityObject);
            done();
          };

          transaction.insert(entityObject);
        });

        it('should pass the correct arguments to save', done => {
          transaction.save = (entities: Entity[]) => {
            assert.deepStrictEqual(JSON.parse(JSON.stringify(entities)), [
              {
                key: {
                  namespace: 'ns',
                  kind: 'Company',
                  path: ['Company', null],
                },
                data: {},
                method: 'insert',
              },
            ]);
            done();
          };
          const key = new entity.Key({namespace: 'ns', path: ['Company']});
          transaction.insert({key, data: {}});
        });
      });

      describe('rollback', () => {
        beforeEach(() => {
          transaction.id = TRANSACTION_ID;
        });

        it('should rollback', done => {
          transaction.request_ = config => {
            assert.strictEqual(config.client, 'DatastoreClient');
            assert.strictEqual(config.method, 'rollback');
            assert.deepStrictEqual(config.gaxOpts, {});
            done();
          };
          transaction.rollback();
        });

        it('should allow setting gaxOptions', done => {
          const gaxOptions = {};

          transaction.request_ = config => {
            assert.strictEqual(config.gaxOpts, gaxOptions);
            done();
          };

          transaction.rollback(gaxOptions);
        });

        it('should pass error to callback', done => {
          const error = new Error('Error.');
          transaction.request_ = (config, callback) => {
            callback(error);
          };
          transaction.rollback(err => {
            assert.deepStrictEqual(err, error);
            done();
          });
        });

        it('should pass apiResponse to callback', done => {
          const resp = {success: true};
          transaction.request_ = (config, callback) => {
            callback(null, resp);
          };
          transaction.rollback((err, apiResponse) => {
            assert.ifError(err);
            assert.deepStrictEqual(resp, apiResponse);
            done();
          });
        });

        it('should set skipCommit', done => {
          transaction.request_ = (config, callback) => {
            callback();
          };
          transaction.rollback(() => {
            assert.strictEqual(transaction.skipCommit, true);
            done();
          });
        });

        it('should set skipCommit when rollback errors', done => {
          transaction.request_ = (config, callback) => {
            callback(new Error('Error.'));
          };
          transaction.rollback(() => {
            assert.strictEqual(transaction.skipCommit, true);
            done();
          });
        });
      });

      describe('run', () => {
        it('should make the correct API request', done => {
          transaction.request_ = config => {
            assert.strictEqual(config.client, 'DatastoreClient');
            assert.strictEqual(config.method, 'beginTransaction');
            assert.deepStrictEqual(config.reqOpts, {transactionOptions: {}});
            assert.strictEqual(config.gaxOpts, undefined);
            done();
          };

          transaction.run(assert.ifError);
        });

        it('should allow setting gaxOptions', done => {
          const gaxOptions = {};

          transaction.request_ = config => {
            assert.strictEqual(config.gaxOpts, gaxOptions);
            done();
          };

          transaction.run({gaxOptions});
        });

        describe('options.readOnly', () => {
          it('should respect the readOnly option', done => {
            const options = {
              readOnly: true,
            };

            transaction.request_ = (config: Any) => {
              assert.deepStrictEqual(
                config.reqOpts.transactionOptions.readOnly,
                {}
              );
              done();
            };

            transaction.run(options, assert.ifError);
          });

          it('should respect the global readOnly option', done => {
            transaction.readOnly = true;

            transaction.request_ = config => {
              assert.deepStrictEqual(
                config.reqOpts!.transactionOptions!.readOnly,
                {}
              );
              done();
            };

            transaction.run(assert.ifError);
          });
        });

        describe('options.transactionId', () => {
          it('should respect the transactionId option', done => {
            const options = {
              transactionId: 'transaction-id',
            };

            transaction.request_ = config => {
              assert.deepStrictEqual(
                config.reqOpts!.transactionOptions!.readWrite,
                {
                  previousTransaction: options.transactionId,
                }
              );
              done();
            };

            transaction.run(options, assert.ifError);
          });

          it('should respect the global transactionId option', done => {
            transaction.id = 'transaction-id';

            transaction.request_ = config => {
              assert.deepStrictEqual(
                config.reqOpts!.transactionOptions!.readWrite,
                {
                  previousTransaction: transaction.id,
                }
              );
              done();
            };

            transaction.run(assert.ifError);
          });
        });

        describe('options.transactionOptions', () => {
          it('should allow full override of transactionOptions', done => {
            transaction.readOnly = true;

            const options = {
              transactionOptions: {
                readWrite: {
                  previousTransaction: 'transaction-id',
                },
              },
            } as {} as TransactionOptions;

            transaction.request_ = (config: RequestConfig) => {
              assert.deepStrictEqual(config.reqOpts, options);
              done();
            };

            transaction.run(options, assert.ifError);
          });
        });

        describe('error', () => {
          const error = new Error('Error.');
          const apiResponse = {};

          beforeEach(() => {
            transaction.request_ = (config, callback) => {
              callback(error, apiResponse);
            };
          });

          it('should pass error & API response to callback', done => {
            transaction.run((err, transaction, apiResponse_) => {
              assert.strictEqual(err, error);
              assert.strictEqual(transaction, null);
              assert.strictEqual(apiResponse_, apiResponse);
              done();
            });
          });
        });

        describe('success', () => {
          const apiResponse = {
            transaction: TRANSACTION_ID,
          };

          beforeEach(() => {
            transaction.request_ = (config, callback) => {
              callback(null, apiResponse);
            };
          });

          it('should set transaction id', done => {
            delete transaction.id;
            transaction.run((err: Error | null) => {
              assert.ifError(err);
              assert.strictEqual(transaction.id, TRANSACTION_ID);
              done();
            });
          });

          it('should exec callback with Transaction & apiResponse', done => {
            transaction.run((err, transaction_, apiResponse_) => {
              assert.ifError(err);
              assert.strictEqual(transaction_, transaction);
              assert.deepStrictEqual(apiResponse_, apiResponse);
              done();
            });
          });
        });
      });

      describe('save', () => {
        it('should push entities into a queue', () => {
          const entities = [
            {key: key('Product123'), data: 123},
            {key: key('Product234'), data: 234},
            {key: key('Product345'), data: 345},
          ];
          transaction.save(entities);
          assert.strictEqual(
            transaction.modifiedEntities_.length,
            entities.length
          );
          transaction.modifiedEntities_.forEach((queuedEntity: Entity) => {
            assert.strictEqual(queuedEntity.method, 'save');
            const match = entities.filter(ent => {
              return ent.key === queuedEntity.entity.key;
            })[0];
            assert.deepStrictEqual(queuedEntity.args, [match]);
          });
        });
      });

      describe('update', () => {
        afterEach(() => {
          sinon.restore();
        });

        it('should prepare entity objects', done => {
          const entityObject = {};
          const preparedEntityObject = {prepared: true};
          const expectedEntityObject = Object.assign({}, preparedEntityObject, {
            method: 'update',
          });

          sinon
            .stub(DatastoreRequest, 'prepareEntityObject_')
            .callsFake(obj => {
              assert.strictEqual(obj, entityObject);
              return preparedEntityObject as {};
            });

          transaction.save = (entities: Entity[]) => {
            assert.deepStrictEqual(entities[0], expectedEntityObject);
            done();
          };

          transaction.update(entityObject);
        });

        it('should pass the correct arguments to save', done => {
          transaction.save = (entities: Entity[]) => {
            assert.deepStrictEqual(JSON.parse(JSON.stringify(entities)), [
              {
                key: {
                  namespace: 'ns',
                  kind: 'Company',
                  path: ['Company', null],
                },
                data: {},
                method: 'update',
              },
            ]);
            done();
          };
          const key = new entity.Key({namespace: 'ns', path: ['Company']});
          transaction.update({key, data: {}});
        });
      });

      describe('upsert', () => {
        afterEach(() => {
          sinon.restore();
        });

        it('should prepare entity objects', done => {
          const entityObject = {};
          const preparedEntityObject = {prepared: true};
          const expectedEntityObject = Object.assign({}, preparedEntityObject, {
            method: 'upsert',
          });

          sinon
            .stub(DatastoreRequest, 'prepareEntityObject_')
            .callsFake(obj => {
              assert.strictEqual(obj, entityObject);
              return preparedEntityObject as {};
            });

          transaction.save = (entities: Entity[]) => {
            assert.deepStrictEqual(entities[0], expectedEntityObject);
            done();
          };

          transaction.upsert(entityObject);
        });

        it('should pass the correct arguments to save', done => {
          transaction.save = (entities: Entity[]) => {
            assert.deepStrictEqual(JSON.parse(JSON.stringify(entities)), [
              {
                key: {
                  namespace: 'ns',
                  kind: 'Company',
                  path: ['Company', null],
                },
                data: {},
                method: 'upsert',
              },
            ]);
            done();
          };
          const key = new entity.Key({namespace: 'ns', path: ['Company']});
          transaction.upsert({key, data: {}});
        });
      });
    });
  }
);
