import {before, beforeEach, describe, it} from 'mocha';
import {DatastoreClient, Fallback} from '../src';
import * as assert from 'assert';
import * as proxyquire from 'proxyquire';
import {Callback, CallOptions} from 'google-gax';
import * as protos from '../protos/protos';
import * as ds from '../src';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

class FakeDatastoreClient extends DatastoreClient {
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
    return new Promise(() => {});
  }
}

class FakeDatastoreClientExpectingRest extends FakeDatastoreClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    assert.strictEqual(args[0].fallback, 'rest');
    super();
  }
}

class FakeDatastoreClientExpectingGrpc extends FakeDatastoreClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    assert.strictEqual(args[0].fallback, 'rest');
    super();
  }
}

describe('ClientTesting', () => {
  let Datastore: typeof ds.Datastore;
  let Request: typeof ds.DatastoreRequest;
  let request: Any;

  describe('rest parameter support', () => {
    const clientName = 'DatastoreClient';
    describe('when the datastore client is expecting a rest parameter', () => {
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
        request = new Request();
      });
      it.only('should set the rest parameter in the data client when calling prepareGaxRequest_', done => {
        const options = {
          fallback: 'rest' as Fallback,
        };
        request.datastore = new Datastore(options);
        request.prepareGaxRequest_(
          {client: clientName, method: 'lookup'},
          (err: any, res: any) => {
            done();
          }
        );
      });
    });
  });
});
