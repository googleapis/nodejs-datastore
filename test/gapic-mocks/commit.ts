// Copyright 2023 Google LLC
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
import {before, describe} from 'mocha';
import * as ds from '../../src';
import * as proxyquire from 'proxyquire';

function FakeV1() {}

describe('Commit', () => {
  let Datastore: typeof ds.Datastore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let datastore: any;

  const PROJECT_ID = 'project-id';
  const NAMESPACE = 'namespace';
  const clientName = 'DatastoreClient';

  // This function is used for doing assertion checks.
  // The idea is to check that the right request gets passed to the commit function in the Gapic layer.
  function setCommitComparison(compareFn: (request: any) => void) {
    const dataClient = datastore.clients_.get(clientName);
    if (dataClient) {
      dataClient.commit = (
        request: any,
        options: any,
        callback: (err?: unknown) => void
      ) => {
        try {
          compareFn(request);
        } catch (e) {
          callback(e);
        }
        callback();
      };
    }
  }

  before(() => {
    Datastore = proxyquire('../../src', {
      './v1': FakeV1,
    }).Datastore;
    const options = {
      projectId: PROJECT_ID,
      namespace: NAMESPACE,
    };
    datastore = new Datastore(options);
    // By default, datastore.clients_ is an empty map.
    // To mock out commit we need the map to contain the Gapic data client.
    // Normally a call to the data client through the datastore object would initialize it.
    // We don't want to make this call because it would make a grpc request.
    // So we just add the data client to the map.
    const gapic = Object.freeze({
      v1: require('../../src/v1'),
    });
    datastore.clients_.set(clientName, new gapic.v1[clientName](options));
  });

  it('should not experience latency when fetching the project', async () => {
    const startTime = Date.now();
    setCommitComparison(() => {});
    await datastore.save([]);
    const endTime = Date.now();
    const callTime = endTime - startTime;
    console.log(`call time: ${callTime}`);
    // Testing locally reveals callTime is usually about 1.
    assert(callTime < 100);
  });
});
