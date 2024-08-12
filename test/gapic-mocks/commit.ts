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
import * as protos from '../../protos/protos';
import {getInitializedDatastoreClient} from './get-initialized-datastore-client';
import type {CallOptions} from 'google-gax';
import {Entities} from '../../src/entity';
import {google} from '../../protos/protos';

describe('Commit', () => {
  const clientName = 'DatastoreClient';
  const datastore = getInitializedDatastoreClient();

  // This function is used for doing assertion checks.
  // The idea is to check that the right request gets passed to the commit function in the Gapic layer.
  function setCommitComparison(
    compareFn: (request: protos.google.datastore.v1.ICommitRequest) => void
  ) {
    const dataClient = datastore.clients_.get(clientName);
    if (dataClient) {
      dataClient.commit = (
        request: protos.google.datastore.v1.ICommitRequest,
        options: CallOptions,
        callback: (
          err?: unknown,
          res?: protos.google.datastore.v1.ICommitResponse
        ) => void
      ) => {
        try {
          compareFn(request);
        } catch (e) {
          callback(e);
        }
        callback(null, {
          mutationResults: [],
        });
      };
    }
  }
  function expectCommitRequest(
    expectedMutations: google.datastore.v1.IMutation[]
  ) {
    setCommitComparison(
      (request: protos.google.datastore.v1.ICommitRequest) => {
        assert.deepStrictEqual(request.mutations, expectedMutations);
      }
    );
  }

  describe.only('should pass the right request to gapic with excludeFromLargeProperties', () => {
    async function runTest(
      entities: Entities,
      expectedMutations: google.datastore.v1.IMutation[]
    ) {
      expectCommitRequest(expectedMutations);
      const postKey = datastore.key(['Post', 'post2']);
      await datastore.save({
        key: postKey,
        data: entities,
        excludeLargeProperties: true,
      });
    }
    it.skip('should pass the right request to gapic with excludeFromLargeProperties', async () => {
      const entities = [
        {
          name: 'field_b',
          value: {
            nestedField: Buffer.alloc(1501, '.').toString(),
          },
          excludeFromIndexes: true,
        },
      ];
      const expectedMutations = [
        {
          upsert: {
            properties: {
              field_b: {
                entityValue: {
                  properties: {},
                },
              },
            },
            key: {
              path: [
                {
                  kind: 'Post',
                  name: 'post2',
                },
              ],
              partitionId: {
                namespaceId: 'namespace',
              },
            },
          },
        },
      ];
      await runTest(entities, expectedMutations);
    });
  });
});
