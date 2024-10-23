import * as assert from 'assert';
import {describe} from 'mocha';
import {Entities, entity} from '../../src/entity';
import findLargeProperties_ = entity.findLargeProperties_;

const async = require('async');

describe('findLargeProperties_', () => {
  // TODO: Make a test case that has name/value downstream.
  const longString = Buffer.alloc(1501, '.').toString();
  // complexCaseEntities are passed into save for the complex case.
  const complexCaseEntities = {
    longString,
    notMetadata: true,
    longStringArray: [longString],
    metadata: {
      longString,
      otherProperty: 'value',
      obj: {
        longStringArray: [
          {
            longString,
            nestedLongStringArray: [
              {
                longString,
                nestedProperty: true,
              },
              {
                longString,
              },
            ],
          },
        ],
      },
      longStringArray: [
        {
          longString,
          nestedLongStringArray: [
            {
              longString,
              nestedProperty: true,
            },
            {
              longString,
            },
          ],
        },
      ],
    },
  };
  async.each(
    [
      {
        name: 'For a simple case involving a name/value pair',
        entities: {
          name: 'firstElementName',
          value: longString,
        },
        skipped: false,
        expectedOutput: ['value'],
      },
      {
        name: 'For a simple case involving a name/value pair in an array',
        entities: [
          {
            name: 'firstElementName',
            value: longString,
          },
        ],
        skipped: false,
        expectedOutput: ['[].value'],
      },
      {
        name: 'For a complex case involving lots of entities',
        entities: complexCaseEntities,
        skipped: false,
        expectedOutput: [
          'longString',
          'longStringArray[]',
          'metadata.longString',
          'metadata.obj.longStringArray[].longString',
          'metadata.obj.longStringArray[].nestedLongStringArray[].longString',
          'metadata.longStringArray[].longString',
          'metadata.longStringArray[].nestedLongStringArray[].longString',
        ],
      },
      {
        name: 'For a complex case involving a name/value pair',
        entities: {
          name: 'firstElementName',
          value: complexCaseEntities,
        },
        skipped: false,
        expectedOutput: [
          'value.longString',
          'value.longStringArray[]',
          'value.metadata.longString',
          'value.metadata.obj.longStringArray[].longString',
          'value.metadata.obj.longStringArray[].nestedLongStringArray[].longString',
          'value.metadata.longStringArray[].longString',
          'value.metadata.longStringArray[].nestedLongStringArray[].longString',
        ],
      },
      {
        name: 'For a complex case involving and array and name/value',
        entities: [
          {
            name: 'firstElementName',
            value: complexCaseEntities,
          },
        ],
        skipped: false,
        expectedOutput: [
          '[].value.longString',
          '[].value.longStringArray[]',
          '[].value.metadata.longString',
          '[].value.metadata.obj.longStringArray[].longString',
          '[].value.metadata.obj.longStringArray[].nestedLongStringArray[].longString',
          '[].value.metadata.longStringArray[].longString',
          '[].value.metadata.longStringArray[].nestedLongStringArray[].longString',
        ],
      },
      {
        name: 'For some nested properties that happen to be called value and name',
        entities: {
          metadata: [
            {
              name: longString,
              value: 'some-value',
            },
          ],
        },
        skipped: false,
        expectedOutput: ['metadata[].name'],
      },
    ],
    (test: {
      name: string;
      entities: Entities;
      expectedOutput: string[];
      skipped: boolean;
    }) => {
      it(test.name, function () {
        if (test.skipped) {
          this.skip();
        }
        const output = findLargeProperties_(test.entities, '', []);
        assert.deepStrictEqual(output, test.expectedOutput);
      });
    }
  );
});
