import {describe} from 'mocha';
import {AggregateField, Datastore, DatastoreOptions, Fallback} from '../../src';
import * as mocha from 'mocha';
import * as assert from 'assert';
import {getInitializedDatastoreClient} from './get-initialized-datastore-client';
import {RunQueryOptions} from '../../src/query';
const async = require('async');

describe('HandwrittenLayerErrors', () => {
  const clientName = 'DatastoreClient';

  /**
   * Returns a callback function that expects an error with a particular
   * message. This is used for testing all client library functions that accept
   * a callback in order to ensure the callback receives a particular error.
   *
   * @param {mocha.Done} done The mocha done function which is called when the
   * test finishes.
   * @param {string} message The expected error message in the test.
   *
   */
  function getCallbackExpectingError(done: mocha.Done, message: string) {
    return (error?: Error | null) => {
      try {
        if (error) {
          assert.strictEqual(error.message, message);
          done();
          return;
        }
        done(new Error('The callback should have received an error'));
      } catch (err: unknown) {
        done(err);
      }
    };
  }

  /**
   * This function ends the test with an error if a call reaches the gapic
   * layer. Using this function in a test makes the test fail if any outgoing
   * grpc calls are made in that test. This allows the test to ensure that no
   * grpc calls happen, which is typically desired behaviour when an error is
   * sent back to the user from the handwritten layer.
   *
   * @param {mocha.Done} done The mocha done function which is called when the
   * test finishes.
   */
  function errorOnGapicCall(datastore: Datastore, done: mocha.Done) {
    const dataClient = datastore.clients_.get(clientName);
    if (dataClient) {
      dataClient.runQuery = () => {
        done(new Error('The gapic layer should not have received a call'));
      };
      dataClient.runAggregationQuery = () => {
        done(new Error('The gapic layer should not have received a call'));
      };
      dataClient.lookup = () => {
        done(new Error('The gapic layer should not have received a call'));
      };
    }
  }

  describe('Can only specify one of transaction, consistency, readTime', () => {
    const datastore = getInitializedDatastoreClient();
    async.each(
      [
        {
          options: {consistency: 'eventual', readTime: 77000},
          expectedError:
            'Read time and read consistency cannot both be specified.',
          description:
            'should error when read time and eventual consistency are specified',
        },
        {
          options: {consistency: 'eventual'},
          expectedError:
            'Read consistency cannot be specified in a transaction.',
          description:
            'should error when new transaction and eventual consistency are specified',
        },
        {
          options: {readTime: 77000},
          expectedError: 'Read time cannot be specified in a transaction.',
          description:
            'should error when new transaction and read time are specified',
        },
      ],
      (testParameters: {
        options: RunQueryOptions;
        expectedError: string;
        description: string;
      }) => {
        describe(testParameters.description, () => {
          it('should error when runQuery is used', done => {
            const transaction = datastore.transaction();
            const query = datastore.createQuery('Task');
            errorOnGapicCall(datastore, done); // Test fails if Gapic layer receives a call.
            transaction.runQuery(
              query,
              testParameters.options,
              getCallbackExpectingError(done, testParameters.expectedError)
            );
          });
          it('should error when runAggregationQuery is used', done => {
            const transaction = datastore.transaction();
            const query = datastore.createQuery('Task');
            const aggregate = datastore
              .createAggregationQuery(query)
              .addAggregation(AggregateField.sum('appearances'));
            errorOnGapicCall(datastore, done); // Test fails if Gapic layer receives a call.
            transaction.runAggregationQuery(
              aggregate,
              testParameters.options,
              getCallbackExpectingError(done, testParameters.expectedError)
            );
          });
          it('should error when get is used', done => {
            const transaction = datastore.transaction();
            const keys = datastore.key(['Company', 'Google']);
            errorOnGapicCall(datastore, done); // Test fails if Gapic layer receives a call.
            transaction.get(
              keys,
              testParameters.options,
              getCallbackExpectingError(done, testParameters.expectedError)
            );
          });
        });
      }
    );
  });
  describe('Must report that the transaction has expired', () => {

  });
});
