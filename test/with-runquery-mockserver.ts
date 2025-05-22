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
              projectId: 'test-project', // Provided to avoid 'Unable to detect a Project Id in the current environment.'
            });
            const postKey = datastore.key(['Post', 'post1']);
            const query = datastore.createQuery('Post').hasAncestor(postKey);
            // Make the call with a shorter timeout:
            await datastore.runQuery(query, {gaxOptions: {timeout: 5000}});
            assert.fail('The call should not have succeeded');
          } catch (e) {
            // The test should produce the right error message here for the user.
            // TODO: Later on we are going to decide on what the error message should be
            // The error message is based on client library behavior.
            const message = (e as Error).message;
            const searchValue = /[.*+?^${}()|[\]\\]/g;
            const replaceValue = '\\$&';
            const substringToFind1 =
              'Total timeout of API google.datastore.v1.Datastore exceeded 5000 milliseconds retrying error Error: 14 UNAVAILABLE: error details: error count:';
            const escapedSubstringRegex1 = new RegExp(
              substringToFind1.replace(searchValue, replaceValue),
            );
            assert.match(message, escapedSubstringRegex1);
            const substringToFind2 =
              'before any response was received. : Previous errors : [{message: 14 UNAVAILABLE: error details: error count: 1, code: 14, details: , note: },{message: 14 UNAVAILABLE: error details: error count: 2, code: 14, details: , note: },';
            const escapedSubstringRegex2 = new RegExp(
              substringToFind2.replace(searchValue, replaceValue),
            );
            assert.match(message, escapedSubstringRegex2);
            done();
          }
        } catch (e) {
          done(e);
        }
        await shutdownServer(server);
      },
      {runQuery: errorGenerator.sendErrorSeries(grpc.status.UNAVAILABLE)},
    );
  });
});
