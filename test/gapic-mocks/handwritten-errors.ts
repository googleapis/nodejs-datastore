import {describe} from 'mocha';
import {AggregateField} from '../../src';
import {getInitializedDatastoreClient} from './get-initialized-datastore-client';
import {RunQueryOptions} from '../../src/query';
import {errorOnGapicCall, getCallbackExpectingError} from './error-mocks';
const async = require('async');

describe('HandwrittenLayerErrors', () => {
  describe('Can only specify one of transaction, consistency, readTime', () => {
    const clientName = 'DatastoreClient';
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
            errorOnGapicCall(datastore, clientName, done); // Test fails if Gapic layer receives a call.
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
            errorOnGapicCall(datastore, clientName, done); // Test fails if Gapic layer receives a call.
            transaction.runAggregationQuery(
              aggregate,
              testParameters.options,
              getCallbackExpectingError(done, testParameters.expectedError)
            );
          });
          it('should error when get is used', done => {
            const transaction = datastore.transaction();
            const keys = datastore.key(['Company', 'Google']);
            errorOnGapicCall(datastore, clientName, done); // Test fails if Gapic layer receives a call.
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
});
