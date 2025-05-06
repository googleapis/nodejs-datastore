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
import {sendErrorSeries, shutdownServer} from './mock-server-tester';

describe.only('runQuery', () => {
  it('should report an error to the user when it occurs', done => {
    const server = startServer(
      async () => {
        try {
          try {
            const datastore = new Datastore({
              namespace: `${Date.now()}`,
              apiEndpoint: 'localhost:50051',
            });
            const postKey = datastore.key(['Post', 'post1']);
            const query = datastore.createQuery('Post').hasAncestor(postKey);
            await datastore.runQuery(query);
            console.log('call failed');
            assert.fail('The call should not have succeeded');
          } catch (e) {
            // The test should produce the right error message here for the user.
            // TODO: Later on we are going to decide on what the error message should be
            // The error message is based on client library behavior.
            assert.strictEqual(
              (e as Error).message,
              '4 DEADLINE_EXCEEDED: error details',
            );
            await shutdownServer(server);
            done();
          }
        } catch (e) {
          done(e);
        }
      },
      {runQuery: sendErrorSeries},
    );
  });
});
