// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as protosTypes from '../protos/protos';
import * as assert from 'assert';
import {describe, it} from 'mocha';
const datastoreModule = require('../src');

const FAKE_STATUS_CODE = 1;
class FakeError {
  name: string;
  message: string;
  code: number;
  constructor(n: number) {
    this.name = 'fakeName';
    this.message = 'fake message';
    this.code = n;
  }
}
const error = new FakeError(FAKE_STATUS_CODE);
export interface Callback {
  (err: FakeError | null, response?: {} | null): void;
}

export class Operation {
  constructor() {}
  promise() {}
}
function mockSimpleGrpcMethod(
  expectedRequest: {},
  response: {} | null,
  error: FakeError | null
) {
  return (actualRequest: {}, options: {}, callback: Callback) => {
    assert.deepStrictEqual(actualRequest, expectedRequest);
    if (error) {
      callback(error);
    } else if (response) {
      callback(null, response);
    } else {
      callback(null);
    }
  };
}
describe('v1.DatastoreClient', () => {
  it('has servicePath', () => {
    const servicePath = datastoreModule.v1.DatastoreClient.servicePath;
    assert(servicePath);
  });
  it('has apiEndpoint', () => {
    const apiEndpoint = datastoreModule.v1.DatastoreClient.apiEndpoint;
    assert(apiEndpoint);
  });
  it('has port', () => {
    const port = datastoreModule.v1.DatastoreClient.port;
    assert(port);
    assert(typeof port === 'number');
  });
  it('should create a client with no option', () => {
    const client = new datastoreModule.v1.DatastoreClient();
    assert(client);
  });
  it('should create a client with gRPC fallback', () => {
    const client = new datastoreModule.v1.DatastoreClient({
      fallback: true,
    });
    assert(client);
  });
  it('has initialize method and supports deferred initialization', async () => {
    const client = new datastoreModule.v1.DatastoreClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    assert.strictEqual(client.datastoreStub, undefined);
    await client.initialize();
    assert(client.datastoreStub);
  });
  it('has close method', () => {
    const client = new datastoreModule.v1.DatastoreClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.close();
  });
  describe('lookup', () => {
    it('invokes lookup without error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.ILookupRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.lookup = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.lookup(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes lookup with error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.ILookupRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.lookup = mockSimpleGrpcMethod(request, null, error);
      client.lookup(request, (err: FakeError, response: {}) => {
        assert(err instanceof FakeError);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
  describe('runQuery', () => {
    it('invokes runQuery without error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IRunQueryRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.runQuery = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.runQuery(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes runQuery with error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IRunQueryRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.runQuery = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.runQuery(request, (err: FakeError, response: {}) => {
        assert(err instanceof FakeError);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
  describe('beginTransaction', () => {
    it('invokes beginTransaction without error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IBeginTransactionRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.beginTransaction = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.beginTransaction(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes beginTransaction with error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IBeginTransactionRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.beginTransaction = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.beginTransaction(request, (err: FakeError, response: {}) => {
        assert(err instanceof FakeError);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
  describe('commit', () => {
    it('invokes commit without error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.ICommitRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.commit = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.commit(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes commit with error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.ICommitRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.commit = mockSimpleGrpcMethod(request, null, error);
      client.commit(request, (err: FakeError, response: {}) => {
        assert(err instanceof FakeError);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
  describe('rollback', () => {
    it('invokes rollback without error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IRollbackRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.rollback = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.rollback(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes rollback with error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IRollbackRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.rollback = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.rollback(request, (err: FakeError, response: {}) => {
        assert(err instanceof FakeError);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
  describe('allocateIds', () => {
    it('invokes allocateIds without error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IAllocateIdsRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.allocateIds = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.allocateIds(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes allocateIds with error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IAllocateIdsRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.allocateIds = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.allocateIds(request, (err: FakeError, response: {}) => {
        assert(err instanceof FakeError);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
  describe('reserveIds', () => {
    it('invokes reserveIds without error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IReserveIdsRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.reserveIds = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.reserveIds(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes reserveIds with error', done => {
      const client = new datastoreModule.v1.DatastoreClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.datastore.v1.IReserveIdsRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.reserveIds = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.reserveIds(request, (err: FakeError, response: {}) => {
        assert(err instanceof FakeError);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
});
