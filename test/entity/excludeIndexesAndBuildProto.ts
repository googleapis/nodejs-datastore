import {describe} from 'mocha';
import {Entities, EntityObject} from '../../src/entity';
import {extendExcludeFromIndexes} from '../../src/utils/entity/extendExcludeFromIndexes';
import {buildEntityProto} from '../../src/utils/entity/buildEntityProto';
import * as is from 'is';
import * as assert from 'assert';
import {ServiceError} from 'google-gax';
import {entityObject} from '../fixtures/entityObjectAndProto';
import {complexCaseEntities} from '../fixtures/complexCaseLargeStrings';
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

  /**
   * This describe block makes sure that the recursive checkEntityProto
   * function works as intended. It ensures that checkEntityProto throws an
   * error for `excludeFromIndexes: true` entries that are missing or out of
   * place and it also ensures checkEntityProto doesn't throw an error when
   * proper entity protos are provided.
   *
   */
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

  /**
   * These are the basic test cases each with an entity object that will be
   * tested. The entity object in each test case will be encoded into an entity
   * proto and then the entity proto will be checked to ensure
   * excludeFromIndexes: true is in the proper places.
   */
  const testCases: {name: string; entities: Entities; skipped: boolean}[] = [
    {
      name: 'Should encode a simple object properly',
      skipped: false,
      entities: {
        name: 'firstElementName',
        value: longString,
      },
    },
    {
      name: 'Should encode a complex set of entities without large values',
      skipped: false,
      entities: entityObject.data,
    },
    {
      name: 'Should encode a complex set of entities with large values',
      skipped: false,
      entities: complexCaseEntities,
    },
    {
      name: 'Should encode a long string in a nested field',
      skipped: false,
      entities: [
        {
          name: 'field_b',
          value: {
            nestedField: Buffer.alloc(1501, '.').toString(),
          },
        },
      ],
    },
    {
      name: 'Should exclude large properties in a nested array',
      skipped: false,
      entities: {
        metadata: [
          {
            name: longString,
            value: longString,
          },
        ],
      },
    },
  ];

  interface GeneratedTestCase {
    entities: any;
    name: string;
  }

  /**
   * This function generates a wide variety of Entity Object structures so that
   * in our tests we can ensure each one of them gets encoded into an entity
   * proto with `excludeFromIndexes: true` in exactly all the right places.
   */
  // This ensures excludeFromIndexes: true is encoded correctly :
  function getGeneratedTestComponents(
    baseElement: {},
    baseTestName: string
  ): GeneratedTestCase[] {
    const maxDepth = 5;
    const generatedTestCasesByDepth: GeneratedTestCase[][] = [
      [{entities: baseElement, name: baseTestName}],
    ];
    for (let depth = 1; depth < maxDepth; depth++) {
      const newElements: GeneratedTestCase[] = [];
      generatedTestCasesByDepth[depth - 1].forEach(element => {
        newElements.push({
          entities: [element, element],
          name: element.name + '.[]',
        });
        newElements.push({
          entities: {
            name: element,
            value: element,
            otherProperty: element,
          },
          name: element.name + '.{}',
        });
      });
      generatedTestCasesByDepth.push(newElements);
    }
    return generatedTestCasesByDepth[maxDepth - 1];
  }

  const generatedTestComponents = getGeneratedTestComponents(
    {
      name: longString,
      value: longString,
      otherProperty: longString,
    },
    ''
  );
  generatedTestComponents.forEach(component => {
    testCases.push({
      skipped: false,
      name: `Should encode a generated object with path ${component.name}`,
      entities: {
        name: component.entities,
        value: component.entities,
        otherProperty: component.entities,
      },
    });
    testCases.push({
      skipped: false,
      name: `Should encode a generated array with path ${component.name}`,
      entities: [
        {
          name: component.entities,
          value: component.entities,
        },
        {
          name: component.entities,
          value: component.entities,
        },
      ],
    });
  });

  async.each(
    testCases,
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
