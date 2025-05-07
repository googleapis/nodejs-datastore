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
import {grpc} from 'google-gax';

describe('Should make calls to runQuery', () => {
  it('should report an UNAVAILABLE error to the user when it occurs with the original error details', done => {
    const errorGenerator = new ErrorGenerator();
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
            // Make the call with a shorter timeout:
            await datastore.runQuery(query, {gaxOptions: {timeout: 10000}});
            console.log('call failed');
            assert.fail('The call should not have succeeded');
          } catch (e) {
            // The test should produce the right error message here for the user.
            // TODO: Later on we are going to decide on what the error message should be
            // The error message is based on client library behavior.
            const message = (e as Error).message;
            assert.match(
              message,
              /Total timeout of API google.datastore.v1.Datastore exceeded 60000 milliseconds retrying error Error: 14 UNAVAILABLE: error details: error count:/,
            );
            const substringToFind =
              'before any response was received. : Previous errors : [{message: 14 UNAVAILABLE: error details: error count: 1, code: 14, details: , note: },{message: 14 UNAVAILABLE: error details: error count: 2, code: 14, details: , note: },';
            const escapedSubstringRegex = new RegExp(
              substringToFind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
            );
            assert.match(message, escapedSubstringRegex);
            await shutdownServer(server);
            done();
          }
        } catch (e) {
          done(e);
        }
      },
      {runQuery: errorGenerator.sendErrorSeries(grpc.status.UNAVAILABLE)},
    );
  });
});
