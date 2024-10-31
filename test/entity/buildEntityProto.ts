import {describe} from 'mocha';
import {Entities, EntityObject, EntityProto} from '../../src/entity';
import * as assert from 'assert';
import {buildEntityProto} from '../../src/utils/entity/buildEntityProto';
import {
  entityObject,
  expectedEntityProto,
} from '../fixtures/entityObjectAndProto';

const async = require('async');

describe('buildEntityProto', () => {
  async.each(
    [
      {
        name: 'should format an entity',
        entityObject: {
          data: {
            name: 'Stephen',
          },
        },
        expectedProto: {
          key: null,
          properties: {
            name: {
              stringValue: 'Stephen',
            },
          },
        },
        skipped: false,
      },
      {
        name: 'should format an entity array',
        entityObject: {
          data: [
            {
              name: 'Stephen',
              value: 'Stephen value',
            },
          ],
        },
        expectedProto: {
          properties: {
            Stephen: {
              stringValue: 'Stephen value',
            },
          },
        },
        skipped: false,
      },
      {
        name: 'should respect excludeFromIndexes',
        skipped: false,
        entityObject: entityObject,
        expectedProto: expectedEntityProto,
      },
    ],
    (test: {
      name: string;
      skipped: boolean;
      entityObject: EntityObject;
      expectedProto: EntityProto;
    }) => {
      it(test.name, function () {
        if (test.skipped) {
          this.skip();
        }
        assert.deepStrictEqual(
          buildEntityProto(test.entityObject),
          test.expectedProto
        );
      });
    }
  );
});
