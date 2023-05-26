import {describe, it} from 'mocha';
import {RequestCallback, RequestConfig} from '../src/request';
import * as assert from 'assert';
import {Datastore} from '../src';

describe('NoMocks', () => {
  describe('using save to evaluate excludeFromIndexes', () => {
    function getExpectedConfig(properties: any, namespace: string | undefined) {
      return {
        client: 'DatastoreClient',
        method: 'commit',
        gaxOpts: {},
        reqOpts: {
          mutations: [
            {
              upsert: {
                key: {
                  path: [{kind: 'Post', name: 'Post1'}],
                  partitionId: {
                    namespaceId: namespace,
                  },
                },
                properties,
              },
            },
          ],
        },
      };
    }
    describe('when the property is contained in excludeFromIndexes', () => {
      const datastore = new Datastore({
        namespace: `${Date.now()}`,
      });
      const namespace = datastore.namespace;
      const key = datastore.key(['Post', 'Post1']);
      it('should encode a request without excludeFromIndexes', async () => {
        const expectedConfig = getExpectedConfig(
          {k: {stringValue: 'v'}},
          namespace
        );
        datastore.request_ = (
          config: RequestConfig,
          callback: RequestCallback
        ) => {
          try {
            assert.deepStrictEqual(config, expectedConfig);
            callback(null, 'some-data');
          } catch (e: any) {
            callback(e);
          }
        };
        const results = await datastore.save({
          key,
          data: {k: 'v'},
        });
        assert.deepStrictEqual(results, ['some-data']);
      });
      it('should ignore non-existent property in excludeFromIndexes', async () => {
        const expectedConfig = getExpectedConfig(
          {k: {stringValue: 'v', excludeFromIndexes: true}},
          namespace
        );
        datastore.request_ = (
          config: RequestConfig,
          callback: RequestCallback
        ) => {
          try {
            assert.deepStrictEqual(config, expectedConfig);
            callback(null, 'some-data');
          } catch (e: any) {
            callback(e);
          }
        };
        const results = await datastore.save({
          key,
          data: {k: 'v'},
          excludeFromIndexes: ['k', 'k.*'],
        });
        assert.deepStrictEqual(results, ['some-data']);
      });
    });
    describe('when the property is not contained in excludeFromIndexes', () => {
      const datastore = new Datastore({
        namespace: `${Date.now()}`,
      });
      const namespace = datastore.namespace;
      const expectedConfig = getExpectedConfig({}, namespace);
      datastore.request_ = (
        config: RequestConfig,
        callback: RequestCallback
      ) => {
        try {
          assert.deepStrictEqual(config, expectedConfig);
          callback(null, 'some-data');
        } catch (e: any) {
          callback(e);
        }
      };
      const key = datastore.key(['Post', 'Post1']);
      it('should encode a request without excludeFromIndexes', async () => {
        const results = await datastore.save({
          key,
          data: {},
        });
        assert.deepStrictEqual(results, ['some-data']);
      });
      it('should ignore non-existent property in excludeFromIndexes', async () => {
        const results = await datastore.save({
          key,
          data: {},
          excludeFromIndexes: [
            'non_exist_property', // this just ignored
            'non_exist_property.*', // should also be ignored
          ],
        });
        assert.deepStrictEqual(results, ['some-data']);
      });
    });
  });
});
