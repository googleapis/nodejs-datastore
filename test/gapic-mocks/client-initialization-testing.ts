import {beforeEach, describe, it} from 'mocha';
import {
  Datastore,
  DatastoreClient,
  Fallback,
  DatastoreRequest,
  DatastoreOptions,
} from '../../src';
import * as assert from 'assert';
import * as proxyquire from 'proxyquire';
import {Callback, CallOptions} from 'google-gax';
import * as protos from '../../protos/protos';
import * as ds from '../../src';
import * as mocha from 'mocha';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

const clientName = 'DatastoreClient';
const async = require('async');

/**
 * This class mocks out the lookup function so that for tests in this file
 * the lookup function just sends data back instead of making a call to the
 * server. The class also saves the rest parameter in the constructor so that
 * it can be read later for correctness.
 *
 */
class FakeDatastoreClient extends DatastoreClient {
  restParameter: string | undefined;
  constructor(...args: any[]) {
    super();
    this.restParameter = args[0].fallback;
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
      callback(null, {});
    }
    return new Promise((resolve, reject) => {
      resolve([{}, {}, {}]);
    });
  }
}

type FallbackTestParameters = {
  options: DatastoreOptions;
  expectedFallback: string | undefined;
  description: string;
};

describe('ClientTesting', () => {
  describe('Request', () => {
    let Request: typeof ds.DatastoreRequest;
    let request: Any;

    /**
     * This function is called by a test to ensure that the rest parameter
     * gets passed to the Gapic data client's constructor
     *
     * @param {DatastoreRequest} [request] The request object whose data client
     * the test makes comparisons with.
     * @param {string | undefined} [expectedFallback] The value that the test
     * expects the rest parameter of the data client to be equal to.
     * @param {mocha.Done} [done] The done function used for indicating
     * that the test is complete or that there is an error in the mocha test
     * environment.
     *
     */
    function compareRequest(
      request: DatastoreRequest,
      expectedFallback: string | undefined,
      done: mocha.Done
    ) {
      try {
        const client = request.datastore.clients_.get(clientName);
        assert(client);
        assert.strictEqual(client.restParameter, expectedFallback);
        done();
      } catch (err: unknown) {
        done(err);
      }
    }
    async.each(
      [
        {
          options: {fallback: 'rest' as Fallback},
          expectedFallback: 'rest',
          description: 'when specifying rest as a fallback parameter',
        },
        {
          options: {},
          expectedFallback: undefined,
          description: 'when specifying no fallback parameter',
        },
      ],
      (testParameters: FallbackTestParameters) => {
        describe(testParameters.description, () => {
          beforeEach(() => {
            Request = proxyquire('../../src/request', {
              './v1': {
                DatastoreClient: FakeDatastoreClient,
              },
            }).DatastoreRequest;
            request = new Request();
            request.datastore = new Datastore(testParameters.options);
          });
          it('should set the rest parameter in the data client when calling prepareGaxRequest_', done => {
            // This request does lazy initialization of the gapic layer Datastore client.
            request.prepareGaxRequest_(
              {client: clientName, method: 'lookup'},
              () => {
                compareRequest(request, testParameters.expectedFallback, done);
              }
            );
          });
          it('should set the rest parameter in the data client when calling request_', done => {
            // This request does lazy initialization of the gapic layer Datastore client.
            request.request_({client: clientName, method: 'lookup'}, () => {
              compareRequest(request, testParameters.expectedFallback, done);
            });
          });
        });
      }
    );
  });
});
