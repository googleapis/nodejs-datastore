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
import {grpcEndpoint} from './grpc-endpoint';

function shutdownServer(server: any) {
  return new Promise((resolve, reject) => {
    // Assuming 'server.tryShutdown' is a function that takes a callback.
    // The callback is expected to be called when the shutdown attempt is complete.
    // If 'tryShutdown' itself can throw an error or indicate an immediate failure
    // (without calling the callback), you might need to wrap this call in a try...catch block.

    server.tryShutdown((error: any) => {
      if (error) {
        // If the callback is called with an error, reject the promise.
        console.error('Server shutdown failed:', error);
        reject(error);
      } else {
        // If the callback is called without an error, resolve the promise.
        console.log('Server has been shut down successfully.');
        resolve('done');
      }
    });

    // It's also good practice to consider scenarios where `tryShutdown`
    // might not call the callback at all in certain failure cases.
    // Depending on the specifics of `server.tryShutdown`,
    // you might want to add a timeout to prevent the promise from hanging indefinitely.
    // For example:
    // const timeoutId = setTimeout(() => {
    //   reject(new Error('Server shutdown timed out.'));
    // }, 30000); // 30 seconds timeout
    //
    // And then in the callback:
    // clearTimeout(timeoutId);
  });
}

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
            assert.strictEqual(
              (e as Error).message,
              '5 NOT_FOUND: error details',
            );
            await shutdownServer(server);
            done();
          }
        } catch (e) {
          done(e);
        }
      },
      {runQuery: grpcEndpoint},
    );
  });
});
