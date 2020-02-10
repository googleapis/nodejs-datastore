// Copyright 2014 Google LLC
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

import * as assert from 'assert';
import {before, beforeEach, after, afterEach, describe, it} from 'mocha';
import * as gax from 'google-gax';
import * as proxyquire from 'proxyquire';

import * as ds from '../src';
import {Datastore, DatastoreOptions} from '../src';
import {entity, Entity} from '../src/entity';
import {DatastoreRequest, CommitResponse, GetResponse} from '../src/request';
import * as sinon from 'sinon';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const v1 = require('../src/v1/index.js');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakeEntity: any = {
  KEY_SYMBOL: Symbol('fake key symbol'),
  Int: class {
    value: {};
    constructor(value: {}) {
      this.value = value;
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isDsInt(...args: any[]) {
    this.calledWith_ = args;
  },
  Double: class {
    value: {};
    constructor(value: {}) {
      this.value = value;
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isDsDouble(...args: any[]) {
    this.calledWith_ = args;
  },
  GeoPoint: class {
    value: {};
    constructor(value: {}) {
      this.value = value;
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isDsGeoPoint(...args: any) {
    this.calledWith_ = args;
  },
  Key: class {
    calledWith_: IArguments;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any) {
      this.calledWith_ = args;
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isDsKey(...args: any) {
    this.calledWith_ = args;
  },
  URLSafeKey: entity.URLSafeKey,
};

let googleAuthOverride: Function | null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fakeGoogleAuth(...args: any) {
  return (googleAuthOverride || (() => {}))(...args);
}

let createInsecureOverride: Function | null;

const fakeGoogleGax = {
  GrpcClient: class extends gax.GrpcClient {
    constructor(opts: gax.GrpcClientOptions) {
      // super constructor must be called first!
      super(opts);
      this.grpc = ({
        credentials: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          createInsecure(...args: any[]) {
            return (createInsecureOverride || (() => {}))(...args);
          },
        },
      } as {}) as gax.GrpcModule;
    }
  },
};

class FakeQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calledWith_: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    this.calledWith_ = args;
  }
}

class FakeTransaction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calledWith_: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rollback: Function;
  constructor(...args: any[]) {
    this.calledWith_ = args;
    this.rollback = () => {};
  }
}

function FakeV1() {}

describe('Datastore', () => {
  let Datastore: typeof ds.Datastore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let datastore: any;

  const PROJECT_ID = 'project-id';
  const NAMESPACE = 'namespace';

  const DATASTORE_PROJECT_ID_CACHED = process.env.DATASTORE_PROJECT_ID;

  const OPTIONS = {
    projectId: PROJECT_ID,
    apiEndpoint: 'http://endpoint',
    credentials: {},
    keyFilename: 'key/file',
    email: 'email',
    namespace: NAMESPACE,
  };

  before(() => {
    Datastore = proxyquire('../src', {
      './entity.js': {entity: fakeEntity},
      './query.js': {Query: FakeQuery},
      './transaction.js': {Transaction: FakeTransaction},
      './v1': FakeV1,
      'google-auth-library': {
        GoogleAuth: fakeGoogleAuth,
      },
      'google-gax': fakeGoogleGax,
    }).Datastore;
  });

  beforeEach(() => {
    createInsecureOverride = null;
    googleAuthOverride = null;

    datastore = new Datastore({
      projectId: PROJECT_ID,
      namespace: NAMESPACE,
    });
  });

  afterEach(() => {
    if (typeof DATASTORE_PROJECT_ID_CACHED === 'string') {
      process.env.DATASTORE_PROJECT_ID = DATASTORE_PROJECT_ID_CACHED;
    } else {
      delete process.env.DATASTORE_PROJECT_ID;
    }
  });

  after(() => {
    createInsecureOverride = null;
    googleAuthOverride = null;
  });

  it('should export GAX client', () => {
    assert.ok(require('../src').v1);
  });

  describe('instantiation', () => {
    it('should initialize an empty Client map', () => {
      assert(datastore.clients_ instanceof Map);
      assert.strictEqual(datastore.clients_.size, 0);
    });

    it('should alias itself to the datastore property', () => {
      assert.strictEqual(datastore.datastore, datastore);
    });

    it('should localize the namespace', () => {
      assert.strictEqual(datastore.namespace, NAMESPACE);
    });

    it('should localize the projectId', () => {
      assert.strictEqual(datastore.projectId, PROJECT_ID);
      assert.strictEqual(datastore.options.projectId, PROJECT_ID);
    });

    it('should default project ID to placeholder', () => {
      const datastore = new Datastore();
      assert.strictEqual(datastore.projectId, '{{projectId}}');
    });

    it('should not default options.projectId to placeholder', () => {
      const datastore = new Datastore({});
      assert.strictEqual(datastore.options.projectId, undefined);
    });

    it('should use DATASTORE_PROJECT_ID', () => {
      const projectId = 'overridden-project-id';

      process.env.DATASTORE_PROJECT_ID = projectId;

      const datastore = new Datastore({});

      assert.strictEqual(datastore.projectId, projectId);
      assert.strictEqual(datastore.options.projectId, projectId);
    });

    it('should set the default base URL', () => {
      assert.strictEqual(datastore.defaultBaseUrl_, 'datastore.googleapis.com');
    });

    it('should set default API connection details', done => {
      const determineBaseUrl_ = Datastore.prototype.determineBaseUrl_;

      Datastore.prototype.determineBaseUrl_ = customApiEndpoint => {
        Datastore.prototype.determineBaseUrl_ = determineBaseUrl_;

        assert.strictEqual(customApiEndpoint, OPTIONS.apiEndpoint);
        done();
      };

      new Datastore(OPTIONS);
    });

    it('should localize the options', () => {
      delete process.env.DATASTORE_PROJECT_ID;

      const options = {
        a: 'b',
        c: 'd',
      } as DatastoreOptions;

      const datastore = new Datastore(options);

      assert.notStrictEqual(datastore.options, options);

      assert.deepStrictEqual(
        datastore.options,
        Object.assign(
          {
            libName: 'gccl',
            libVersion: require('../../package.json').version,
            scopes: v1.DatastoreClient.scopes,
            servicePath: datastore.baseUrl_,
            port: 443,
            projectId: undefined,
          },
          options
        )
      );
    });

    it('should set port if detected', () => {
      const determineBaseUrl_ = Datastore.prototype.determineBaseUrl_;
      const port = 99;
      Datastore.prototype.determineBaseUrl_ = function() {
        Datastore.prototype.determineBaseUrl_ = determineBaseUrl_;
        this.port_ = port;
      };
      const datastore = new Datastore(OPTIONS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.strictEqual((datastore.options as any).port, port);
    });

    it('should set grpc ssl credentials if custom endpoint', () => {
      const determineBaseUrl_ = Datastore.prototype.determineBaseUrl_;

      Datastore.prototype.determineBaseUrl_ = function() {
        Datastore.prototype.determineBaseUrl_ = determineBaseUrl_;
        this.customEndpoint_ = true;
      };

      const fakeInsecureCreds = {};
      createInsecureOverride = () => {
        return fakeInsecureCreds;
      };

      const datastore = new Datastore(OPTIONS);

      assert.strictEqual(datastore.options.sslCreds, fakeInsecureCreds);
    });

    it('should cache a local GoogleAuth instance', () => {
      const fakeGoogleAuthInstance = {};

      googleAuthOverride = () => {
        return fakeGoogleAuthInstance;
      };

      const datastore = new Datastore({});
      assert.strictEqual(datastore.auth, fakeGoogleAuthInstance);
    });
  });

  describe('double', () => {
    it('should expose Double builder', () => {
      const aDouble = 7.0;
      const double = Datastore.double(aDouble);
      assert.strictEqual(double.value, aDouble);
    });

    it('should also be on the prototype', () => {
      const aDouble = 7.0;
      const double = datastore.double(aDouble);
      assert.strictEqual(double.value, aDouble);
    });
  });

  describe('geoPoint', () => {
    it('should expose GeoPoint builder', () => {
      const aGeoPoint = {latitude: 24, longitude: 88};
      const geoPoint = Datastore.geoPoint(aGeoPoint);
      assert.strictEqual(geoPoint.value, aGeoPoint);
    });

    it('should also be on the prototype', () => {
      const aGeoPoint = {latitude: 24, longitude: 88};
      const geoPoint = datastore.geoPoint(aGeoPoint);
      assert.strictEqual(geoPoint.value, aGeoPoint);
    });
  });

  describe('int', () => {
    it('should expose Int builder', () => {
      const anInt = 7;
      const int = Datastore.int(anInt);
      assert.strictEqual(int.value, anInt);
    });

    it('should also be on the prototype', () => {
      const anInt = 7;
      const int = datastore.int(anInt);
      assert.strictEqual(int.value, anInt);
    });
  });

  describe('isDouble', () => {
    it('should pass value to entity', () => {
      const value = 0.42;
      let called = false;
      const saved = fakeEntity.isDsDouble;
      fakeEntity.isDsDouble = (arg: {}) => {
        assert.strictEqual(arg, value);
        called = true;
        return false;
      };
      assert.strictEqual(datastore.isDouble(value), false);
      assert.strictEqual(called, true);
      fakeEntity.isDsDouble = saved;
    });

    it('should expose Double identifier', () => {
      const something = {};
      Datastore.isDouble(something);
      assert.strictEqual(fakeEntity.calledWith_[0], something);
    });
  });

  describe('isGeoPoint', () => {
    it('should pass value to entity', () => {
      const value = {fakeLatitude: 1, fakeLongitude: 2};
      let called = false;
      const saved = fakeEntity.isDsGeoPoint;
      fakeEntity.isDsGeoPoint = (arg: {}) => {
        assert.strictEqual(arg, value);
        called = true;
        return false;
      };
      assert.strictEqual(datastore.isGeoPoint(value), false);
      assert.strictEqual(called, true);
      fakeEntity.isDsGeoPoint = saved;
    });

    it('should expose GeoPoint identifier', () => {
      const something = {};
      Datastore.isGeoPoint(something);
      assert.strictEqual(fakeEntity.calledWith_[0], something);
    });
  });

  describe('isInt', () => {
    it('should pass value to entity', () => {
      const value = 42;
      let called = false;
      const saved = fakeEntity.isDsInt;
      fakeEntity.isDsInt = (arg: {}) => {
        assert.strictEqual(arg, value);
        called = true;
        return false;
      };
      assert.strictEqual(datastore.isInt(value), false);
      assert.strictEqual(called, true);
      fakeEntity.isDsInt = saved;
    });

    it('should expose Int identifier', () => {
      const something = {};
      Datastore.isInt(something);
      assert.strictEqual(fakeEntity.calledWith_[0], something);
    });
  });

  describe('isKey', () => {
    it('should pass value to entity', () => {
      const value = {zz: true};
      let called = false;
      const saved = fakeEntity.isDsKey;
      fakeEntity.isDsKey = (arg: {}) => {
        assert.strictEqual(arg, value);
        called = true;
        return false;
      };
      assert.strictEqual(datastore.isKey(value), false);
      assert.strictEqual(called, true);
      fakeEntity.isDsKey = saved;
    });

    it('should expose Key identifier', () => {
      const something = {};
      datastore.isKey(something);
      assert.strictEqual(fakeEntity.calledWith_[0], something);
    });
  });

  describe('KEY', () => {
    it('should expose the KEY symbol', () => {
      assert.strictEqual(Datastore.KEY, fakeEntity.KEY_SYMBOL);
    });

    it('should also be on the prototype', () => {
      assert.strictEqual(datastore.KEY, Datastore.KEY);
    });
  });

  describe('MORE_RESULTS_AFTER_CURSOR', () => {
    it('should expose a MORE_RESULTS_AFTER_CURSOR helper', () => {
      assert.strictEqual(
        Datastore.MORE_RESULTS_AFTER_CURSOR,
        'MORE_RESULTS_AFTER_CURSOR'
      );
    });

    it('should also be on the prototype', () => {
      assert.strictEqual(
        datastore.MORE_RESULTS_AFTER_CURSOR,
        Datastore.MORE_RESULTS_AFTER_CURSOR
      );
    });
  });

  describe('MORE_RESULTS_AFTER_LIMIT', () => {
    it('should expose a MORE_RESULTS_AFTER_LIMIT helper', () => {
      assert.strictEqual(
        Datastore.MORE_RESULTS_AFTER_LIMIT,
        'MORE_RESULTS_AFTER_LIMIT'
      );
    });

    it('should also be on the prototype', () => {
      assert.strictEqual(
        datastore.MORE_RESULTS_AFTER_LIMIT,
        Datastore.MORE_RESULTS_AFTER_LIMIT
      );
    });
  });

  describe('NO_MORE_RESULTS', () => {
    it('should expose a NO_MORE_RESULTS helper', () => {
      assert.strictEqual(Datastore.NO_MORE_RESULTS, 'NO_MORE_RESULTS');
    });

    it('should also be on the prototype', () => {
      assert.strictEqual(datastore.NO_MORE_RESULTS, Datastore.NO_MORE_RESULTS);
    });
  });

  describe('createQuery', () => {
    it('should return a Query object', () => {
      const namespace = 'namespace';
      const kind = ['Kind'];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const query: any = datastore.createQuery(namespace, kind);
      assert(query instanceof FakeQuery);

      assert.strictEqual(query.calledWith_[0], datastore);
      assert.strictEqual(query.calledWith_[1], namespace);
      assert.deepStrictEqual(query.calledWith_[2], kind);
    });

    it('should include the default namespace', () => {
      const kind = ['Kind'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const query: any = datastore.createQuery(kind);
      assert.strictEqual(query.calledWith_[0], datastore);
      assert.strictEqual(query.calledWith_[1], datastore.namespace);
      assert.deepStrictEqual(query.calledWith_[2], kind);
    });

    it('should include the default namespace in a kindless query', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const query: any = datastore.createQuery();
      assert.strictEqual(query.calledWith_[0], datastore);
      assert.strictEqual(query.calledWith_[1], datastore.namespace);
      assert.deepStrictEqual(query.calledWith_[2], []);
    });
  });

  describe('key', () => {
    it('should return a Key object', () => {
      const options = {} as entity.KeyOptions;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const key: any = datastore.key(options);
      assert.strictEqual(key.calledWith_[0], options);
    });

    it('should use a non-object argument as the path', () => {
      const options = 'path';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const key: any = datastore.key(options);
      assert.strictEqual(key.calledWith_[0].namespace, datastore.namespace);
      assert.deepStrictEqual(key.calledWith_[0].path, [options]);
    });
  });

  describe('transaction', () => {
    it('should return a Transaction object', () => {
      const transaction = datastore.transaction();
      // tslint:disable-next-line: no-any
      assert.strictEqual((transaction as any).calledWith_[0], datastore);
    });

    it('should pass options to the Transaction constructor', () => {
      const options = {};
      const transaction = datastore.transaction(options);
      // tslint:disable-next-line: no-any
      assert.strictEqual((transaction as any).calledWith_[1], options);
    });
  });

  describe('determineBaseUrl_', () => {
    function setHost(host: string) {
      process.env.DATASTORE_EMULATOR_HOST = host;
    }

    beforeEach(() => {
      delete process.env.DATASTORE_EMULATOR_HOST;
    });

    it('should default to defaultBaseUrl_', () => {
      const defaultBaseUrl_ = 'defaulturl';
      datastore.defaultBaseUrl_ = defaultBaseUrl_;

      datastore.determineBaseUrl_();
      assert.strictEqual(datastore.baseUrl_, defaultBaseUrl_);
    });

    it('should remove slashes from the baseUrl', () => {
      const expectedBaseUrl = 'localhost';

      setHost('localhost/');
      datastore.determineBaseUrl_();
      assert.strictEqual(datastore.baseUrl_, expectedBaseUrl);

      setHost('localhost//');
      datastore.determineBaseUrl_();
      assert.strictEqual(datastore.baseUrl_, expectedBaseUrl);
    });

    it('should remove the protocol if specified', () => {
      setHost('http://localhost');
      datastore.determineBaseUrl_();
      assert.strictEqual(datastore.baseUrl_, 'localhost');

      setHost('https://localhost');
      datastore.determineBaseUrl_();
      assert.strictEqual(datastore.baseUrl_, 'localhost');
    });

    it('should set Numberified port if one was found', () => {
      setHost('http://localhost:9090');
      datastore.determineBaseUrl_();
      assert.strictEqual(datastore.port_, 9090);
    });

    it('should not set customEndpoint_ when using default baseurl', () => {
      const datastore = new Datastore({projectId: PROJECT_ID});
      datastore.determineBaseUrl_();
      assert.strictEqual(datastore.customEndpoint_, undefined);
    });

    it('should set customEndpoint_ when using custom API endpoint', () => {
      datastore.determineBaseUrl_('apiEndpoint');
      assert.strictEqual(datastore.customEndpoint_, true);
    });

    it('should set baseUrl when using custom API endpoint', () => {
      datastore.determineBaseUrl_('apiEndpoint');
      assert.strictEqual(datastore.baseUrl_, 'apiEndpoint');
    });

    describe('with DATASTORE_EMULATOR_HOST environment variable', () => {
      const DATASTORE_EMULATOR_HOST = 'localhost:9090';
      const EXPECTED_BASE_URL = 'localhost';
      const EXPECTED_PORT = 9090;

      beforeEach(() => {
        setHost(DATASTORE_EMULATOR_HOST);
      });

      after(() => {
        delete process.env.DATASTORE_EMULATOR_HOST;
      });

      it('should use the DATASTORE_EMULATOR_HOST env var', () => {
        datastore.determineBaseUrl_();
        assert.strictEqual(datastore.baseUrl_, EXPECTED_BASE_URL);
        assert.strictEqual(datastore.port_, EXPECTED_PORT);
      });

      it('should set customEndpoint_', () => {
        datastore.determineBaseUrl_();
        assert.strictEqual(datastore.customEndpoint_, true);
      });
    });
  });

  describe('keyToLegacyUrlSafe', () => {
    it('should convert key to URL-safe base64 string', () => {
      const key = new entity.Key({
        path: ['Task', 'Test'],
      });
      const base64EndocdedUrlSafeKey = 'agpwcm9qZWN0LWlkcg4LEgRUYXNrIgRUZXN0DA';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (datastore.auth as any).getProjectId = (callback: Function) => {
        callback(null, 'project-id');
      };
      datastore.keyToLegacyUrlSafe(
        key,
        (err: Error | null | undefined, urlSafeKey: string) => {
          assert.ifError(err);
          assert.strictEqual(urlSafeKey, base64EndocdedUrlSafeKey);
        }
      );
    });

    it('should convert key to URL-safe base64 string with location prefix', () => {
      const key = new entity.Key({
        path: ['Task', 'Test'],
      });
      const locationPrefix = 's~';
      const base64EndocdedUrlSafeKey =
        'agxzfnByb2plY3QtaWRyDgsSBFRhc2siBFRlc3QM';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (datastore.auth as any).getProjectId = (callback: Function) => {
        callback(null, 'project-id');
      };
      datastore.keyToLegacyUrlSafe(
        key,
        locationPrefix,
        (err: Error | null | undefined, urlSafeKey: string) => {
          assert.ifError(err);
          assert.strictEqual(urlSafeKey, base64EndocdedUrlSafeKey);
        }
      );
    });

    it('should not return URL-safe key to user if auth.getProjectId errors', () => {
      const error = new Error('Error.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (datastore.auth as any).getProjectId = (callback: Function) => {
        callback(error);
      };
      datastore.keyToLegacyUrlSafe(
        {} as entity.Key,
        (err: Error | null | undefined, urlSafeKey: string) => {
          assert.strictEqual(err, error);
          assert.strictEqual(urlSafeKey, undefined);
        }
      );
    });
  });

  describe('keyFromLegacyUrlsafe', () => {
    it('should convert key to url safe base64 string', () => {
      const encodedKey = 'agpwcm9qZWN0LWlkcg4LEgRUYXNrIgRUZXN0DA';
      const key = datastore.keyFromLegacyUrlsafe(encodedKey);
      assert.strictEqual(key.kind, 'Task');
      assert.strictEqual(key.name, 'Test');
    });
  });

  describe('save, insert, update, upsert', () => {
    const key = new entity.Key({
      path: ['Task', 'Test'],
    });

    it('should call the parent save', () => {
      const stub = sinon.stub(DatastoreRequest.prototype, 'save');
      datastore.save({key, data: {k: 'v'}});
      assert.ok(stub.calledOnce);
    });

    it('should call the parent insert', () => {
      const stub = sinon.stub(DatastoreRequest.prototype, 'insert');
      datastore.insert({key, data: {k: 'v'}});
      assert.ok(stub.calledOnce);
    });

    it('should call the parent update', () => {
      const stub = sinon.stub(DatastoreRequest.prototype, 'update');
      datastore.update({key, data: {k: 'v'}});
      assert.ok(stub.calledOnce);
    });

    it('should call the parent upsert', () => {
      const stub = sinon.stub(DatastoreRequest.prototype, 'upsert');
      datastore.upsert({key, data: {k: 'v'}});
      assert.ok(stub.calledOnce);
    });
  });

  describe('merge', () => {
    const entityObject = {};
    const key = new entity.Key({
      path: ['Task', 'Test'],
    });
    const key2 = new entity.Key({
      path: ['Task2', 'Test2'],
    });
    const updatedEntityObject = {
      key,
      data: {
        status: 'merged',
      },
    };
    const updatedEntityObject2 = {
      key2,
      data: {
        status: 'merged2',
      },
    };
    const error = new Error('error');
    let transaction: ds.Transaction;

    beforeEach(() => {
      transaction = datastore.transaction();
      datastore.transaction = () => transaction;
      transaction.request_ = () => {};
      transaction.commit = async () => {
        return [{}] as CommitResponse;
      };
      // tslint:disable-next-line: no-any
      (transaction as any).run = (callback: Function) => {
        callback(null);
      };
      transaction.get = async () => {
        return [entityObject] as GetResponse;
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should accept single object ', done => {
      transaction.merge = (current: Entity, toMerge: Entity) => {
        assert.deepStrictEqual(current, entityObject);
        assert.deepStrictEqual(toMerge, updatedEntityObject);
      };

      datastore.merge(updatedEntityObject, done);
    });

    it('should accept array of objects', done => {
      const entities = [updatedEntityObject, updatedEntityObject2];
      let count = 0;
      transaction.merge = (current: Entity, toMerge: Entity) => {
        assert.deepStrictEqual(current, entityObject);
        assert.deepStrictEqual(toMerge, entities[count++]);
      };
      datastore.merge(entities, done);
    });

    it('should rollback if error on transaction run', done => {
      // tslint:disable-next-line: no-any
      (transaction.run as any) = (callback: Function) => {
        callback(error);
      };
      sinon.spy(transaction, 'rollback');

      datastore.merge({key, data: null}, (err?: Error | null) => {
        assert.strictEqual(err, error);
        assert.ok((transaction.rollback as sinon.SinonStub).calledOnce);
        done();
      });
    });

    it('should rollback if error on transaction get', done => {
      sinon.stub(transaction, 'get').rejects(error);
      sinon.spy(transaction, 'rollback');

      datastore.merge({key, data: null}, (err?: Error | null) => {
        assert.strictEqual(err, error);
        assert.ok((transaction.rollback as sinon.SinonStub).calledOnce);
        done();
      });
    });

    it('should rollback if error on transaction commit', done => {
      sinon.stub(transaction, 'commit').rejects(error);
      sinon.spy(transaction, 'rollback');
      transaction.merge = () => {};

      datastore.merge({key, data: null}, (err?: Error | null) => {
        assert.strictEqual(err, error);
        assert.ok((transaction.rollback as sinon.SinonStub).calledOnce);
        done();
      });
    });
  });
});
