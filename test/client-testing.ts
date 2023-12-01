import {before, describe, it} from 'mocha';
import {Datastore, DatastoreClient, Fallback} from '../src';
import * as assert from 'assert';
import * as proxyquire from 'proxyquire';
import {Callback, CallOptions} from 'google-gax';
import * as protos from '../protos/protos';
import * as ds from '../src';

let v1FakeClientOverride: Function | null;
const fakeV1 = {
  DatastoreClient: class {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      console.log('constructing');
      return (v1FakeClientOverride || (() => {}))(...args);
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
    ) {
      if (callback) {
        callback(new Error('some error'));
      }
      console.log('getting');
    }
  },
};

describe('ClientTesting', () => {
  let Datastore: typeof ds.Datastore;

  before(() => {
    Datastore = proxyquire('../src', {
      './v1': fakeV1,
    }).Datastore;
  });

  describe('rest parameter support', () => {
    const clientName = 'DatastoreClient';
    // it.only('should not set the rest parameter in the data client when it is not provided', async () => {});
    it.only('should set the rest parameter in the data client when it is provided', async () => {
      // TODO: Current state, client is not mocking out the v1
      console.log('running tests');
      const options = {
        fallback: 'rest' as Fallback,
      };
      const otherDatastore = new Datastore(options);
      const keys = otherDatastore.key(['Company', 'Google']);
      await otherDatastore.get(keys);
      const dataClient = otherDatastore.clients_.get(clientName);
      assert(dataClient);
      const projectId = await otherDatastore.getProjectId();
    });
  });
});
