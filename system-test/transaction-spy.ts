// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as proxyquire from 'proxyquire';
import {
  Datastore,
  DatastoreAdminClient,
  DatastoreOptions,
  DatastoreRequest,
  Transaction,
  TransactionOptions,
} from '../src';
import {DatastoreClient} from '../src/v1/datastore_client';
import {RequestCallback, RequestConfig, SaveCallback} from '../src/request';
import {Entities, EntityObject} from '../src/entity';
import {CallOptions} from 'google-gax';

const testRequests: RequestConfig[] = [];

class DatastoreClientSpy extends DatastoreClient {
  // @ts-ignore
  commit(request, optionsOrCallback, callback) {
    return super.commit(request, optionsOrCallback, callback);
  }
}

const V1GapicSpy = {
  DatastoreAdminClient,
  DatastoreClient: DatastoreClientSpy,
};

class RequestsMock extends DatastoreRequest {
  request_(config: RequestConfig, callback: RequestCallback): void {
    testRequests.push(config);
    super.request_(config, callback);
  }

  static prepareEntityObject_(entity: EntityObject) {
    return super.prepareEntityObject_(entity);
  }
}

class DatastoreWithRequests extends Datastore {
  constructor(options?: DatastoreOptions) {
    super(options);
  }
}

const V1Mock = proxyquire('../src/v1/index', {
  './datastore_client': DatastoreClientSpy,
});

const RequestMock2 = proxyquire('../src/request', {
  './v1/index': V1Mock,
}).DatastoreRequest;

const DatastoreWithMockedRequest = proxyquire('../src', {
  './request': {
    DatastoreRequest: RequestsMock,
  },
}).Datastore;

// Mock Transaction class
const MockTransaction = proxyquire('../src/transaction', {
  '.': {
    Datastore: DatastoreWithMockedRequest,
  },
  './request': {
    DatastoreRequest: RequestsMock,
  },
}).Transaction;

class MockTransaction2 extends Transaction {
  constructor(datastore: Datastore, options?: TransactionOptions) {
    console.log('test');
    super(datastore, options);
  }
}

// Use proxyquire to mock the Datastore class
const MockedDatastore = proxyquire('../src', {
  './transaction': {
    Transaction: MockTransaction,
  },
}).Datastore;

export {MockedDatastore, MockTransaction, testRequests};
