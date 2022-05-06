// Copyright 2020 Google LLC
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

import * as protos from '../protos/protos';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import {describe, it} from 'mocha';
import * as datastoreadminModule from '../src';

import {PassThrough} from 'stream';

import {protobuf, LROperation, operationsProtos} from 'google-gax';

function generateSampleMessage<T extends object>(instance: T) {
  const filledObject = (
    instance.constructor as typeof protobuf.Message
  ).toObject(instance as protobuf.Message<T>, {defaults: true});
  return (instance.constructor as typeof protobuf.Message).fromObject(
    filledObject
  ) as T;
}

function stubSimpleCall<ResponseType>(response?: ResponseType, error?: Error) {
  return error
    ? sinon.stub().rejects(error)
    : sinon.stub().resolves([response]);
}

function stubSimpleCallWithCallback<ResponseType>(
  response?: ResponseType,
  error?: Error
) {
  return error
    ? sinon.stub().callsArgWith(2, error)
    : sinon.stub().callsArgWith(2, null, response);
}

function stubLongRunningCall<ResponseType>(
  response?: ResponseType,
  callError?: Error,
  lroError?: Error
) {
  const innerStub = lroError
    ? sinon.stub().rejects(lroError)
    : sinon.stub().resolves([response]);
  const mockOperation = {
    promise: innerStub,
  };
  return callError
    ? sinon.stub().rejects(callError)
    : sinon.stub().resolves([mockOperation]);
}

function stubLongRunningCallWithCallback<ResponseType>(
  response?: ResponseType,
  callError?: Error,
  lroError?: Error
) {
  const innerStub = lroError
    ? sinon.stub().rejects(lroError)
    : sinon.stub().resolves([response]);
  const mockOperation = {
    promise: innerStub,
  };
  return callError
    ? sinon.stub().callsArgWith(2, callError)
    : sinon.stub().callsArgWith(2, null, mockOperation);
}

function stubPageStreamingCall<ResponseType>(
  responses?: ResponseType[],
  error?: Error
) {
  const pagingStub = sinon.stub();
  if (responses) {
    for (let i = 0; i < responses.length; ++i) {
      pagingStub.onCall(i).callsArgWith(2, null, responses[i]);
    }
  }
  const transformStub = error
    ? sinon.stub().callsArgWith(2, error)
    : pagingStub;
  const mockStream = new PassThrough({
    objectMode: true,
    transform: transformStub,
  });
  // trigger as many responses as needed
  if (responses) {
    for (let i = 0; i < responses.length; ++i) {
      setImmediate(() => {
        mockStream.write({});
      });
    }
    setImmediate(() => {
      mockStream.end();
    });
  } else {
    setImmediate(() => {
      mockStream.write({});
    });
    setImmediate(() => {
      mockStream.end();
    });
  }
  return sinon.stub().returns(mockStream);
}

function stubAsyncIterationCall<ResponseType>(
  responses?: ResponseType[],
  error?: Error
) {
  let counter = 0;
  const asyncIterable = {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          if (error) {
            return Promise.reject(error);
          }
          if (counter >= responses!.length) {
            return Promise.resolve({done: true, value: undefined});
          }
          return Promise.resolve({done: false, value: responses![counter++]});
        },
      };
    },
  };
  return sinon.stub().returns(asyncIterable);
}

