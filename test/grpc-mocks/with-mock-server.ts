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

import {before, describe} from 'mocha';
import {Datastore} from '../../src';
import {MockService} from '../util/mock-servers/mock-service';
import {MockServer} from '../util/mock-servers/mock-server';
import {DatastoreClientMockService} from '../util/mock-servers/service-implementations/datastore-client-mock-service';
// import assert from 'assert';

describe('Datastore/Unary', () => {
  let server: MockServer;
  let service: MockService;
  let datastore: Datastore;
  const projectId = 'project-id';

  before(async () => {
    // make sure we have everything initialized before starting tests
    const port = await new Promise<string>(resolve => {
      server = new MockServer(resolve);
    });
    datastore = new Datastore({
      apiEndpoint: `localhost:${port}`,
      projectId,
    });
    service = new DatastoreClientMockService(server);
  });

  describe('some-test', async () => {
    let callStartTime: number;
    const emitTableNotExistsError = (stream: any) => {
      const callEndTime = Date.now();
      const timeElaspsed = callEndTime - callStartTime;
      console.log(timeElaspsed);
    };
    before(async () => {
      service.setService({
        RunQuery: emitTableNotExistsError,
      });
    });
    it.only('should not experience latency when making the grpc call', async () => {
      // const startTime = Date.now();
      callStartTime = Date.now();
      const kind = 'Character';
      const query = datastore.createQuery(kind);
      await datastore.runQuery(query);
      service.setService({
        RunQuery: emitTableNotExistsError,
      });
      const gaxOptions = {
        retryRequestOptions: {
          currentRetryAttempt: 0,
        },
      };
      await datastore.runQuery(query, {gaxOptions});
      // const [entities] = await datastore.runQuery(query);
    });
  });
});
