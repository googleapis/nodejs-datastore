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
import {sendNonRetryableError} from './grpc-endpoint';

describe('lookup', () => {
  it('should report an error to the user when it occurs', done => {
    startServer(
      async () => {
        try {
          try {
            const datastore = new Datastore({
              namespace: `${Date.now()}`,
              apiEndpoint: 'localhost:50051',
            });
            const postKey = datastore.key(['Post', 'post1']);
            await datastore.get(postKey);
            console.log('call failed');
            assert.fail('The call should not have succeeded');
          } catch (e) {
            // The test should produce the right error message here for the user.
            assert.strictEqual(
              (e as Error).message,
              '5 NOT_FOUND: error details',
            );
            done();
          }
        } catch (e) {
          done(e);
        }
      },
      {lookup: sendNonRetryableError},
    );
  });
});
