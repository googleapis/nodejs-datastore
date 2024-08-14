// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as assert from 'assert';
import {describe} from 'mocha';
import * as protos from '../../protos/protos';
import {getInitializedDatastoreClient} from './get-initialized-datastore-client';
import type {CallOptions} from 'google-gax';
import {Entities} from '../../src/entity';
import {google} from '../../protos/protos';
import IValue = google.datastore.v1.IValue;
import {DatastoreOptions} from '../../src';
const async = require('async');

describe.only('Commit', () => {
  const longString = Buffer.alloc(1501, '.').toString();
  const clientName = 'DatastoreClient';
  const datastore = getInitializedDatastoreClient();

  // This function is used for doing assertion checks.
  // The idea is to check that the right request gets passed to the commit function in the Gapic layer.
  function setCommitComparison(
    compareFn: (request: protos.google.datastore.v1.ICommitRequest) => void
  ) {
    const dataClient = datastore.clients_.get(clientName);
    if (dataClient) {
      dataClient.commit = (
        request: protos.google.datastore.v1.ICommitRequest,
        options: CallOptions,
        callback: (
          err?: unknown,
          res?: protos.google.datastore.v1.ICommitResponse
        ) => void
      ) => {
        try {
          compareFn(request);
        } catch (e) {
          callback(e);
        }
        callback(null, {
          mutationResults: [],
        });
      };
    }
  }

  /**
   * Replaces long strings in an object with <longString> so that they can
   * be used in an assert comparison as assert has a character limit on the
   * data that it can accept
   *
   * @param {google.datastore.v1.IMutation[] | null} input The input object
   * containing the long strings that should be replaced.
   * @returns {google.datastore.v1.IMutation[]} The input object with the long
   * strings replaced.
   */
  function replaceLongStrings(input?: google.datastore.v1.IMutation[] | null) {
    const stringifiedInput = JSON.stringify(input);
    const replacedInput = stringifiedInput
      .split(longString)
      .join('<longString>');
    return JSON.parse(replacedInput) as google.datastore.v1.IMutation[];
  }

  /**
   * Sets up the gapic client so that when it receives mutations it ensures that
   * the mutations match the expectedMutations and throw an assertion error if
   * they don't.
   *
   * @param {google.datastore.v1.IMutation[]} expectedMutations The mutations
   * that are expected to reach the Gapic layer.
   */
  function expectCommitRequest(
    expectedMutations: google.datastore.v1.IMutation[]
  ) {
    setCommitComparison(
      (request: protos.google.datastore.v1.ICommitRequest) => {
        const actual = replaceLongStrings(request.mutations);
        const expected = replaceLongStrings(expectedMutations);
        assert.deepStrictEqual(actual, expected);
      }
    );
  }
  /**
   * Calls save and ensures that the right mutations are passed to the Gapic layer.
   * Fails an assertion check if the mutations object is incorrect.
   *
   * @param {Entities} entities The entities to save.
   * @param {string[]} excludeFromIndexes The list of properties to exclude from indexing
   * @param {boolean} excludeLargeProperties A flag passed to save that when
   * set to true should add excludeFromIndexes to all large values
   * @param {google.datastore.v1.IMutation[]} expectedMutations A list of
   * mutations to pass into save.
   */
  async function checkSaveMutations(
    entities: Entities,
    excludeFromIndexes: string[],
    excludeLargeProperties: boolean,
    expectedMutations: google.datastore.v1.IMutation[]
  ) {
    expectCommitRequest(expectedMutations);
    const postKey = datastore.key(['Post', 'post2']);
    await datastore.save({
      key: postKey,
      data: entities,
      excludeFromIndexes,
      excludeLargeProperties,
    });
  }

  const key = {
    path: [
      {
        kind: 'Post',
        name: 'post2',
      },
    ],
    partitionId: {
      namespaceId: 'namespace',
    },
  };

  async.each(
    [
      {
        namespace: `${Date.now()}`,
      },
      {
        namespace: `second-db-${Date.now()}`,
      },
    ],
    (clientOptions: DatastoreOptions) => {

    },
  );

  describe('should pass the right request to gapic with an object containing many long strings', () => {
    const complexCaseProperties: {[k: string]: IValue} = {
      longString: {
        stringValue: longString,
        excludeFromIndexes: true,
      },
      notMetadata: {
        booleanValue: true,
      },
      longStringArray: {
        arrayValue: {
          values: [
            {
              stringValue: longString,
              excludeFromIndexes: true,
            },
          ],
        },
      },
      metadata: {
        entityValue: {
          properties: {
            longString: {
              stringValue: longString,
              excludeFromIndexes: true,
            },
            otherProperty: {
              stringValue: 'value',
            },
            obj: {
              entityValue: {
                properties: {
                  longStringArray: {
                    arrayValue: {
                      values: [
                        {
                          entityValue: {
                            properties: {
                              longString: {
                                stringValue: longString,
                                excludeFromIndexes: true,
                              },
                              nestedLongStringArray: {
                                arrayValue: {
                                  values: [
                                    {
                                      entityValue: {
                                        properties: {
                                          longString: {
                                            stringValue: longString,
                                            excludeFromIndexes: true,
                                          },
                                          nestedProperty: {
                                            booleanValue: true,
                                          },
                                        },
                                      },
                                    },
                                    {
                                      entityValue: {
                                        properties: {
                                          longString: {
                                            stringValue: longString,
                                            excludeFromIndexes: true,
                                          },
                                        },
                                      },
                                    },
                                  ],
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            longStringArray: {
              arrayValue: {
                values: [
                  {
                    entityValue: {
                      properties: {
                        longString: {
                          stringValue: longString,
                          excludeFromIndexes: true,
                        },
                        nestedLongStringArray: {
                          arrayValue: {
                            values: [
                              {
                                entityValue: {
                                  properties: {
                                    longString: {
                                      stringValue: longString,
                                      excludeFromIndexes: true,
                                    },
                                    nestedProperty: {
                                      booleanValue: true,
                                    },
                                  },
                                },
                              },
                              {
                                entityValue: {
                                  properties: {
                                    longString: {
                                      stringValue: longString,
                                      excludeFromIndexes: true,
                                    },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    };
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
    it('should pass the right request with a bunch of large properties excluded', async () => {
      // TODO: Add note about excludeFromIndexes that should match
      const excludeFromIndexes = [
        'longString',
        'longStringArray[]',
        'metadata.longString',
        'metadata.obj.longStringArray[].longString',
        'metadata.obj.longStringArray[].nestedLongStringArray[].longString',
        'metadata.longStringArray[].longString',
        'metadata.longStringArray[].nestedLongStringArray[].longString',
      ];
      const expectedMutations: google.datastore.v1.IMutation[] = [
        {
          upsert: {
            properties: complexCaseProperties,
            key,
          },
        },
      ];
      await checkSaveMutations(
        complexCaseEntities,
        excludeFromIndexes,
        false,
        expectedMutations
      );
      await checkSaveMutations(
        complexCaseEntities,
        excludeFromIndexes,
        true,
        expectedMutations
      );
    });
    describe('should pass the right request with no indexes excluded and excludeLargeProperties set', async () => {
      it('should pass the right properties for an object', async () => {
        const expectedMutations: google.datastore.v1.IMutation[] = [
          {
            upsert: {
              properties: complexCaseProperties,
              key,
            },
          },
        ];
        await checkSaveMutations(
          complexCaseEntities,
          [],
          true,
          expectedMutations
        );
      });
      it.skip('should pass the right properties for an array', async () => {
        const arrayEntities = [
          {
            name: 'arrayEntities',
            value: complexCaseEntities,
          },
        ];
        const expectedMutations: google.datastore.v1.IMutation[] = [
          {
            upsert: {
              properties: {
                arrayEntities: {
                  entityValue: {
                    properties: complexCaseProperties,
                  },
                },
              },
              key,
            },
          },
        ];
        await checkSaveMutations(arrayEntities, [], true, expectedMutations);
      });
    });
  });
  describe('should pass the right request to gapic with excludeFromLargeProperties', () => {
    it.skip('should pass the right request with a nested field', async () => {
      const entities = [
        {
          name: 'field_b',
          value: {
            nestedField: Buffer.alloc(1501, '.').toString(),
          },
          excludeFromIndexes: true,
        },
      ];
      const expectedMutations = [
        {
          upsert: {
            properties: {
              field_b: {
                entityValue: {
                  properties: {},
                },
              },
            },
            key,
          },
        },
      ];
      await checkSaveMutations(entities, [], true, expectedMutations);
    });
  });
});
