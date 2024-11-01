import {describe} from 'mocha';
import {Entities, EntityObject} from '../../src/entity';
import {extendExcludeFromIndexes} from '../../src/utils/entity/extendExcludeFromIndexes';
import {buildEntityProto} from '../../src/utils/entity/buildEntityProto';
import * as is from 'is';
import * as assert from 'assert';
import {ServiceError} from 'google-gax';
const async = require('async');

describe.only('excludeIndexesAndBuildProto', () => {
  const longString = Buffer.alloc(1501, '.').toString();

  /**
   * This recursive function ensures that in the entityProtoSubset there is only
   * an excludeFromIndexes: true value next to large values in the
   * entityProtoSubset and throws an assertion error if there is not.
   *
   * @param entityProtoSubset
   * @param path
   */
  function checkEntityProto(entityProtoSubset: any, path: string) {
    if (Array.isArray(entityProtoSubset)) {
      entityProtoSubset.forEach((subset, index) => {
        checkEntityProto(subset, `${path}.[${index}]`);
      });
    } else {
      if (is.object(entityProtoSubset)) {
        if (entityProtoSubset.stringValue === longString) {
          if (entityProtoSubset.excludeFromIndexes !== true) {
            assert.fail(
              `The entity proto at ${path} should excludeFromIndexes`
            );
          }
        } else {
          if (entityProtoSubset.excludeFromIndexes === true) {
            assert.fail(
              `The entity proto at ${path} should not excludeFromIndexes`
            );
          }
        }
        Object.keys(entityProtoSubset).map(property => {
          checkEntityProto(entityProtoSubset[property], `${path}.${property}`);
        });
      }
    }
  }

  describe('checkEntityProto', () => {
    it('should not throw an assertion error on a simple check', () => {
      checkEntityProto(
        {
          properties: {
            name: {
              stringValue: 'entityName',
            },
            value: {
              stringValue: 'entityValue',
            },
          },
        },
        ''
      );
    });
    it('should not throw an assertion error for long strings in the top level', () => {
      checkEntityProto(
        {
          properties: {
            name: {
              stringValue: longString,
              excludeFromIndexes: true,
            },
            value: {
              stringValue: longString,
              excludeFromIndexes: true,
            },
          },
        },
        ''
      );
    });
    it('should throw an assertion error for a missing excludeFromIndexes: true', () => {
      try {
        checkEntityProto(
          {
            properties: {
              name: {
                stringValue: longString,
              },
              value: {
                stringValue: longString,
                excludeFromIndexes: true,
              },
            },
          },
          ''
        );
        assert.fail('checkEntityProto should have failed');
      } catch (e) {
        assert.strictEqual(
          (e as ServiceError).message,
          'The entity proto at .properties.name should excludeFromIndexes'
        );
      }
    });
    it('should throw an assertion error for an extra excludeFromIndexes: true', () => {
      try {
        checkEntityProto(
          {
            properties: {
              name: {
                stringValue: 'not a long string',
                excludeFromIndexes: true,
              },
              value: {
                stringValue: longString,
                excludeFromIndexes: true,
              },
            },
          },
          ''
        );
        assert.fail('checkEntityProto should have failed');
      } catch (e) {
        assert.strictEqual(
          (e as ServiceError).message,
          'The entity proto at .properties.name should not excludeFromIndexes'
        );
      }
    });
    it('should throw an assertion error for an extra excludeFromIndexes: true', () => {
      try {
        checkEntityProto(
          {
            properties: {
              name: {
                arrayValue: {
                  values: [
                    {
                      stringValue: longString,
                      excludeFromIndexes: true,
                    },
                    {
                      entityValue: {
                        properties: {
                          metadata: {
                            excludeFromIndexes: true,
                          },
                        },
                      },
                    },
                  ],
                },
              },
              value: {
                stringValue: longString,
                excludeFromIndexes: true,
              },
            },
          },
          ''
        );
        assert.fail('checkEntityProto should have failed');
      } catch (e) {
        assert.strictEqual(
          (e as ServiceError).message,
          'The entity proto at .properties.name.arrayValue.values.[1].entityValue.properties.metadata should not excludeFromIndexes'
        );
      }
    });
  });

  async.each(
    [
      {
        name: 'Should encode a simple object properly',
        skipped: false,
        entities: {
          name: 'firstElementName',
          value: longString,
        },
      },
    ],
    (test: {name: string; entities: Entities; skipped: boolean}) => {
      it(test.name, function () {
        // This test ensures that excludeFromIndexes: true only appears in the
        // entity proto in every place that corresponds to a large value. It
        // does this using the checkEntityProto function which does a
        // recursive check on the proto.
        if (test.skipped) {
          this.skip();
        }
        const entityObject = {
          data: test.entities,
          excludeLargeProperties: true,
          excludeFromIndexes: [],
        };
        extendExcludeFromIndexes(entityObject);
        const entityProto = buildEntityProto(entityObject);
        checkEntityProto(entityProto, '');
      });
    }
  );
});
