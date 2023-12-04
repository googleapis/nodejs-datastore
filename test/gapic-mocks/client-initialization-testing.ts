import {before, beforeEach, describe, it} from 'mocha';
import {
  Datastore,
  DatastoreClient,
  Fallback,
  DatastoreRequest,
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
      callback(new Error('some error'));
    }
    return new Promise(() => {});
  }
}

describe('ClientTesting', () => {
  describe('Request', () => {
    let Request: typeof ds.DatastoreRequest;
    let request: Any;

    function mockRequest() {
      Request = proxyquire('../../src/request', {
        './v1': {
          DatastoreClient: FakeDatastoreClient,
        },
      }).DatastoreRequest;
      request = new Request();
    }

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

    describe.only('rest parameter support', () => {
      beforeEach(() => {
        mockRequest();
      });
      // TODO: Use parameterized testing instead.
      describe('when the datastore client is expecting a rest parameter', () => {
        beforeEach(() => {
          const options = {
            fallback: 'rest' as Fallback,
          };
          request.datastore = new Datastore(options);
        });
        it('should set the rest parameter in the data client when calling prepareGaxRequest_', done => {
          // This request does lazy initialization of the gapic layer Datastore client.
          request.prepareGaxRequest_(
            {client: clientName, method: 'lookup'},
            (err: any, res: any) => {
              compareRequest(request, 'rest', done);
            }
          );
        });
        it('should set the rest parameter in the data client when calling request_', done => {
          // This request does lazy initialization of the gapic layer Datastore client.
          request.request_(
            {client: clientName, method: 'lookup'},
            (err: any, res: any) => {
              compareRequest(request, 'rest', done);
            }
          );
        });
      });
      describe('when the datastore client is not expecting a rest parameter', () => {
        beforeEach(() => {
          const options = {};
          request.datastore = new Datastore(options);
        });
        it('should not set the rest parameter in the data client when calling prepareGaxRequest_', done => {
          // This request does lazy initialization of the gapic layer Datastore client.
          request.prepareGaxRequest_(
            {client: clientName, method: 'lookup'},
            (err: any, res: any) => {
              compareRequest(request, undefined, done);
            }
          );
        });
        it('should not set the rest parameter in the data client when calling request_', done => {
          // This request does lazy initialization of the gapic layer Datastore client.
          request.request_(
            {client: clientName, method: 'lookup'},
            (err: any, res: any) => {
              compareRequest(request, undefined, done);
            }
          );
        });
      });
    });
  });
});
