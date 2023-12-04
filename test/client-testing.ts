import {before, beforeEach, describe, it} from 'mocha';
import {Datastore, DatastoreClient, Fallback} from '../src';
import * as assert from 'assert';
import * as proxyquire from 'proxyquire';
import {Callback, CallOptions, ClientStub} from 'google-gax';
import * as protos from '../protos/protos';
import * as ds from '../src';
import {RequestConfig} from '../src/request';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

class FakeDatastoreClient extends DatastoreClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    assert.strictEqual(args[0].fallback, 'rest');
    super();
  }

  static get getString() {
    return 'some-string';
  }
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/datastore',
    ];
  }
  lookup(
    request?: protos.google.datastore.v1.ILookupRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.datastore.v1.ILookupResponse,
          protos.google.datastore.v1.ILookupRequest | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.datastore.v1.ILookupResponse,
      protos.google.datastore.v1.ILookupRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.datastore.v1.ILookupResponse,
      protos.google.datastore.v1.ILookupRequest | undefined,
      {} | undefined,
    ]
  > {
    if (callback) {
      callback(new Error('some error'));
    }
    console.log('getting');
    return new Promise(() => {});
  }
}

describe('ClientTesting', () => {
  let Datastore: typeof ds.Datastore;
  let Request: typeof ds.DatastoreRequest;
  let request: Any;

  before(() => {
    Request = proxyquire('../src/request', {
      './v1': {
        DatastoreClient: FakeDatastoreClient,
      },
    }).DatastoreRequest;
    Datastore = proxyquire('../src', {
      './request': {
        Request,
      },
      './v1': {
        DatastoreClient: FakeDatastoreClient,
      },
    }).Datastore;
  });

  beforeEach(() => {
    request = new Request();
  });

  describe('rest parameter support', () => {
    const clientName = 'DatastoreClient';
    // it.only('should not set the rest parameter in the data client when it is not provided', async () => {});
    it.only('should set the rest parameter in the data client when it is provided', done => {
      // TODO: Current state, client is not mocking out the v1
      const options = {
        fallback: 'rest' as Fallback,
      };
      const otherDatastore = new Datastore(options);
      // @ts-ignore
      // const datastoreClient = new FakeDatastoreClient() as ClientStub;
      // otherDatastore.clients_.set(clientName, datastoreClient);
      request.datastore = otherDatastore;
      request.prepareGaxRequest_(
        {client: clientName, method: 'lookup'},
        (err: any, res: any) => {
          done();
        }
      );
    });
  });
});