describe('v1.DatastoreAdminClient', () => {
  it('has servicePath', () => {
    const servicePath =
      datastoreadminModule.v1.DatastoreAdminClient.servicePath;
    assert(servicePath);
  });

  it('has apiEndpoint', () => {
    const apiEndpoint =
      datastoreadminModule.v1.DatastoreAdminClient.apiEndpoint;
    assert(apiEndpoint);
  });

  it('has port', () => {
    const port = datastoreadminModule.v1.DatastoreAdminClient.port;
    assert(port);
    assert(typeof port === 'number');
  });

  it('should create a client with no option', () => {
    const client = new datastoreadminModule.v1.DatastoreAdminClient();
    assert(client);
  });

  it('should create a client with gRPC fallback', () => {
    const client = new datastoreadminModule.v1.DatastoreAdminClient({
      fallback: true,
    });
    assert(client);
  });

  it('has initialize method and supports deferred initialization', async () => {
    const client = new datastoreadminModule.v1.DatastoreAdminClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    assert.strictEqual(client.datastoreAdminStub, undefined);
    await client.initialize();
    assert(client.datastoreAdminStub);
  });

  it('has close method', () => {
    const client = new datastoreadminModule.v1.DatastoreAdminClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.close();
  });

  it('has getProjectId method', async () => {
    const fakeProjectId = 'fake-project-id';
    const client = new datastoreadminModule.v1.DatastoreAdminClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.auth.getProjectId = sinon.stub().resolves(fakeProjectId);
    const result = await client.getProjectId();
    assert.strictEqual(result, fakeProjectId);
    assert((client.auth.getProjectId as SinonStub).calledWithExactly());
  });

  it('has getProjectId method with callback', async () => {
    const fakeProjectId = 'fake-project-id';
    const client = new datastoreadminModule.v1.DatastoreAdminClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.auth.getProjectId = sinon
      .stub()
      .callsArgWith(0, null, fakeProjectId);
    const promise = new Promise((resolve, reject) => {
      client.getProjectId((err?: Error | null, projectId?: string | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(projectId);
        }
      });
    });
    const result = await promise;
    assert.strictEqual(result, fakeProjectId);
  });

  describe('getIndex', () => {
    it('invokes getIndex without error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.GetIndexRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.datastore.admin.v1.Index()
      );
      client.innerApiCalls.getIndex = stubSimpleCall(expectedResponse);
      const [response] = await client.getIndex(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.getIndex as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes getIndex without error using callback', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.GetIndexRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.datastore.admin.v1.Index()
      );
      client.innerApiCalls.getIndex =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.getIndex(
          request,
          (
            err?: Error | null,
            result?: protos.google.datastore.admin.v1.IIndex | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.getIndex as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes getIndex with error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.GetIndexRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.getIndex = stubSimpleCall(undefined, expectedError);
      await assert.rejects(client.getIndex(request), expectedError);
      assert(
        (client.innerApiCalls.getIndex as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });
  });

  describe('exportEntities', () => {
    it('invokes exportEntities without error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ExportEntitiesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.longrunning.Operation()
      );
      client.innerApiCalls.exportEntities =
        stubLongRunningCall(expectedResponse);
      const [operation] = await client.exportEntities(request);
      const [response] = await operation.promise();
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.exportEntities as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes exportEntities without error using callback', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ExportEntitiesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.longrunning.Operation()
      );
      client.innerApiCalls.exportEntities =
        stubLongRunningCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.exportEntities(
          request,
          (
            err?: Error | null,
            result?: LROperation<
              protos.google.datastore.admin.v1.IExportEntitiesResponse,
              protos.google.datastore.admin.v1.IExportEntitiesMetadata
            > | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const operation = (await promise) as LROperation<
        protos.google.datastore.admin.v1.IExportEntitiesResponse,
        protos.google.datastore.admin.v1.IExportEntitiesMetadata
      >;
      const [response] = await operation.promise();
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.exportEntities as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes exportEntities with call error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ExportEntitiesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.exportEntities = stubLongRunningCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.exportEntities(request), expectedError);
      assert(
        (client.innerApiCalls.exportEntities as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes exportEntities with LRO error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ExportEntitiesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.exportEntities = stubLongRunningCall(
        undefined,
        undefined,
        expectedError
      );
      const [operation] = await client.exportEntities(request);
      await assert.rejects(operation.promise(), expectedError);
      assert(
        (client.innerApiCalls.exportEntities as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes checkExportEntitiesProgress without error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const expectedResponse = generateSampleMessage(
        new operationsProtos.google.longrunning.Operation()
      );
      expectedResponse.name = 'test';
      expectedResponse.response = {type_url: 'url', value: Buffer.from('')};
      expectedResponse.metadata = {type_url: 'url', value: Buffer.from('')};

      client.operationsClient.getOperation = stubSimpleCall(expectedResponse);
      const decodedOperation = await client.checkExportEntitiesProgress(
        expectedResponse.name
      );
      assert.deepStrictEqual(decodedOperation.name, expectedResponse.name);
      assert(decodedOperation.metadata);
      assert((client.operationsClient.getOperation as SinonStub).getCall(0));
    });

    it('invokes checkExportEntitiesProgress with error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const expectedError = new Error('expected');

      client.operationsClient.getOperation = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(
        client.checkExportEntitiesProgress(''),
        expectedError
      );
      assert((client.operationsClient.getOperation as SinonStub).getCall(0));
    });
  });

  describe('importEntities', () => {
    it('invokes importEntities without error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ImportEntitiesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.longrunning.Operation()
      );
      client.innerApiCalls.importEntities =
        stubLongRunningCall(expectedResponse);
      const [operation] = await client.importEntities(request);
      const [response] = await operation.promise();
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.importEntities as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes importEntities without error using callback', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ImportEntitiesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = generateSampleMessage(
        new protos.google.longrunning.Operation()
      );
      client.innerApiCalls.importEntities =
        stubLongRunningCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.importEntities(
          request,
          (
            err?: Error | null,
            result?: LROperation<
              protos.google.protobuf.IEmpty,
              protos.google.datastore.admin.v1.IImportEntitiesMetadata
            > | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const operation = (await promise) as LROperation<
        protos.google.protobuf.IEmpty,
        protos.google.datastore.admin.v1.IImportEntitiesMetadata
      >;
      const [response] = await operation.promise();
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.importEntities as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes importEntities with call error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ImportEntitiesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.importEntities = stubLongRunningCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.importEntities(request), expectedError);
      assert(
        (client.innerApiCalls.importEntities as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes importEntities with LRO error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ImportEntitiesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.importEntities = stubLongRunningCall(
        undefined,
        undefined,
        expectedError
      );
      const [operation] = await client.importEntities(request);
      await assert.rejects(operation.promise(), expectedError);
      assert(
        (client.innerApiCalls.importEntities as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes checkImportEntitiesProgress without error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const expectedResponse = generateSampleMessage(
        new operationsProtos.google.longrunning.Operation()
      );
      expectedResponse.name = 'test';
      expectedResponse.response = {type_url: 'url', value: Buffer.from('')};
      expectedResponse.metadata = {type_url: 'url', value: Buffer.from('')};

      client.operationsClient.getOperation = stubSimpleCall(expectedResponse);
      const decodedOperation = await client.checkImportEntitiesProgress(
        expectedResponse.name
      );
      assert.deepStrictEqual(decodedOperation.name, expectedResponse.name);
      assert(decodedOperation.metadata);
      assert((client.operationsClient.getOperation as SinonStub).getCall(0));
    });

    it('invokes checkImportEntitiesProgress with error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const expectedError = new Error('expected');

      client.operationsClient.getOperation = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(
        client.checkImportEntitiesProgress(''),
        expectedError
      );
      assert((client.operationsClient.getOperation as SinonStub).getCall(0));
    });
  });

  describe('listIndexes', () => {
    it('invokes listIndexes without error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ListIndexesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = [
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
      ];
      client.innerApiCalls.listIndexes = stubSimpleCall(expectedResponse);
      const [response] = await client.listIndexes(request);
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.listIndexes as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes listIndexes without error using callback', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ListIndexesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedResponse = [
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
      ];
      client.innerApiCalls.listIndexes =
        stubSimpleCallWithCallback(expectedResponse);
      const promise = new Promise((resolve, reject) => {
        client.listIndexes(
          request,
          (
            err?: Error | null,
            result?: protos.google.datastore.admin.v1.IIndex[] | null
          ) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const response = await promise;
      assert.deepStrictEqual(response, expectedResponse);
      assert(
        (client.innerApiCalls.listIndexes as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions /*, callback defined above */)
      );
    });

    it('invokes listIndexes with error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ListIndexesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedOptions = {
        otherArgs: {
          headers: {
            'x-goog-request-params': expectedHeaderRequestParams,
          },
        },
      };
      const expectedError = new Error('expected');
      client.innerApiCalls.listIndexes = stubSimpleCall(
        undefined,
        expectedError
      );
      await assert.rejects(client.listIndexes(request), expectedError);
      assert(
        (client.innerApiCalls.listIndexes as SinonStub)
          .getCall(0)
          .calledWith(request, expectedOptions, undefined)
      );
    });

    it('invokes listIndexesStream without error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ListIndexesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedResponse = [
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
      ];
      client.descriptors.page.listIndexes.createStream =
        stubPageStreamingCall(expectedResponse);
      const stream = client.listIndexesStream(request);
      const promise = new Promise((resolve, reject) => {
        const responses: protos.google.datastore.admin.v1.Index[] = [];
        stream.on(
          'data',
          (response: protos.google.datastore.admin.v1.Index) => {
            responses.push(response);
          }
        );
        stream.on('end', () => {
          resolve(responses);
        });
        stream.on('error', (err: Error) => {
          reject(err);
        });
      });
      const responses = await promise;
      assert.deepStrictEqual(responses, expectedResponse);
      assert(
        (client.descriptors.page.listIndexes.createStream as SinonStub)
          .getCall(0)
          .calledWith(client.innerApiCalls.listIndexes, request)
      );
      assert.strictEqual(
        (client.descriptors.page.listIndexes.createStream as SinonStub).getCall(
          0
        ).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });

    it('invokes listIndexesStream with error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ListIndexesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedError = new Error('expected');
      client.descriptors.page.listIndexes.createStream = stubPageStreamingCall(
        undefined,
        expectedError
      );
      const stream = client.listIndexesStream(request);
      const promise = new Promise((resolve, reject) => {
        const responses: protos.google.datastore.admin.v1.Index[] = [];
        stream.on(
          'data',
          (response: protos.google.datastore.admin.v1.Index) => {
            responses.push(response);
          }
        );
        stream.on('end', () => {
          resolve(responses);
        });
        stream.on('error', (err: Error) => {
          reject(err);
        });
      });
      await assert.rejects(promise, expectedError);
      assert(
        (client.descriptors.page.listIndexes.createStream as SinonStub)
          .getCall(0)
          .calledWith(client.innerApiCalls.listIndexes, request)
      );
      assert.strictEqual(
        (client.descriptors.page.listIndexes.createStream as SinonStub).getCall(
          0
        ).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });

    it('uses async iteration with listIndexes without error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ListIndexesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedResponse = [
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
        generateSampleMessage(new protos.google.datastore.admin.v1.Index()),
      ];
      client.descriptors.page.listIndexes.asyncIterate =
        stubAsyncIterationCall(expectedResponse);
      const responses: protos.google.datastore.admin.v1.IIndex[] = [];
      const iterable = client.listIndexesAsync(request);
      for await (const resource of iterable) {
        responses.push(resource!);
      }
      assert.deepStrictEqual(responses, expectedResponse);
      assert.deepStrictEqual(
        (client.descriptors.page.listIndexes.asyncIterate as SinonStub).getCall(
          0
        ).args[1],
        request
      );
      assert.strictEqual(
        (client.descriptors.page.listIndexes.asyncIterate as SinonStub).getCall(
          0
        ).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });

    it('uses async iteration with listIndexes with error', async () => {
      const client = new datastoreadminModule.v1.DatastoreAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      client.initialize();
      const request = generateSampleMessage(
        new protos.google.datastore.admin.v1.ListIndexesRequest()
      );
      request.projectId = '';
      const expectedHeaderRequestParams = 'project_id=';
      const expectedError = new Error('expected');
      client.descriptors.page.listIndexes.asyncIterate = stubAsyncIterationCall(
        undefined,
        expectedError
      );
      const iterable = client.listIndexesAsync(request);
      await assert.rejects(async () => {
        const responses: protos.google.datastore.admin.v1.IIndex[] = [];
        for await (const resource of iterable) {
          responses.push(resource!);
        }
      });
      assert.deepStrictEqual(
        (client.descriptors.page.listIndexes.asyncIterate as SinonStub).getCall(
          0
        ).args[1],
        request
      );
      assert.strictEqual(
        (client.descriptors.page.listIndexes.asyncIterate as SinonStub).getCall(
          0
        ).args[2].otherArgs.headers['x-goog-request-params'],
        expectedHeaderRequestParams
      );
    });
  });
});
