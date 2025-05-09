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
import {TransactionState} from '../src/request';

describe.only('Should make calls to commit', () => {
  it('should throw an ABORTED error to the user when it occurs with the original error details', async () => {
    async function write(
      docKey: string,
      // docToWrite: any // sync.ISyncDocument | undefined
    ) {
      const datastore = new Datastore({
        namespace: `${Date.now()}`,
      });
      const key = datastore.key(['sync_document', docKey]);

      const transaction = datastore.transaction();
      const transaction2 = datastore.transaction();

      const [datastoreDoc] = await transaction.get(key, {});
      const [datastoreDoc2] = await transaction2.get(key, {});
      // We need these two lines below because I couldn't figure out how to pass
      // a buffer through the mock server on time:
      transaction.id = Buffer.from('txid');
      (transaction as unknown as {state: TransactionState}).state =
        TransactionState.IN_PROGRESS;

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
      transaction2.save({
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
      await transaction2.commit();
    }
    await write('key');
  });
});
