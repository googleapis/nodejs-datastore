import {describe, it} from 'mocha';
import {RequestConfig} from '../src/request';
import * as assert from 'assert';
import {Datastore} from '../src';

describe('NoMocks', () => {
  describe('using save to evaluate excludeFromIndexes', () => {
    const datastore = new Datastore({
      namespace: `${Date.now()}`,
    });
    const namespace = datastore.namespace;
    const expectedConfig = {
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
              properties: {},
            },
          },
        ],
      },
    };
    function evaluateConfig(config: RequestConfig) {
      try {
        assert.deepStrictEqual(config, expectedConfig);
      } catch (e) {
        console.log(e);
        assert.fail('assertion failed');
      }
    }

    it.only('should encode a request without excludeFromIndexes', done => {
      datastore.request_ = (config: RequestConfig) => {
        evaluateConfig(config);
        done();
      };
      const key = datastore.key(['Post', 'Post1']);
      datastore.save({
        key,
        data: {},
      });
    });
    it('should ignore non-existent property in excludeFromIndexes', done => {
      datastore.request_ = (config: RequestConfig) => {
        evaluateConfig(config);
        done();
      };
      const key = datastore.key(['Post', 'Post1']);
      datastore.save({
        key,
        data: {},
        excludeFromIndexes: [
          'non_exist_property', // this just ignored
          'non_exist_property.*', // should also be ignored
        ],
      });
    });
  });
});
