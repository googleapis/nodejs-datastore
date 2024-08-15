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

const async = require('async');

describe.only('Commit', () => {
  const longString = Buffer.alloc(1501, '.').toString();
  const clientName = 'DatastoreClient';
  const datastore = getInitializedDatastoreClient();

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

  // complexCaseProperties are expected mutations passed to Gapic.
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

  describe('save should pass the right properties to the gapic layer', () => {
    async.each(
      [
        {
          // This test is from a modified version of https://github.com/googleapis/nodejs-datastore/blob/bf3dafd8267c447a52f7764505042a60b1a9fd28/test/index.ts#L1773
          name: 'should pass the right request with a bunch of large properties excluded',
          skipped: false,
          entities: complexCaseEntities,
          excludeFromIndexes: [
            'longString',
            'longStringArray[]',
            'metadata.longString',
            'metadata.obj.longStringArray[].longString',
            'metadata.obj.longStringArray[].nestedLongStringArray[].longString',
            'metadata.longStringArray[].longString',
            'metadata.longStringArray[].nestedLongStringArray[].longString',
          ],
          excludeLargeProperties: false,
          expectedMutations: [
            {
              upsert: {
                properties: complexCaseProperties,
                key,
              },
            },
          ],
        },
        {
          // Just like the previous test, but no excludeFromIndexes and excludeLargeProperties is true
          name: 'should pass the right properties for an object with excludeLargeProperties',
          skipped: false,
          entities: complexCaseEntities,
          excludeFromIndexes: [], // Empty because excludeLargeProperties populates the list.
          excludeLargeProperties: true,
          expectedMutations: [
            {
              upsert: {
                properties: complexCaseProperties,
                key,
              },
            },
          ],
        },
        {
          // Just like the previous test, but entities are wrapped in an array
          name: 'should pass the right properties for an array with excludeLargeProperties',
          skipped: true,
          entities: [
            {
              name: 'arrayEntities',
              value: complexCaseEntities,
            },
          ],
          excludeFromIndexes: [],
          excludeLargeProperties: true,
          expectedMutations: [
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
          ],
        },
        {
          // This test case reproduces https://github.com/googleapis/nodejs-datastore/issues/1242
          name: 'should pass the right request with a nested field',
          skipped: true,
          entities: [
            {
              name: 'field_b',
              value: {
                nestedField: Buffer.alloc(1501, '.').toString(),
              },
              excludeFromIndexes: true,
            },
          ],
          excludeFromIndexes: [],
          excludeLargeProperties: true,
          expectedMutations: [
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
          ],
        },
        {
          // "should pass the right request with a bunch of large properties excluded" test with entities wrapped in name/value
          name: 'should pass the right request with a name/value pair and a bunch of large properties excluded',
          skipped: false,
          entities: {
            name: 'entityName',
            value: complexCaseEntities,
          },
          excludeFromIndexes: [
            'value.longString',
            'value.longStringArray[]',
            'value.metadata.longString',
            'value.metadata.obj.longStringArray[].longString',
            'value.metadata.obj.longStringArray[].nestedLongStringArray[].longString',
            'value.metadata.longStringArray[].longString',
            'value.metadata.longStringArray[].nestedLongStringArray[].longString',
          ],
          excludeLargeProperties: false,
          expectedMutations: [
            {
              upsert: {
                properties: {
                  name: {
                    stringValue: 'entityName',
                  },
                  value: {
                    entityValue: {
                      properties: complexCaseProperties,
                    },
                  },
                },
                key,
              },
            },
          ],
        },
        {
          // "should pass the right properties for an object with excludeLargeProperties" test with entities wrapped in name/value
          name: 'should pass the right request with a name/value pair and excludeLargeProperties set to true',
          skipped: false,
          entities: {
            name: 'entityName',
            value: complexCaseEntities,
          },
          excludeFromIndexes: [],
          excludeLargeProperties: true,
          expectedMutations: [
            {
              upsert: {
                properties: {
                  name: {
                    stringValue: 'entityName',
                  },
                  value: {
                    entityValue: {
                      properties: complexCaseProperties,
                    },
                  },
                },
                key,
              },
            },
          ],
        },
      ],
      (test: {
        name: string;
        skipped: boolean;
        entities: Entities;
        excludeFromIndexes: string[];
        excludeLargeProperties: boolean;
        expectedMutations: google.datastore.v1.IMutation[];
      }) => {
        it(test.name, async function () {
          if (test.skipped) {
            this.skip();
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
          function replaceLongStrings(
            input?: google.datastore.v1.IMutation[] | null
          ) {
            const stringifiedInput = JSON.stringify(input);
            const replacedInput = stringifiedInput
              .split(longString)
              .join('<longString>');
            return JSON.parse(replacedInput) as google.datastore.v1.IMutation[];
          }
          {
            // This code block is indented so the reader knows the rest of the test doesn't depend its definitions.
            /*
            Sets up the gapic client so that when it receives mutations it ensures that
            the mutations match the expectedMutations and throw an assertion error if
            they don't.
            */
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
                  const actual = replaceLongStrings(request.mutations);
                  const expected = replaceLongStrings(test.expectedMutations);
                  assert.deepStrictEqual(actual, expected);
                } catch (e) {
                  callback(e);
                }
                callback(null, {
                  mutationResults: [],
                });
              };
            }
          }
          // Calls save and ensures that the right mutations are passed to the Gapic layer.
          const postKey = datastore.key(['Post', 'post2']);
          await datastore.save({
            key: postKey,
            data: test.entities,
            excludeFromIndexes: test.excludeFromIndexes,
            excludeLargeProperties: test.excludeLargeProperties,
          });
        });
      }
    );
  });
});
