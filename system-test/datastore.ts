// Copyright 2014 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as assert from 'assert';
import {readFileSync} from 'fs';
import * as path from 'path';
import {after, before, describe, it} from 'mocha';
import * as yaml from 'js-yaml';
import {Datastore, DatastoreOptions, Index, Transaction} from '../src';
import {google} from '../protos/protos';
import {Storage} from '@google-cloud/storage';
import {AggregateField} from '../src/aggregate';
import {PropertyFilter, and, or} from '../src/filter';
import {entity} from '../src/entity';
import KEY_SYMBOL = entity.KEY_SYMBOL;

const async = require('async');

const SECOND_DATABASE_ID = 'multidb-test';

async.each(
  [
    {
      namespace: `${Date.now()}`,
    },
    {
      databaseId: SECOND_DATABASE_ID,
      namespace: `second-db-${Date.now()}`,
    },
  ],
  (clientOptions: DatastoreOptions) => {
    describe('Datastore', () => {
      let timeBeforeDataCreation: number;
      const testKinds: string[] = [];
      const datastore = new Datastore(clientOptions);
      // Override the Key method so we can track what keys are created during the
      // tests. They are then deleted in the `after` hook.
      const key = datastore.key;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      datastore.key = function (options: any) {
        const keyObject = key.call(this, options);
        testKinds.push(keyObject.kind);
        return keyObject;
      };

      const {indexes: DECLARED_INDEXES} = yaml.load(
        readFileSync(path.join(__dirname, 'data', 'index.yaml'), 'utf8')
      ) as {indexes: google.datastore.admin.v1.IIndex[]};

      // TODO/DX ensure indexes before testing, and maybe? cleanup indexes after
      //  possible implications with kokoro project

      // Gets the read time of the latest save so that the test isn't flakey due to race condition.
      async function getReadTime(path: [{kind: string; name: string}]) {
        const projectId = await datastore.getProjectId();
        const request = {
          keys: [
            {
              path,
              partitionId: {namespaceId: datastore.namespace},
            },
          ],
          projectId,
        };
        const dataClient = datastore.clients_.get('DatastoreClient');
        let results: any;
        if (dataClient) {
          results = await dataClient['lookup'](request);
        }
        return parseInt(results[0].readTime.seconds) * 1000;
      }

      after(async () => {
        async function deleteEntities(kind: string) {
          const query = datastore.createQuery(kind).select('__key__');
          const [entities] = await datastore.runQuery(query);
          const keys = entities.map(entity => {
            return entity[datastore.KEY];
          });
          await datastore.delete(keys);
        }
        await Promise.all(testKinds.map(kind => deleteEntities(kind)));
      });

      it('should allocate IDs', async () => {
        const keys = await datastore.allocateIds(datastore.key('Kind'), 10);
        assert.ok(keys);
      });

      it('should get the project id', async () => {
        const projectId = await datastore.getProjectId();
        assert.notEqual(projectId, null);
      });

      describe('create, retrieve and delete', () => {
        const post = {
          title: 'How to make the perfect pizza in your grill',
          tags: ['pizza', 'grill'],
          publishedAt: new Date(),
          author: 'Silvano',
          isDraft: false,
          wordCount: 400,
          rating: 5.0,
          likes: null,
          metadata: {
            views: 100,
          },
        };

        it('should excludeFromIndexes correctly', async () => {
          const longString = Buffer.alloc(1501, '.').toString();
          const postKey = datastore.key(['Post', 'post1']);
          const data = {
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

          await datastore.save({
            key: postKey,
            data,
            excludeFromIndexes: [
              'longString',
              'longStringArray[]',
              'metadata.obj.longString',
              'metadata.obj.longStringArray[].longString',
              'metadata.obj.longStringArray[].nestedLongStringArray[].longString',
              'metadata.longString',
              'metadata.longStringArray[].longString',
              'metadata.longStringArray[].nestedLongStringArray[].longString',
            ],
          });
          const [entity] = await datastore.get(postKey);
          assert.deepStrictEqual(entity[datastore.KEY], postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, data);
          await datastore.delete(postKey);
        });

        it('should remove index with using wildcard in excludeFromIndexes', async () => {
          const longString = Buffer.alloc(1501, '.').toString();
          const postKey = datastore.key(['Post', 'post3']);
          const data = {
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

          const excludeFromIndexes = [
            'longString',
            'longStringArray[]',
            'metadata.longString',
            'metadata.obj.*',
            'metadata.longStringArray[].*',
          ];

          await datastore.save({
            key: postKey,
            data,
            excludeFromIndexes,
          });
          const [entity] = await datastore.get(postKey);
          assert.deepStrictEqual(entity[datastore.KEY], postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, data);
          await datastore.delete(postKey);
        });

        it('should auto remove index with excludeLargeProperties enabled', async () => {
          const longString = Buffer.alloc(1501, '.').toString();
          const postKey = datastore.key(['Post', 'post2']);
          const data = {
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

          await datastore.save({
            key: postKey,
            data,
            excludeLargeProperties: true,
          });
          const [entity] = await datastore.get(postKey);
          assert.deepStrictEqual(entity[datastore.KEY], postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, data);
          await datastore.delete(postKey);
        });

        it('should accurately save/get a large int value via Datastore.int()', async () => {
          const postKey = datastore.key('Team');
          const largeIntValueAsString = '9223372036854775807';
          const points = Datastore.int(largeIntValueAsString);
          await datastore.save({key: postKey, data: {points}});
          const [entity] = await datastore.get(postKey, {wrapNumbers: true});
          assert.strictEqual(entity.points.value, largeIntValueAsString);
          assert.throws(() => entity.points.valueOf());
          await datastore.delete(postKey);
        });

        it('should wrap specified properties via IntegerTypeCastOptions.properties', async () => {
          const postKey = datastore.key('Scores');
          const largeIntValueAsString = '9223372036854775807';
          const panthers = Datastore.int(largeIntValueAsString);
          const broncos = 922337203;
          let integerTypeCastFunctionCalled = 0;
          await datastore.save({key: postKey, data: {panthers, broncos}});
          const [entity] = await datastore.get(postKey, {
            wrapNumbers: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              integerTypeCastFunction: (value: any) => {
                integerTypeCastFunctionCalled++;
                return value.toString();
              },
              properties: 'panthers',
            },
          });
          // verify that value of property 'panthers' was converted via 'integerTypeCastFunction'.
          assert.strictEqual(entity.panthers, largeIntValueAsString);
          assert.strictEqual(integerTypeCastFunctionCalled, 1);
          // verify that value of the property broncos was converted to int by default logic.
          assert.strictEqual(entity.broncos, broncos);
          await datastore.delete(postKey);
        });

        it('should save/get/delete with a key name', async () => {
          const postKey = datastore.key(['Post', 'post1']);
          await datastore.save({key: postKey, data: post});
          const [entity] = await datastore.get(postKey);
          assert.deepStrictEqual(entity[datastore.KEY], postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, post);
          await datastore.delete(postKey);
        });

        describe('multi-db support for read and write operations', () => {
          const namespace = `${Date.now()}`;
          const keyHierarchy = ['Post', 'post1'];
          const defaultDatastore = new Datastore({namespace});
          it('should run a query with another database', async () => {
            // First verify that a record gets written to datastore
            const postKey = defaultDatastore.key(keyHierarchy);
            await defaultDatastore.save({key: postKey, data: post});
            const query = defaultDatastore
              .createQuery('Post')
              .hasAncestor(postKey);
            const [defaultDatastoreResults] =
              await defaultDatastore.runQuery(query);
            assert.strictEqual(defaultDatastoreResults.length, 1);
            const [entity] = await defaultDatastore.get(postKey);
            assert.strictEqual(entity.author, 'Silvano');
            // With another database, verify that a query returns no results
            const otherDatastore = new Datastore({
              namespace,
              databaseId: SECOND_DATABASE_ID,
            });
            const [secondDatastoreResults] =
              await otherDatastore.runQuery(query);
            assert.strictEqual(secondDatastoreResults.length, 0);
            const [otherEntity] = await otherDatastore.get(postKey);
            assert(typeof otherEntity === 'undefined');
            // Cleanup
            await defaultDatastore.delete(postKey);
          });
          it('should ensure save works with another database', async () => {
            // First verify that the default database is empty
            const postKey = defaultDatastore.key(keyHierarchy);
            const query = defaultDatastore
              .createQuery('Post')
              .hasAncestor(postKey);
            const [defaultDatastoreResults] =
              await defaultDatastore.runQuery(query);
            assert.strictEqual(defaultDatastoreResults.length, 0);
            const [originalSecondaryResults] =
              await defaultDatastore.runQuery(query);
            assert.strictEqual(originalSecondaryResults.length, 0);
            const [entity] = await defaultDatastore.get(postKey);
            assert(typeof entity === 'undefined');
            // With another database, verify that saving to the database works
            const otherDatastore = new Datastore({
              namespace,
              databaseId: SECOND_DATABASE_ID,
            });
            await otherDatastore.save({key: postKey, data: post});
            const [secondDatastoreResults] =
              await otherDatastore.runQuery(query);
            assert.strictEqual(secondDatastoreResults.length, 1);
            const [originalResults] = await defaultDatastore.runQuery(query);
            assert.strictEqual(originalResults.length, 0);
            const [otherEntity] = await otherDatastore.get(postKey);
            assert.strictEqual(otherEntity.author, 'Silvano');
            // Cleanup
            await otherDatastore.delete(postKey);
          });
          it('should ensure save respects the databaseId parameter per key', async () => {
            interface DatastoreData {
              key: entity.Key;
              data: any;
            }
            const secondaryDatastore = new Datastore({
              namespace: `${Date.now()}`,
              databaseId: SECOND_DATABASE_ID,
            });
            // Save all data to the default database
            const defaultAuthor = 'default database author';
            const defaultData = Object.assign({}, post);
            defaultData.author = defaultAuthor;
            const defaultPostKey = defaultDatastore.key([
              'Post',
              'default post key',
            ]);
            await defaultDatastore.save({
              key: defaultPostKey,
              data: defaultData,
            });
            // Save all data to the secondary database
            const secondaryIndices = [1, 2, 3];
            const secondaryData: DatastoreData[] = secondaryIndices.map(
              number => {
                const authorName = 'secondary author ' + number.toString();
                const keyName = 'secondary key ' + number.toString();
                const postData = Object.assign({}, post);
                postData.author = authorName;
                return {
                  key: secondaryDatastore.key(['Post', keyName]),
                  data: postData,
                };
              }
            );
            await Promise.all(
              secondaryData.map(async datum => secondaryDatastore.save(datum))
            );
            // Next, ensure that the default database has the right records
            const query = defaultDatastore
              .createQuery('Post')
              .hasAncestor(defaultPostKey);
            const [defaultDatastoreResults] =
              await defaultDatastore.runQuery(query);
            assert.strictEqual(defaultDatastoreResults.length, 1);
            assert.strictEqual(
              defaultDatastoreResults[0].author,
              defaultAuthor
            );
            // Next, ensure that the other database has the right records
            await Promise.all(
              secondaryData.map(async datum => {
                const query = secondaryDatastore
                  .createQuery('Post')
                  .hasAncestor(datum.key);
                const [results] = await secondaryDatastore.runQuery(query);
                assert.strictEqual(results.length, 1);
                assert.strictEqual(results[0].author, datum.data.author);
              })
            );
            // Cleanup
            await defaultDatastore.delete(defaultPostKey);
            await Promise.all(
              secondaryData.map(datum => secondaryDatastore.delete(datum.key))
            );
          });
        });

        it('should save/get/delete from a snapshot', async () => {
          function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          const post2 = {
            title: 'Another way to make pizza',
            tags: ['pizza', 'grill'],
            publishedAt: new Date(),
            author: 'Silvano',
            isDraft: false,
            wordCount: 400,
            rating: 5.0,
            likes: null,
            metadata: {
              views: 100,
            },
          };
          const path = ['Post', 'post1'];
          const postKey = datastore.key(path);
          await datastore.save({key: postKey, data: post});
          await sleep(10000);
          const savedTime = Date.now();
          await sleep(1000);
          // Save new post2 data, but then verify the timestamp read has post1 data
          await datastore.save({key: postKey, data: post2});
          const [entity] = await datastore.get(postKey, {readTime: savedTime});
          assert.deepStrictEqual(entity[datastore.KEY], postKey);
          const [entityNoOptions] = await datastore.get(postKey);
          assert.deepStrictEqual(entityNoOptions[datastore.KEY], postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, post);
          delete entityNoOptions[datastore.KEY];
          assert.deepStrictEqual(entityNoOptions, post2);
          await datastore.delete(postKey);
        });

        it('should save/get/delete with a numeric key id', async () => {
          const postKey = datastore.key(['Post', 123456789]);
          await datastore.save({key: postKey, data: post});
          const [entity] = await datastore.get(postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, post);
          await datastore.delete(postKey);
        });

        it('should save/get/delete a buffer', async () => {
          const postKey = datastore.key(['Post']);
          const data = {
            buf: Buffer.from(
              '010100000000000000000059400000000000006940',
              'hex'
            ),
          };
          await datastore.save({key: postKey, data});
          const assignedId = postKey.id;
          assert(assignedId);
          const [entity] = await datastore.get(postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, data);
          await datastore.delete(datastore.key(['Post', assignedId as string]));
        });

        it('should save/get/delete an empty buffer', async () => {
          const postKey = datastore.key(['Post']);
          const data = {
            buf: Buffer.from([]),
          };
          await datastore.save({key: postKey, data});
          const assignedId = postKey.id;
          assert(assignedId);
          const [entity] = await datastore.get(postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, data);
          await datastore.delete(datastore.key(['Post', assignedId as string]));
        });

        it('should save/get/delete with a generated key id', async () => {
          const postKey = datastore.key('Post');
          await datastore.save({key: postKey, data: post});

          // The key's path should now be complete.
          assert(postKey.id);

          const [entity] = await datastore.get(postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, post);
          await datastore.delete(postKey);
        });

        it('should save/get/update', async () => {
          const postKey = datastore.key('Post');
          await datastore.save({key: postKey, data: post});
          const [entity] = await datastore.get(postKey);
          assert.strictEqual(entity.title, post.title);
          entity.title = 'Updated';
          await datastore.save(entity);
          const [entity2] = await datastore.get(postKey);
          assert.strictEqual(entity2.title, 'Updated');
          await datastore.delete(postKey);
        });

        it('should save/get/merge', async () => {
          const postKey = datastore.key(['Post', 1]);
          const originalData = {
            key: postKey,
            data: {
              title: 'Original',
              status: 'neat',
            },
          };
          await datastore.save(originalData);
          const updatedData = {
            key: postKey,
            data: {
              title: 'Updated',
            },
          };
          await datastore.merge(updatedData);
          const [entity] = await datastore.get(postKey);
          assert.strictEqual(entity.title, updatedData.data.title);
          assert.strictEqual(entity.status, originalData.data.status);
          await datastore.delete(postKey);
        });

        it('should save and get with a string ID', async () => {
          const longIdKey = datastore.key([
            'Post',
            datastore.int('100000000000001234'),
          ]);
          await datastore.save({
            key: longIdKey,
            data: {
              test: true,
            },
          });
          const [entity] = await datastore.get(longIdKey);
          assert.strictEqual(entity.test, true);
        });

        it('should fail explicitly set second insert on save', async () => {
          const postKey = datastore.key('Post');
          await datastore.save({key: postKey, data: post});

          // The key's path should now be complete.
          assert(postKey.id);
          await assert.rejects(
            datastore.save({
              key: postKey,
              method: 'insert',
              data: post,
            })
          );
          const [entity] = await datastore.get(postKey);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, post);
          await datastore.delete(postKey);
        });

        it('should fail explicitly set first update on save', async () => {
          const postKey = datastore.key('Post');
          await assert.rejects(
            datastore.save({
              key: postKey,
              method: 'update',
              data: post,
            })
          );
        });

        it('should save/get/delete multiple entities at once', async () => {
          const post2 = {
            title: 'How to make the perfect homemade pasta',
            tags: ['pasta', 'homemade'],
            publishedAt: new Date('2001-01-01T00:00:00.000Z'),
            author: 'Silvano',
            isDraft: false,
            wordCount: 450,
            rating: 4.5,
          };
          const key1 = datastore.key('Post');
          const key2 = datastore.key('Post');
          await datastore.save([
            {key: key1, data: post},
            {key: key2, data: post2},
          ]);
          const [entities] = await datastore.get([key1, key2]);
          assert.strictEqual(entities.length, 2);
          await datastore.delete([key1, key2]);
        });

        it('should get multiple entities in a stream', done => {
          const key1 = datastore.key('Post');
          const key2 = datastore.key('Post');

          datastore.save(
            [
              {key: key1, data: post},
              {key: key2, data: post},
            ],
            err => {
              assert.ifError(err);

              let numEntitiesEmitted = 0;

              datastore
                .createReadStream([key1, key2])
                .on('error', done)
                .on('data', () => {
                  numEntitiesEmitted++;
                })
                .on('end', () => {
                  assert.strictEqual(numEntitiesEmitted, 2);
                  datastore.delete([key1, key2], done);
                });
            }
          );
        });

        it('should save keys as a part of entity and query by key', async () => {
          const personKey = datastore.key(['People', 'US', 'Person', 'name']);
          await datastore.save({
            key: personKey,
            data: {
              fullName: 'Full name',
              linkedTo: personKey, // himself
            },
          });
          const query = datastore
            .createQuery('Person')
            .hasAncestor(datastore.key(['People', 'US']))
            .filter('linkedTo', personKey);
          const [results] = await datastore.runQuery(query);
          assert.strictEqual(results![0].fullName, 'Full name');
          assert.deepStrictEqual(results![0].linkedTo, personKey);
          await datastore.delete(personKey);
        });

        it('should save with an empty buffer', async () => {
          const key = datastore.key(['TEST']);
          const result = await datastore.save({
            key: key,
            data: {
              name: 'test',
              blob: Buffer.from([]),
            },
          });
          const mutationResult = result.pop()?.mutationResults?.pop();
          assert.strictEqual(mutationResult?.key?.path?.pop()?.kind, 'TEST');
        });

        describe('entity types', () => {
          it('should save and decode an int', async () => {
            const integerValue = 2015;
            const integerType = Datastore.int(integerValue);
            const key = datastore.key('Person');
            await datastore.save({
              key,
              data: {
                year: integerType,
              },
            });
            const [entity] = await datastore.get(key);
            assert.strictEqual(entity.year, integerValue);
          });

          it('should save and decode a double', async () => {
            const doubleValue = 99.99;
            const doubleType = Datastore.double(doubleValue);
            const key = datastore.key('Person');
            await datastore.save({
              key,
              data: {
                nines: doubleType,
              },
            });
            const [entity] = await datastore.get(key);
            assert.strictEqual(entity.nines, doubleValue);
          });

          it('should save and decode a geo point', async () => {
            const geoPointValue = {
              latitude: 40.6894,
              longitude: -74.0447,
            };
            const geoPointType = Datastore.geoPoint(geoPointValue);
            const key = datastore.key('Person');
            await datastore.save({
              key,
              data: {
                location: geoPointType,
              },
            });
            const [entity] = await datastore.get(key);
            assert.deepStrictEqual(entity.location, geoPointValue);
          });
        });
      });

      describe('querying the datastore', () => {
        const ancestor = datastore.key(['Book', 'GoT']);

        const keys = [
          // Paths:
          ['Rickard'],
          ['Rickard', 'Character', 'Eddard'],
          ['Catelyn'],
          ['Rickard', 'Character', 'Eddard', 'Character', 'Arya'],
          ['Rickard', 'Character', 'Eddard', 'Character', 'Sansa'],
          ['Rickard', 'Character', 'Eddard', 'Character', 'Robb'],
          ['Rickard', 'Character', 'Eddard', 'Character', 'Bran'],
          ['Rickard', 'Character', 'Eddard', 'Character', 'Jon Snow'],
        ].map(path => {
          return datastore.key(['Book', 'GoT', 'Character'].concat(path));
        });

        const characters = [
          {
            name: 'Rickard',
            family: 'Stark',
            appearances: 9,
            alive: false,
          },
          {
            name: 'Eddard',
            family: 'Stark',
            appearances: 9,
            alive: false,
          },
          {
            name: 'Catelyn',
            family: ['Stark', 'Tully'],
            appearances: 26,
            alive: false,
          },
          {
            name: 'Arya',
            family: 'Stark',
            appearances: 33,
            alive: true,
          },
          {
            name: 'Sansa',
            family: 'Stark',
            appearances: 31,
            alive: true,
          },
          {
            name: 'Robb',
            family: 'Stark',
            appearances: 22,
            alive: false,
          },
          {
            name: 'Bran',
            family: 'Stark',
            appearances: 25,
            alive: true,
          },
          {
            name: 'Jon Snow',
            family: 'Stark',
            appearances: 32,
            alive: true,
          },
        ];

        before(async () => {
          // This 'sleep' function is used to ensure that when data is saved to datastore,
          // the time on the server is far enough ahead to be sure to be later than timeBeforeDataCreation
          // so that when we read at timeBeforeDataCreation we get a snapshot of data before the save.
          function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          const keysToSave = keys.map((key, index) => {
            return {
              key,
              data: characters[index],
            };
          });
          // Save for a key so that a read time can be accessed for snapshot reads.
          const emptyData = Object.assign(Object.assign({}, keysToSave[0]), {
            data: {},
          });
          await datastore.save(emptyData);
          timeBeforeDataCreation = await getReadTime([
            {kind: 'Character', name: 'Rickard'},
          ]);
          // Sleep for 3 seconds so that any future reads will be later than timeBeforeDataCreation.
          await sleep(3000);
          await datastore.save(keysToSave);
        });

        after(async () => {
          await datastore.delete(keys);
        });

        it('should limit queries', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .limit(5);
          const [firstEntities, info] = await datastore.runQuery(q);
          assert.strictEqual(firstEntities!.length, 5);
          const secondQ = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .start(info!.endCursor!);
          const [secondEntities] = await datastore.runQuery(secondQ);
          assert.strictEqual(secondEntities!.length, 3);
        });

        it('should not go over a limit', async () => {
          const limit = 3;
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .limit(limit);
          const [results] = await datastore.runQuery(q);
          assert.strictEqual(results!.length, limit);
        });

        it('should run a query as a stream', done => {
          const q = datastore.createQuery('Character').hasAncestor(ancestor);
          let resultsReturned = 0;
          datastore
            .runQueryStream(q)
            .on('error', done)
            .on('data', () => resultsReturned++)
            .on('end', () => {
              assert.strictEqual(resultsReturned, characters.length);
              done();
            });
        });

        it('should run a datastore query as a stream via query#runStream', done => {
          const q = datastore.createQuery('Character').hasAncestor(ancestor);
          let resultsReturned = 0;
          q.runStream()
            .on('error', done)
            .on('data', () => resultsReturned++)
            .on('end', () => {
              assert.strictEqual(resultsReturned, characters.length);
              done();
            });
        });

        it('should run a transaction query as a stream via query#runStream', done => {
          const transaction = datastore.transaction();
          const q = transaction.createQuery('Character').hasAncestor(ancestor);
          let resultsReturned = 0;
          q.runStream()
            .on('error', done)
            .on('data', () => resultsReturned++)
            .on('end', () => {
              assert.strictEqual(resultsReturned, characters.length);
              done();
            });
        });

        it('should not go over a limit with a stream', done => {
          const limit = 3;
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .limit(limit);
          let resultsReturned = 0;
          datastore
            .runQueryStream(q)
            .on('error', done)
            .on('data', () => resultsReturned++)
            .on('end', () => {
              assert.strictEqual(resultsReturned, limit);
              done();
            });
        });

        it('should filter queries with simple indexes', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .filter('appearances', '>=', 20);
          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities!.length, 6);
        });

        it('should filter queries with NOT_EQUAL', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .filter('appearances', '!=', 9);
          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities!.length, 6);
        });

        it('should filter queries with IN', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .filter('appearances', 'IN', [9, 25]);
          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities!.length, 3);
        });

        it('should filter queries with __key__ and IN', async () => {
          const key1 = datastore.key(['Book', 'GoT', 'Character', 'Rickard']);
          const key2 = datastore.key([
            'Book',
            'GoT',
            'Character',
            'Rickard',
            'Character',
            'Eddard',
            'Character',
            'Sansa',
          ]);
          const key3 = datastore.key([
            'Book',
            'GoT',
            'Character',
            'Rickard',
            'Character',
            'Eddard',
          ]);
          const value = [key1, key2, key3];
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .filter('__key__', 'IN', value);
          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities!.length, 3);
          assert.deepStrictEqual(entities[0][KEY_SYMBOL], key1);
          assert.deepStrictEqual(entities[1][KEY_SYMBOL], key3);
          assert.deepStrictEqual(entities[2][KEY_SYMBOL], key2);
        });

        it('should filter queries with NOT_IN', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .filter('appearances', 'NOT_IN', [9, 25]);
          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities!.length, 5);
        });

        it('should filter queries with defined indexes', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .filter('family', 'Stark')
            .filter('appearances', '>=', 20);
          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities!.length, 6);
        });
        describe('with the filter function using the Filter class', () => {
          it('should run a query with one property filter', async () => {
            const filter = new PropertyFilter('family', '=', 'Stark');
            const q = datastore
              .createQuery('Character')
              .filter(filter)
              .hasAncestor(ancestor);
            const [entities] = await datastore.runQuery(q);
            assert.strictEqual(entities!.length, 8);
          });
          it('should run a query with two property filters', async () => {
            const q = datastore
              .createQuery('Character')
              .filter(new PropertyFilter('family', '=', 'Stark'))
              .filter(new PropertyFilter('appearances', '>=', 20));
            const [entities] = await datastore.runQuery(q);
            assert.strictEqual(entities!.length, 6);
          });
          it('should run a query using new Filter class with filter', async () => {
            const q = datastore
              .createQuery('Character')
              .filter('family', 'Stark')
              .filter(new PropertyFilter('appearances', '>=', 20));
            const [entities] = await datastore.runQuery(q);
            assert.strictEqual(entities!.length, 6);
            for (const entity of entities) {
              if (Array.isArray(entity.family)) {
                assert.strictEqual(entity.family[0], 'Stark');
              } else {
                assert.strictEqual(entity.family, 'Stark');
              }
              assert(entity.appearances >= 20);
            }
          });
          it('should run a query using an AND composite filter', async () => {
            const q = datastore
              .createQuery('Character')
              .filter(
                and([
                  new PropertyFilter('family', '=', 'Stark'),
                  new PropertyFilter('appearances', '>=', 20),
                ])
              );
            const [entities] = await datastore.runQuery(q);
            assert.strictEqual(entities!.length, 6);
            for (const entity of entities) {
              if (Array.isArray(entity.family)) {
                assert.strictEqual(entity.family[0], 'Stark');
              } else {
                assert.strictEqual(entity.family, 'Stark');
              }
              assert(entity.appearances >= 20);
            }
          });
          it('should run a query using an OR composite filter', async () => {
            const q = datastore
              .createQuery('Character')
              .filter(
                or([
                  new PropertyFilter('family', '=', 'Stark'),
                  new PropertyFilter('appearances', '>=', 20),
                ])
              );
            const [entities] = await datastore.runQuery(q);
            assert.strictEqual(entities!.length, 8);
            let atLeastOne = false;
            for (const entity of entities) {
              const familyHasStark = Array.isArray(entity.family)
                ? entity.family[0] === 'Stark'
                : entity.family === 'Stark';
              const hasEnoughAppearances = entity.appearances >= 20;
              if (familyHasStark && !hasEnoughAppearances) {
                atLeastOne = true;
              }
            }
            assert(atLeastOne);
          });
          describe('using hasAncestor and Filter class', () => {
            const secondAncestor = datastore.key([
              'Book',
              'GoT',
              'Character',
              'Rickard',
              'Character',
              'Eddard',
            ]);
            it('should run a query using hasAncestor last', async () => {
              const q = datastore
                .createQuery('Character')
                .filter(new PropertyFilter('appearances', '<', 30))
                .hasAncestor(secondAncestor);
              const [entities] = await datastore.runQuery(q);
              assert.strictEqual(entities!.length, 3);
            });
            it('should run a query using hasAncestor first', async () => {
              const q = datastore
                .createQuery('Character')
                .hasAncestor(secondAncestor)
                .filter(new PropertyFilter('appearances', '<', 30));
              const [entities] = await datastore.runQuery(q);
              assert.strictEqual(entities!.length, 3);
            });
          });
        });
        describe('with a sum filter', () => {
          it('should run a sum aggregation', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.sum('appearances'));
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 187}]);
          });
          it('should run a sum aggregation with a list of aggregates', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.sum('appearances'),
                AggregateField.sum('appearances'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [
              {property_1: 187, property_2: 187},
            ]);
          });
          it('should run a sum aggregation having other filters', async () => {
            const q = datastore
              .createQuery('Character')
              .filter('family', 'Stark')
              .filter('appearances', '>=', 20);
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.sum('appearances').alias('sum1'));
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{sum1: 169}]);
          });
          it('should run a sum aggregate filter with an alias', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.sum('appearances').alias('sum1'));
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{sum1: 187}]);
          });
          it('should do multiple sum aggregations with aliases', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.sum('appearances').alias('sum1'),
                AggregateField.sum('appearances').alias('sum2'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{sum1: 187, sum2: 187}]);
          });
          it('should run a sum aggregation filter with a limit', async () => {
            // When using a limit the test appears to use data points with the lowest appearance values.
            const q = datastore.createQuery('Character').limit(5);
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.sum('appearances'));
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 91}]);
          });
          it('should run a sum aggregate filter with a limit and an alias', async () => {
            const q = datastore.createQuery('Character').limit(7);
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.sum('appearances').alias('sum1'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{sum1: 154}]);
          });
          it('should run a sum aggregate filter against a non-numeric property value', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([AggregateField.sum('family').alias('sum1')]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{sum1: 0}]);
          });
          it('should run a sum aggregate filter against __key__ property value', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([AggregateField.sum('__key__').alias('sum1')]);
            try {
              await datastore.runAggregationQuery(aggregate);
              assert.fail('The request should have failed.');
            } catch (err: any) {
              assert.strictEqual(
                err.message,
                '3 INVALID_ARGUMENT: Aggregations are not supported for the property: __key__'
              );
            }
          });
          it('should run a sum aggregate filter against a query that returns no results', async () => {
            const q = datastore
              .createQuery('Character')
              .filter('family', 'NoMatch');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.sum('appearances').alias('sum1'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{sum1: 0}]);
          });
          it('should run a sum aggregate filter against a query from before the data creation', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.sum('appearances').alias('sum1'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate, {
              readTime: timeBeforeDataCreation,
            });
            assert.deepStrictEqual(results, [{sum1: 0}]);
          });
          it('should run a sum aggregate filter using the alias function, but with no alias', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([AggregateField.sum('appearances').alias()]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 187}]);
          });
        });
        describe('with an average filter', () => {
          it('should run an average aggregation', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.average('appearances'));
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 23.375}]);
          });
          it('should run an average aggregation with a list of aggregates', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.average('appearances'),
                AggregateField.average('appearances'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [
              {property_1: 23.375, property_2: 23.375},
            ]);
          });
          it('should run an average aggregation having other filters', async () => {
            const q = datastore
              .createQuery('Character')
              .filter('family', 'Stark')
              .filter('appearances', '>=', 20);
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(
                AggregateField.average('appearances').alias('avg1')
              );
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{avg1: 28.166666666666668}]);
          });
          it('should run an average aggregate filter with an alias', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(
                AggregateField.average('appearances').alias('avg1')
              );
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{avg1: 23.375}]);
          });
          it('should do multiple average aggregations with aliases', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.average('appearances').alias('avg1'),
                AggregateField.average('appearances').alias('avg2'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{avg1: 23.375, avg2: 23.375}]);
          });
          it('should run an average aggregation filter with a limit', async () => {
            const q = datastore.createQuery('Character').limit(5);
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.average('appearances'));
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 18.2}]);
          });
          it('should run an average aggregate filter with a limit and an alias', async () => {
            const q = datastore.createQuery('Character').limit(7);
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.average('appearances').alias('avg1'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{avg1: 22}]);
          });
          it('should run an average aggregate filter against a non-numeric property value', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.average('family').alias('avg1'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{avg1: null}]);
          });
          it('should run an average aggregate filter against __key__ property value', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.average('__key__').alias('avg1'),
              ]);
            try {
              await datastore.runAggregationQuery(aggregate);
              assert.fail('The request should have failed.');
            } catch (err: any) {
              assert.strictEqual(
                err.message,
                '3 INVALID_ARGUMENT: Aggregations are not supported for the property: __key__'
              );
            }
          });
          it('should run an average aggregate filter against a query that returns no results', async () => {
            const q = datastore
              .createQuery('Character')
              .filter('family', 'NoMatch');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.average('appearances').alias('avg1'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{avg1: null}]);
          });
          it('should run an average aggregate filter against a query from before the data creation', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.average('appearances').alias('avg1'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate, {
              readTime: timeBeforeDataCreation,
            });
            assert.deepStrictEqual(results, [{avg1: null}]);
          });
          it('should run an average aggregate filter using the alias function, but with no alias', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([AggregateField.average('appearances').alias()]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 23.375}]);
          });
        });
        describe('with a count filter', () => {
          it('should run a count aggregation', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.count());
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 8}]);
          });
          it('should run a count aggregation with a list of aggregates', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.count(),
                AggregateField.count(),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 8, property_2: 8}]);
          });
          it('should run a count aggregation having other filters', async () => {
            const q = datastore
              .createQuery('Character')
              .filter('family', 'Stark')
              .filter('appearances', '>=', 20);
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.count().alias('total'));
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{total: 6}]);
          });
          it('should run a count aggregate filter with an alias', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.count().alias('total'));
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{total: 8}]);
          });
          it('should do multiple count aggregations with aliases', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.count().alias('total'),
                AggregateField.count().alias('total2'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{total: 8, total2: 8}]);
          });
          it('should run a count aggregation filter with a limit', async () => {
            const q = datastore.createQuery('Character').limit(5);
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregation(AggregateField.count());
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 5}]);
          });
          it('should run a count aggregate filter with a limit and an alias', async () => {
            const q = datastore.createQuery('Character').limit(7);
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([AggregateField.count().alias('total')]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{total: 7}]);
          });
          it('should run a count aggregate filter using the alias function, but with no alias', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([AggregateField.count().alias()]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [{property_1: 8}]);
          });
        });
        describe('with multiple types of filters', () => {
          it('should run multiple types of aggregations with a list of aggregates', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.count(),
                AggregateField.sum('appearances'),
                AggregateField.average('appearances'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [
              {property_1: 8, property_2: 187, property_3: 23.375},
            ]);
          });
          it('should run multiple types of aggregations with and without aliases', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.count(),
                AggregateField.average('appearances'),
                AggregateField.count().alias('alias_count'),
                AggregateField.sum('appearances').alias('alias_sum'),
                AggregateField.average('appearances').alias('alias_average'),
              ]);
            const [results] = await datastore.runAggregationQuery(aggregate);
            assert.deepStrictEqual(results, [
              {
                property_1: 8,
                property_2: 23.375,
                alias_count: 8,
                alias_sum: 187,
                alias_average: 23.375,
              },
            ]);
          });
          it('should throw an error when too many aggregations are run', async () => {
            const q = datastore.createQuery('Character');
            const aggregate = datastore
              .createAggregationQuery(q)
              .addAggregations([
                AggregateField.count(),
                AggregateField.sum('appearances'),
                AggregateField.average('appearances'),
                AggregateField.count().alias('alias_count'),
                AggregateField.sum('appearances').alias('alias_sum'),
                AggregateField.average('appearances').alias('alias_average'),
              ]);
            try {
              await datastore.runAggregationQuery(aggregate);
            } catch (err: any) {
              assert.strictEqual(
                err.message,
                '3 INVALID_ARGUMENT: The maximum number of aggregations allowed in an aggregation query is 5. Received: 6'
              );
            }
          });
        });
        it('should filter by ancestor', async () => {
          const q = datastore.createQuery('Character').hasAncestor(ancestor);
          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities.length, characters.length);
        });

        it('should construct filters by null status', async () => {
          assert.strictEqual(
            datastore
              .createQuery('Character')
              .filter('status', null)
              .filters.pop()?.val,
            null
          );
          assert.strictEqual(
            datastore
              .createQuery('Character')
              .filter('status', '=', null)
              .filters.pop()?.val,
            null
          );
        });
        it('should filter by key', async () => {
          const key = datastore.key(['Book', 'GoT', 'Character', 'Rickard']);
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .filter('__key__', key);
          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities!.length, 1);
        });

        it('should order queries', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .order('appearances');

          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities![0].name, characters[0].name);
          assert.strictEqual(entities![7].name, characters[3].name);
        });

        it('should select projections', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .select(['name', 'family']);

          const [entities] = await datastore.runQuery(q);
          delete entities[0][datastore.KEY];
          assert.deepStrictEqual(entities![0], {
            name: 'Arya',
            family: 'Stark',
          });
          delete entities[8][datastore.KEY];
          assert.deepStrictEqual(entities![8], {
            name: 'Sansa',
            family: 'Stark',
          });
        });

        it('should paginate with offset and limit', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .offset(2)
            .limit(3)
            .order('appearances');

          const [entities, info] = await datastore.runQuery(q);
          assert.strictEqual(entities!.length, 3);
          assert.strictEqual(entities![0].name, 'Robb');
          assert.strictEqual(entities![2].name, 'Catelyn');
          const secondQ = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .order('appearances')
            .start(info!.endCursor!);
          const [secondEntities] = await datastore.runQuery(secondQ);
          assert.strictEqual(secondEntities!.length, 3);
          assert.strictEqual(secondEntities![0].name, 'Sansa');
          assert.strictEqual(secondEntities![2].name, 'Arya');
        });

        it('should resume from a start cursor', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .offset(2)
            .limit(2)
            .order('appearances');
          const [, info] = await datastore.runQuery(q);
          const secondQ = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .order('appearances')
            .start(info!.endCursor!);
          const [secondEntities] = await datastore.runQuery(secondQ);
          assert.strictEqual(secondEntities!.length, 4);
          assert.strictEqual(secondEntities![0].name, 'Catelyn');
          assert.strictEqual(secondEntities![3].name, 'Arya');
        });

        it('should group queries', async () => {
          const q = datastore
            .createQuery('Character')
            .hasAncestor(ancestor)
            .groupBy('appearances');
          const [entities] = await datastore.runQuery(q);
          assert.strictEqual(entities!.length, characters.length - 1);
        });

        it('should query from the Query object', async () => {
          await datastore.createQuery('Character').run();
        });
      });

      describe('querying the datastore with an overflow data set', () => {
        const keys = [
          // Paths:
          ['Rickard'],
          ['Rickard', 'Character', 'Eddard'],
        ].map(path => {
          return datastore.key(['Book', 'GoT', 'Character'].concat(path));
        });
        const characters = [
          {
            name: 'Rickard',
            family: 'Stark',
            // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
            appearances: 9223372036854775807,
            alive: false,
          },
          {
            name: 'Eddard',
            family: 'Stark',
            // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
            appearances: 9223372036854775807,
            alive: false,
          },
        ];
        before(async () => {
          const keysToSave = keys.map((key, index) => {
            return {
              key,
              data: characters[index],
            };
          });
          await datastore.save(keysToSave);
        });
        after(async () => {
          await datastore.delete(keys);
        });
        it('should run a sum aggregation with an overflow dataset', async () => {
          const q = datastore.createQuery('Character');
          const aggregate = datastore
            .createAggregationQuery(q)
            .addAggregation(AggregateField.sum('appearances'));
          const [results] = await datastore.runAggregationQuery(aggregate);
          assert.deepStrictEqual(results, [
            {property_1: -18446744073709552000},
          ]);
        });
        it('should run an average aggregation with an overflow dataset', async () => {
          const q = datastore.createQuery('Character');
          const aggregate = datastore
            .createAggregationQuery(q)
            .addAggregation(AggregateField.average('appearances'));
          const [results] = await datastore.runAggregationQuery(aggregate);
          assert.deepStrictEqual(results, [{property_1: -9223372036854776000}]);
        });
      });
      describe('querying the datastore with an NaN in the data set', () => {
        const keys = [
          // Paths:
          ['Rickard'],
          ['Rickard', 'Character', 'Eddard'],
        ].map(path => {
          return datastore.key(['Book', 'GoT', 'Character'].concat(path));
        });
        const characters = [
          {
            name: 'Rickard',
            family: 'Stark',
            appearances: 4,
            alive: false,
          },
          {
            name: 'Eddard',
            family: 'Stark',
            appearances: null,
            alive: false,
          },
        ];
        before(async () => {
          const keysToSave = keys.map((key, index) => {
            return {
              key,
              data: characters[index],
            };
          });
          await datastore.save(keysToSave);
        });
        after(async () => {
          await datastore.delete(keys);
        });
        it('should run a sum aggregation', async () => {
          const q = datastore.createQuery('Character');
          const aggregate = datastore
            .createAggregationQuery(q)
            .addAggregation(AggregateField.sum('appearances'));
          const [results] = await datastore.runAggregationQuery(aggregate);
          assert.deepStrictEqual(results, [{property_1: 4}]);
        });
        it('should run an average aggregation', async () => {
          const q = datastore.createQuery('Character');
          const aggregate = datastore
            .createAggregationQuery(q)
            .addAggregation(AggregateField.average('appearances'));
          const [results] = await datastore.runAggregationQuery(aggregate);
          assert.deepStrictEqual(results, [{property_1: 4}]);
        });
      });
      describe('transactions with and without run', () => {
        describe('lookup, put, commit', () => {
          const key = datastore.key(['Company', 'Google']);
          const obj = {
            url: 'www.google.com',
          };
          afterEach(async () => {
            await datastore.delete(key);
          });
          async function doLookupPutCommit(transaction: Transaction) {
            const [firstRead] = await transaction.get(key);
            assert(!firstRead);
            transaction.save({key, data: obj});
            await transaction.commit();
            const [entity] = await datastore.get(key);
            delete entity[datastore.KEY];
            assert.deepStrictEqual(entity, obj);
          }
          it('should run in a transaction', async () => {
            const transaction = datastore.transaction();
            await transaction.run();
            await doLookupPutCommit(transaction);
          });
          it('should run in a transaction without run', async () => {
            const transaction = datastore.transaction();
            await doLookupPutCommit(transaction);
          });
        });
        describe('put, lookup, commit', () => {
          const key = datastore.key(['Company', 'Google']);
          const obj = {
            url: 'www.google.com',
          };
          afterEach(async () => {
            await datastore.delete(key);
          });
          async function doPutLookupCommit(transaction: Transaction) {
            transaction.save({key, data: obj});
            const [firstRead] = await transaction.get(key);
            assert(!firstRead);
            await transaction.commit();
            const [entity] = await datastore.get(key);
            delete entity[datastore.KEY];
            assert.deepStrictEqual(entity, obj);
          }
          it('should run in a transaction', async () => {
            const transaction = datastore.transaction();
            await transaction.run();
            await doPutLookupCommit(transaction);
          });
          it('should run in a transaction without run', async () => {
            const transaction = datastore.transaction();
            await doPutLookupCommit(transaction);
          });
        });
        describe('runQuery, put, commit', () => {
          const key = datastore.key(['Company', 'Google']);
          const obj = {
            url: 'www.google.com',
          };
          afterEach(async () => {
            await datastore.delete(key);
          });
          async function doRunQueryPutCommit(transaction: Transaction) {
            const query = transaction.createQuery('Company');
            const [results] = await transaction.runQuery(query);
            assert.deepStrictEqual(results, []);
            transaction.save({key, data: obj});
            await transaction.commit();
            const [entity] = await datastore.get(key);
            delete entity[datastore.KEY];
            assert.deepStrictEqual(entity, obj);
          }
          it('should run in a transaction', async () => {
            const transaction = datastore.transaction();
            await transaction.run();
            await doRunQueryPutCommit(transaction);
          });
          it('should run in a transaction without run', async () => {
            const transaction = datastore.transaction();
            await doRunQueryPutCommit(transaction);
          });
        });
        describe('put, runQuery, commit', () => {
          const key = datastore.key(['Company', 'Google']);
          const obj = {
            url: 'www.google.com',
          };
          afterEach(async () => {
            await datastore.delete(key);
          });
          async function doPutRunQueryCommit(transaction: Transaction) {
            transaction.save({key, data: obj});
            const query = transaction.createQuery('Company');
            const [results] = await transaction.runQuery(query);
            assert.deepStrictEqual(results, []);
            await transaction.commit();
            const [entity] = await datastore.get(key);
            delete entity[datastore.KEY];
            assert.deepStrictEqual(entity, obj);
          }
          it('should run in a transaction', async () => {
            const transaction = datastore.transaction();
            await transaction.run();
            await doPutRunQueryCommit(transaction);
          });
          it('should run in a transaction without run', async () => {
            const transaction = datastore.transaction();
            await doPutRunQueryCommit(transaction);
          });
        });

        describe('runAggregationQuery, put, commit', () => {
          const key = datastore.key(['Company', 'Google']);
          const obj = {
            url: 'www.google.com',
          };
          afterEach(async () => {
            await datastore.delete(key);
          });
          async function doRunAggregationQueryPutCommit(
            transaction: Transaction
          ) {
            const query = transaction.createQuery('Company');
            const aggregateQuery = transaction
              .createAggregationQuery(query)
              .count('total');
            const [results] =
              await transaction.runAggregationQuery(aggregateQuery);
            assert.deepStrictEqual(results, [{total: 0}]);
            transaction.save({key, data: obj});
            await transaction.commit();
            const [entity] = await datastore.get(key);
            delete entity[datastore.KEY];
            assert.deepStrictEqual(entity, obj);
          }
          it('should run in a transaction', async () => {
            const transaction = datastore.transaction();
            await transaction.run();
            await doRunAggregationQueryPutCommit(transaction);
          });
          it('should run in a transaction without run', async () => {
            const transaction = datastore.transaction();
            await doRunAggregationQueryPutCommit(transaction);
          });
        });
        describe('put, runAggregationQuery, commit', () => {
          const key = datastore.key(['Company', 'Google']);
          const obj = {
            url: 'www.google.com',
          };
          afterEach(async () => {
            await datastore.delete(key);
          });
          async function doPutRunAggregationQueryCommit(
            transaction: Transaction
          ) {
            transaction.save({key, data: obj});
            const query = transaction.createQuery('Company');
            const aggregateQuery = transaction
              .createAggregationQuery(query)
              .count('total');
            const [results] =
              await transaction.runAggregationQuery(aggregateQuery);
            assert.deepStrictEqual(results, [{total: 0}]);
            await transaction.commit();
            const [entity] = await datastore.get(key);
            delete entity[datastore.KEY];
            assert.deepStrictEqual(entity, obj);
          }
          it('should run in a transaction', async () => {
            const transaction = datastore.transaction();
            await transaction.run();
            await doPutRunAggregationQueryCommit(transaction);
          });
          it('should run in a transaction without run', async () => {
            const transaction = datastore.transaction();
            await doPutRunAggregationQueryCommit(transaction);
          });
        });
      });
      describe('transactions', () => {
        it('should run in a transaction', async () => {
          const key = datastore.key(['Company', 'Google']);
          const obj = {
            url: 'www.google.com',
          };
          const transaction = datastore.transaction();
          await transaction.run();
          await transaction.get(key);
          transaction.save({key, data: obj});
          await transaction.commit();
          const [entity] = await datastore.get(key);
          delete entity[datastore.KEY];
          assert.deepStrictEqual(entity, obj);
        });

        it('should commit all saves and deletes at the end', async () => {
          const deleteKey = datastore.key(['Company', 'Subway']);
          const key = datastore.key(['Company', 'Google']);
          const incompleteKey = datastore.key('Company');

          await datastore.save({
            key: deleteKey,
            data: {},
          });
          const transaction = datastore.transaction();

          await transaction.run();
          transaction.delete(deleteKey);

          transaction.save([
            {
              key,
              data: {rating: 10},
            },
            {
              key: incompleteKey,
              data: {rating: 100},
            },
          ]);

          await transaction.commit();

          // Incomplete key should have been given an ID.
          assert.strictEqual(incompleteKey.path.length, 2);

          const [[deletedEntity], [fetchedEntity]] = await Promise.all([
            // Deletes the key that is in the deletion queue.
            datastore.get(deleteKey),
            // Updates data on the key.
            datastore.get(key),
          ]);
          assert.strictEqual(typeof deletedEntity, 'undefined');
          assert.strictEqual(fetchedEntity.rating, 10);
        });

        it('should use the last modification to a key', async () => {
          const incompleteKey = datastore.key('Company');
          const key = datastore.key(['Company', 'Google']);
          const transaction = datastore.transaction();
          await transaction.run();
          transaction.save([
            {
              key,
              data: {
                rating: 10,
              },
            },
            {
              key: incompleteKey,
              data: {
                rating: 100,
              },
            },
          ]);
          transaction.delete(key);
          await transaction.commit();

          // Should not return a result.
          const [entity] = await datastore.get(key);
          assert.strictEqual(entity, undefined);

          // Incomplete key should have been given an id.
          assert.strictEqual(incompleteKey.path.length, 2);
        });

        it('should query within a transaction', async () => {
          const transaction = datastore.transaction();
          await transaction.run();
          const query = transaction.createQuery('Company');
          let entities;
          try {
            [entities] = await query.run();
          } catch (e) {
            await transaction.rollback();
            return;
          }
          assert(entities!.length > 0);
          await transaction.commit();
        });

        describe('aggregate query within a transaction', async () => {
          it('should run a query and return the results', async () => {
            // Add a test here to verify what the data is at this time.
            // This will be a valuable reference for tests in this describe block.
            const query = datastore.createQuery('Company');
            const [results] = await datastore.runQuery(query);
            assert.deepStrictEqual(
              results.map(result => result.rating),
              [100, 100]
            );
          });
          it('should aggregate query within a count transaction', async () => {
            const transaction = datastore.transaction();
            await transaction.run();
            const query = transaction.createQuery('Company');
            const aggregateQuery = transaction
              .createAggregationQuery(query)
              .count('total');
            let result;
            try {
              [result] = await aggregateQuery.run();
            } catch (e) {
              await transaction.rollback();
              throw e;
            }
            assert.deepStrictEqual(result, [{total: 2}]);
            await transaction.commit();
          });
          it('should aggregate query within a sum transaction', async () => {
            const transaction = datastore.transaction();
            await transaction.run();
            const query = transaction.createQuery('Company');
            const aggregateQuery = transaction
              .createAggregationQuery(query)
              .sum('rating', 'total rating');
            let result;
            try {
              [result] = await aggregateQuery.run();
            } catch (e) {
              await transaction.rollback();
              throw e;
            }
            assert.deepStrictEqual(result, [{'total rating': 200}]);
            await transaction.commit();
          });
          it('should aggregate query within a average transaction', async () => {
            const transaction = datastore.transaction();
            await transaction.run();
            const query = transaction.createQuery('Company');
            const aggregateQuery = transaction
              .createAggregationQuery(query)
              .average('rating', 'average rating');
            let result;
            try {
              [result] = await aggregateQuery.run();
            } catch (e) {
              await transaction.rollback();
              throw e;
            }
            assert.deepStrictEqual(result, [{'average rating': 100}]);
            await transaction.commit();
          });
          it('readOnly transaction should see consistent snapshot of database', async () => {
            async function getResults(transaction: Transaction) {
              const query = transaction.createQuery('Company');
              const aggregateQuery = transaction
                .createAggregationQuery(query)
                .count('total');
              let result;
              try {
                [result] = await aggregateQuery.run();
              } catch (e) {
                await transaction.rollback();
                throw e;
              }
              return result;
            }
            const key = datastore.key(['Company', 'Google']);
            const transaction = datastore.transaction({readOnly: true});
            await transaction.run();
            const results = await getResults(transaction);
            assert.deepStrictEqual(results, [{total: 2}]);
            await datastore.save([
              {
                key,
                data: {
                  rating: 100,
                },
              },
            ]);
            const resultsAgain = await getResults(transaction);
            assert.deepStrictEqual(resultsAgain, [{total: 2}]);
            await transaction.commit();
          });
        });

        it('should read in a readOnly transaction', async () => {
          const transaction = datastore.transaction({readOnly: true});
          const key = datastore.key(['Company', 'Google']);
          await transaction.run();
          await transaction.get(key);
        });

        it('should not write in a readOnly transaction', async () => {
          const transaction = datastore.transaction({readOnly: true});
          const key = datastore.key(['Company', 'Google']);
          await transaction.run();
          await transaction.get(key);
          transaction.save({key, data: {}});
          await assert.rejects(transaction.commit());
        });
      });

      describe('indexes', () => {
        // @TODO: Until the protos support creating indexes, these tests depend on
        // the remote state of declared indexes. Could be flaky!
        it('should get all indexes', async () => {
          const [indexes] = await datastore.getIndexes();
          assert.ok(
            indexes.length >= DECLARED_INDEXES.length,
            'has at least the number of indexes per system-test/data/index.yaml'
          );

          // Comparing index.yaml and the actual defined index in Datastore requires
          // assumptions to complete a shape transformation, so let's just see if
          // a returned index has the right shape and not inspect the values.
          const [firstIndex] = indexes;

          assert.ok(firstIndex, 'first index is readable');
          assert.ok(
            firstIndex.metadata!.properties,
            'has properties collection'
          );
          assert.ok(
            firstIndex.metadata!.properties.length,
            'with properties inside'
          );
          assert.ok(firstIndex.metadata!.ancestor, 'has the ancestor property');
        });

        it('should get all indexes as a stream', done => {
          const indexes: Index[] = [];

          datastore
            .getIndexesStream()
            .on('error', done)
            .on('data', index => {
              indexes.push(index);
            })
            .on('end', () => {
              assert(indexes.length >= DECLARED_INDEXES.length);
              done();
            });
        });

        it('should get a specific index', async () => {
          const [indexes] = await datastore.getIndexes();
          const [firstIndex] = indexes;

          const index = datastore.index(firstIndex.id);
          const [metadata] = await index.getMetadata();
          assert.deepStrictEqual(
            metadata,
            firstIndex.metadata,
            'asked index is the same as received index'
          );
        });
      });

      describe('importing and exporting entities', () => {
        const gcs = new Storage();
        const bucket = gcs.bucket('nodejs-datastore-system-tests');
        let currentAttempt = 0;

        const setupForDelay = () => {
          currentAttempt++;
        };
        const delay = async (test: Mocha.Context) => {
          const retries = currentAttempt - 1;
          if (retries === 0) return; // no retry on the first attempt.
          // see: https://cloud.google.com/storage/docs/exponential-backoff:
          const ms = Math.pow(2, retries) * 500 + Math.random() * 1000;
          return new Promise(done => {
            console.info(
              `retrying "${test.test?.title}" after attempt ${currentAttempt} in ${ms}ms`
            );
            setTimeout(done, ms);
          });
        };

        describe('running tests against the delay function', () => {
          let consoleInfoFunction: (message: string) => void;
          let infoLogCount = 0;

          before(async () => {
            infoLogCount = 0;
            currentAttempt = 0;
            consoleInfoFunction = console.info;
          });

          it('should be sure that the delay function emits console info messages', async function () {
            // Override console.info to track the number of times it is called.
            console.info = (message: string) => {
              infoLogCount++;
              consoleInfoFunction(message);
            };
            // Run code that will typically be used in any test with the delay function.
            setupForDelay();
            const numberOfRetries = 2;
            this.retries(numberOfRetries);
            setImmediate(() => delay(this));
            // Throw an error on every retry except the last one
            if (currentAttempt <= numberOfRetries) {
              throw Error(
                'This is not the last retry so throw an error to force the test to run again'
              );
            }
            // Check that the attempt number and the number of times console.info is called is correct.
            assert.strictEqual(infoLogCount, numberOfRetries - 1);
            assert.strictEqual(currentAttempt, numberOfRetries + 1);
          });

          after(async () => {
            console.info = consoleInfoFunction;
          });
        });

        it('should export, then import entities', async function () {
          setupForDelay();
          this.retries(3);
          delay(this);
          const [exportOperation] = await datastore.export({bucket});
          await exportOperation.promise();

          const [files] = await bucket.getFiles({maxResults: 1});
          const [exportedFile] = files;
          assert.ok(exportedFile.name.includes('overall_export_metadata'));

          const [importOperation] = await datastore.import({
            file: exportedFile,
          });

          // This is a >20 minute operation, so we're just going to make sure the
          // right type of operation was started.
          assert.strictEqual(
            (
              importOperation.metadata as google.datastore.admin.v1.IImportEntitiesMetadata
            ).inputUrl,
            `gs://${exportedFile.bucket.name}/${exportedFile.name}`
          );

          await importOperation.cancel();
        });
      });

      describe('using a custom endpoint', () => {
        it('should complete a request when using the default endpoint as a custom endpoint', async () => {
          const customDatastore = new Datastore({
            namespace: `${Date.now()}`,
            apiEndpoint: 'datastore.googleapis.com',
          });
          const query = customDatastore.createQuery('Kind').select('__key__');
          const [entities] = await customDatastore.runQuery(query);
          assert.strictEqual(entities.length, 0);
        });
      });
      describe('using the rest fallback parameter', () => {
        it('should make a get call using rest instead of grpc', async () => {
          const customDatastore = new Datastore({
            fallback: 'rest',
          });
          const postKey = datastore.key(['Post', 'post1']);
          const [entity] = await customDatastore.get(postKey);
          assert.strictEqual(entity, undefined);
        });
      });
    });
  }
);
