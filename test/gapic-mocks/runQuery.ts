// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as assert from 'assert';
import {describe} from 'mocha';
import {DatastoreClient, Datastore} from '../../src';
import * as protos from '../../protos/protos';
import {Callback} from 'google-gax';
import * as sinon from 'sinon';

describe('Run Query', () => {
  const sandbox = sinon.createSandbox();
  const PROJECT_ID = 'project-id';
  const NAMESPACE = 'namespace';
  const clientName = 'DatastoreClient';
  const options = {
    projectId: PROJECT_ID,
    namespace: NAMESPACE,
  };
  const datastore = new Datastore(options);
  // By default, datastore.clients_ is an empty map.
  // To mock out commit we need the map to contain the Gapic data client.
  // Normally a call to the data client through the datastore object would initialize it.
  // We don't want to make this call because it would make a grpc request.
  // So we just add the data client to the map.
  const gapic = Object.freeze({
    v1: require('../../src/v1'),
  });
  datastore.clients_.set(clientName, new gapic.v1[clientName](options));

  // This function is used for doing assertion checks.
  // The idea is to check that the right request gets passed to the commit function in the Gapic layer.
  function setRunQueryComparison(
    compareFn: (request: protos.google.datastore.v1.IRunQueryRequest) => void
  ) {
    const dataClient = datastore.clients_.get(clientName);
    if (dataClient) {
      dataClient.runQuery = (
        request: any,
        options: any,
        callback: (
          err?: unknown,
          res?: protos.google.datastore.v1.IRunQueryResponse
        ) => void
      ) => {
        try {
          compareFn(request);
        } catch (e) {
          callback(e);
        }
        callback(null, {
          batch: {
            moreResults:
              protos.google.datastore.v1.QueryResultBatch.MoreResultsType
                .NO_MORE_RESULTS,
          },
        });
      };
    }
  }

  it('should pass new transaction into runQuery for transactions', async () => {
    setRunQueryComparison(
      (request: protos.google.datastore.v1.IRunQueryRequest) => {
        assert.deepStrictEqual(request, {
          readOptions: {
            consistencyType: 'newTransaction',
            newTransaction: {},
          },
          partitionId: {
            namespaceId: 'namespace',
          },
          query: {
            distinctOn: [],
            kind: [{name: 'Task'}],
            order: [],
            projection: [],
          },
          projectId: 'project-id',
        });
      }
    );
    const transaction = datastore.transaction();
    const query = datastore.createQuery('Task');
    await transaction.runQuery(query);
  });
  it.only('should error when new transaction and read time are specified', done => {
    const transaction = datastore.transaction();
    const query = datastore.createQuery('Task');
    const callback = (error: Error | null) => {
      try {
        if (error) {
          assert.strictEqual(
            error.message,
            'Read time cannot be specified in a transaction.'
          );
          done();
          return;
        }
        done(new Error('The callback should have received an error'));
      } catch (err: unknown) {
        done(err);
      }
    };
    transaction.runQuery(query, {readTime: 77000}, callback);
  });
  it('should error when new transaction and eventual consistency are specified', async () => {
    const transaction = datastore.transaction();
    const query = datastore.createQuery('Task');
    const spy = sandbox.spy(() => {});
    try {
      await transaction.runQuery(query, {consistency: 'eventual'}, spy);
      assert.fail('The call to runQuery should have failed.');
    } catch (e: unknown) {
      assert.strictEqual(
        (e as {message: string}).message,
        'Read time cannot be specified in a transaction.'
      );
    }
    assert.strictEqual(spy.callCount, 1);
  });
});
