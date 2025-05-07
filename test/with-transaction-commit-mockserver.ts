// Copyright 2025 Google LLC
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

import {describe, it} from 'mocha';
import {Datastore} from '../src';
import * as assert from 'assert';

import {startServer} from '../mock-server/datastore-server';
import {ErrorGenerator, shutdownServer} from './mock-server-tester';

describe('Should make calls to commit', () => {
  it('should report a DEADLINE_EXCEEDED error to the user when it occurs with the original error details', done => {
    async function write(
      docKey: string,
      // docToWrite: any // sync.ISyncDocument | undefined
    ) {
      const datastore = new Datastore({
        namespace: `${Date.now()}`,
        apiEndpoint: 'localhost:50051',
      });
      const key = datastore.key(['sync_document', docKey]);

      const transaction = datastore.transaction();

      try {
        await transaction.run();

        const [datastoreDoc] = await transaction.get(key, {});

        transaction.save({
          key,
          data: {
            metadata: [
              {
                name: 'some-string',
                value: 'some-value',
              },
            ],
          },

          excludeFromIndexes: ['instance', 'instance.*'],
        });

        await transaction.commit();

        // return toWrite;
      } catch (e) {
        await transaction.rollback();

        throw e;
      }
    }
    const errorGenerator = new ErrorGenerator();
    const server = startServer(
      async () => {
        try {
          try {
            await write('key');
          } catch (e) {
            // The test should produce the right error message here for the user.
            // TODO: Later on we are going to decide on what the error message should be
            // The error message is based on client library behavior.
            assert.strictEqual(
              (e as Error).message,
              '4 DEADLINE_EXCEEDED: error details: error count: 1',
            );
            await shutdownServer(server);
            done();
          }
        } catch (e) {
          done(e);
        }
      },
      {
        commit: errorGenerator.sendErrorSeries(4),
      },
    );
  });
});
