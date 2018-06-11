/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var assert = require('assert');
var Buffer = require('safe-buffer').Buffer;
var deepStrictEqual = require('deep-strict-equal');
assert.deepStrictEqual =
  assert.deepStrictEqual ||
  function() {
    return assert(deepStrictEqual.apply(this, arguments));
  };
var extend = require('extend');

var Datastore = require('../');

describe('entity', function() {
  var entity;

  beforeEach(function() {
    delete require.cache[require.resolve('../src/entity.js')];
    entity = require('../src/entity.js');
  });

  describe('KEY_SYMBOL', function() {
    it('should export the symbol', function() {
      assert.strictEqual(entity.KEY_SYMBOL.toString(), 'Symbol(KEY)');
    });
  });

  describe('Double', function() {
    it('should store the value', function() {
      var value = 8.3;

      var double = new entity.Double(value);
      assert.strictEqual(double.value, value);
    });
  });

  describe('isDsDouble', function() {
    it('should correctly identify a Double', function() {
      var double = new entity.Double(0.42);
      assert.strictEqual(entity.isDsDouble(double), true);
    });

    it('should correctly identify a homomorphic non-Double', function() {
      var nonDouble = Object.assign({}, new entity.Double(42));
      assert.strictEqual(entity.isDsDouble(nonDouble), false);
    });

    it('should correctly identify a primitive', function() {
      var primitiveDouble = 0.42;
      assert.strictEqual(entity.isDsDouble(primitiveDouble), false);
    });
  });

  describe('Int', function() {
    it('should store the stringified value', function() {
      var value = 8;

      var int = new entity.Int(value);
      assert.strictEqual(int.value, value.toString());
    });
  });

  describe('isDsInt', function() {
    it('should correctly identify an Int', function() {
      var int = new entity.Int(42);
      assert.strictEqual(entity.isDsInt(int), true);
    });

    it('should correctly identify homomorphic non-Int', function() {
      var nonInt = Object.assign({}, new entity.Int(42));
      assert.strictEqual(entity.isDsInt(nonInt), false);
    });

    it('should correctly identify a primitive', function() {
      var primitiveInt = 42;
      assert.strictEqual(entity.isDsInt(primitiveInt), false);
    });
  });

  describe('GeoPoint', function() {
    it('should store the value', function() {
      var value = {
        latitude: 24,
        longitude: 88,
      };

      var geoPoint = new entity.GeoPoint(value);
      assert.strictEqual(geoPoint.value, value);
    });
  });

  describe('isDsGeoPoint', function() {
    it('should correctly identify a GeoPoint', function() {
      var geoPoint = new entity.GeoPoint({latitude: 24, longitude: 88});
      assert.strictEqual(entity.isDsGeoPoint(geoPoint), true);
    });

    it('should correctly identify a homomorphic non-GeoPoint', function() {
      var geoPoint = new entity.GeoPoint({latitude: 24, longitude: 88});
      var nonGeoPoint = Object.assign({}, geoPoint);
      assert.strictEqual(entity.isDsGeoPoint(nonGeoPoint), false);
    });
  });

  describe('Key', function() {
    it('should assign the namespace', function() {
      var namespace = 'NS';
      var key = new entity.Key({namespace: namespace, path: []});
      assert.strictEqual(key.namespace, namespace);
    });

    it('should assign the kind', function() {
      var kind = 'kind';
      var key = new entity.Key({path: [kind]});
      assert.strictEqual(key.kind, kind);
    });

    it('should assign the ID', function() {
      var id = 11;
      var key = new entity.Key({path: ['Kind', id]});
      assert.strictEqual(key.id, id);
    });

    it('should assign the ID from an Int', function() {
      var id = new entity.Int(11);
      var key = new entity.Key({path: ['Kind', id]});
      assert.strictEqual(key.id, id.value);
    });

    it('should assign the name', function() {
      var name = 'name';
      var key = new entity.Key({path: ['Kind', name]});
      assert.strictEqual(key.name, name);
    });

    it('should assign a parent', function() {
      var key = new entity.Key({path: ['ParentKind', 1, 'Kind', 1]});
      assert(key.parent instanceof entity.Key);
    });

    it('should not modify input path', function() {
      var inputPath = ['ParentKind', 1, 'Kind', 1];
      new entity.Key({path: inputPath});
      assert.deepEqual(inputPath, ['ParentKind', 1, 'Kind', 1]);
    });

    it('should always compute the correct path', function() {
      var key = new entity.Key({path: ['ParentKind', 1, 'Kind', 1]});
      assert.deepEqual(key.path, ['ParentKind', 1, 'Kind', 1]);

      key.parent.kind = 'GrandParentKind';
      key.kind = 'ParentKind';

      assert.deepEqual(key.path, ['GrandParentKind', 1, 'ParentKind', 1]);
    });
  });

  describe('isDsKey', function() {
    it('should correctly identify a Key', function() {
      var key = new entity.Key({path: ['Kind', 1]});
      assert.strictEqual(entity.isDsKey(key), true);
    });

    it('should correctly identify a homomorphic non-Key', function() {
      var notKey = Object.assign({}, new entity.Key({path: ['Kind', 1]}));
      assert.strictEqual(entity.isDsKey(notKey), false);
    });
  });

  describe('decodeValueProto', function() {
    it('should decode arrays', function() {
      var expectedValue = [{}];

      var valueProto = {
        valueType: 'arrayValue',
        arrayValue: {
          values: expectedValue,
        },
      };

      var run = false;

      var decodeValueProto = entity.decodeValueProto;
      entity.decodeValueProto = function(valueProto) {
        if (!run) {
          run = true;
          return decodeValueProto.apply(null, arguments);
        }

        assert.strictEqual(valueProto, expectedValue[0]);
        return valueProto;
      };

      assert.deepEqual(entity.decodeValueProto(valueProto), expectedValue);
    });

    it('should decode blobs', function() {
      var expectedValue = new Buffer('Hi');

      var valueProto = {
        valueType: 'blobValue',
        blobValue: expectedValue.toString('base64'),
      };

      assert.deepEqual(entity.decodeValueProto(valueProto), expectedValue);
    });

    it('should decode null', function() {
      var expectedValue = null;

      var valueProto = {
        valueType: 'nullValue',
        nullValue: 0,
      };

      var decodedValue = entity.decodeValueProto(valueProto);
      assert.deepStrictEqual(decodedValue, expectedValue);
    });

    it('should decode doubles', function() {
      var expectedValue = 8.3;

      var valueProto = {
        valueType: 'doubleValue',
        doubleValue: expectedValue,
      };

      assert.strictEqual(entity.decodeValueProto(valueProto), expectedValue);
    });

    it('should decode ints', function() {
      var expectedValue = 8;

      var valueProto = {
        valueType: 'integerValue',
        integerValue: expectedValue,
      };

      assert.strictEqual(entity.decodeValueProto(valueProto), expectedValue);
    });

    it('should decode entities', function() {
      var expectedValue = {};

      var valueProto = {
        valueType: 'entityValue',
        entityValue: expectedValue,
      };

      entity.entityFromEntityProto = function(entityProto) {
        assert.strictEqual(entityProto, expectedValue);
        return expectedValue;
      };

      assert.strictEqual(entity.decodeValueProto(valueProto), expectedValue);
    });

    it('should decode keys', function() {
      var expectedValue = {};

      var valueProto = {
        valueType: 'keyValue',
        keyValue: expectedValue,
      };

      entity.keyFromKeyProto = function(keyProto) {
        assert.strictEqual(keyProto, expectedValue);
        return expectedValue;
      };

      assert.strictEqual(entity.decodeValueProto(valueProto), expectedValue);
    });

    it('should decode timestamps', function() {
      var date = new Date();

      var seconds = Math.floor(date.getTime() / 1000);
      var ms = date.getMilliseconds();

      var expectedValue = new Date(seconds * 1000 + ms);

      var valueProto = {
        valueType: 'timestampValue',
        timestampValue: {
          seconds: seconds,
          nanos: ms * 1e6,
        },
      };

      assert.deepEqual(entity.decodeValueProto(valueProto), expectedValue);
    });

    it('should return the value if no conversions are necessary', function() {
      var expectedValue = false;

      var valueProto = {
        valueType: 'booleanValue',
        booleanValue: expectedValue,
      };

      assert.strictEqual(entity.decodeValueProto(valueProto), expectedValue);
    });
  });

  describe('encodeValue', function() {
    it('should encode a boolean', function() {
      var value = true;

      var expectedValueProto = {
        booleanValue: value,
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode null', function() {
      var value = null;

      var expectedValueProto = {
        nullValue: 0,
      };

      assert.deepStrictEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode an int', function() {
      var value = 8;

      var expectedValueProto = {
        integerValue: value,
      };

      entity.Int = function(value_) {
        assert.strictEqual(value_, value);
        this.value = value_;
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode an Int object', function() {
      var value = new entity.Int(3);

      var expectedValueProto = {
        integerValue: value.value,
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode a double', function() {
      var value = 8.3;

      var expectedValueProto = {
        doubleValue: value,
      };

      entity.Double = function(value_) {
        assert.strictEqual(value_, value);
        this.value = value_;
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode a Double object', function() {
      var value = new entity.Double(3);

      var expectedValueProto = {
        doubleValue: value.value,
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode a GeoPoint object', function() {
      var value = new entity.GeoPoint();

      var expectedValueProto = {
        geoPointValue: value.value,
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode a date', function() {
      var value = new Date();
      var seconds = value.getTime() / 1000;

      var expectedValueProto = {
        timestampValue: {
          seconds: Math.floor(seconds),
          nanos: value.getMilliseconds() * 1e6,
        },
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode a string', function() {
      var value = 'Hi';

      var expectedValueProto = {
        stringValue: value,
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode a buffer', function() {
      var value = new Buffer('Hi');

      var expectedValueProto = {
        blobValue: value,
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode an array', function() {
      var value = [{}];

      var expectedValueProto = {
        arrayValue: {
          values: value,
        },
      };

      var run = false;

      var encodeValue = entity.encodeValue;
      entity.encodeValue = function(value_) {
        if (!run) {
          run = true;
          return encodeValue.apply(null, arguments);
        }

        assert.strictEqual(value_, value[0]);
        return value_;
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode a Key', function() {
      var value = new entity.Key({
        namespace: 'ns',
        path: ['Kind', 1],
      });

      var expectedValueProto = {
        keyValue: value,
      };

      entity.keyToKeyProto = function(key) {
        assert.strictEqual(key, value);
        return value;
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should encode an object', function() {
      var value = {
        key: 'value',
      };

      var expectedValueProto = {
        entityValue: {
          properties: {
            key: value.key,
          },
        },
      };

      var run = false;

      var encodeValue = entity.encodeValue;
      entity.encodeValue = function(value_) {
        if (!run) {
          run = true;
          return encodeValue.apply(null, arguments);
        }

        assert.strictEqual(value_, value.key);
        return value_;
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should clone an object', function() {
      var value = {
        a: {
          b: {
            obj: true,
          },
        },
      };

      var originalValue = extend(true, {}, value);

      var encodedValue = entity.encodeValue(value);

      assert.deepEqual(value, originalValue);
      assert.notStrictEqual(value, encodedValue);
    });

    it('should encode an empty object', function() {
      var value = {};

      var expectedValueProto = {
        entityValue: {
          properties: {},
        },
      };

      assert.deepEqual(entity.encodeValue(value), expectedValueProto);
    });

    it('should throw if an invalid value was provided', function() {
      assert.throws(function() {
        entity.encodeValue();
      }, /Unsupported field value/);
    });
  });

  describe('entityFromEntityProto', function() {
    it('should convert entity proto to entity', function() {
      var expectedEntity = {
        name: 'Stephen',
      };

      var entityProto = {
        properties: {
          name: {
            valueType: 'stringValue',
            stringValue: expectedEntity.name,
          },
        },
      };

      assert.deepEqual(
        entity.entityFromEntityProto(entityProto),
        expectedEntity
      );
    });
  });

  describe('entityToEntityProto', function() {
    it('should format an entity', function() {
      var value = 'Stephen';

      var entityObject = {
        data: {
          name: value,
        },
      };

      var expectedEntityProto = {
        key: null,
        properties: entityObject.data,
      };

      entity.encodeValue = function(value_) {
        assert.strictEqual(value_, value);
        return value;
      };

      assert.deepEqual(
        entity.entityToEntityProto(entityObject),
        expectedEntityProto
      );
    });

    it('should respect excludeFromIndexes', function() {
      var value1 = 'Stephen';
      var value2 = 'Stephen2';
      var value3 = 'Stephen3';
      var value4 = 'Stephen4';
      var value5 = 'Stephen5';
      var value6 = 'Stephen6';
      var value7 = 'Stephen7';
      var value8 = 'Stephen8';
      var value9 = 'Stephen9';
      var value10 = 'Stephen10';
      var value11 = 'Stephen11';
      var value12 = 'Stephen12';
      var value13 = 'something';
      var value14 = 'else';
      var value15 = 'whatever';

      var entityObject = {
        excludeFromIndexes: [
          'name',
          'entity.name',
          'array[]',
          'array[].name',
          'array[].entity.name',
          'array[].entity.array[].name',
          'array[].array[].entity.name',
          'entityExcluded[].name',
          'primitiveExcluded[]',
          'rules[].requirements[].audiences',
          'nestedArrayVariants[].a[].b',
          'alpha[]',
          'omega',
        ],

        data: {
          name: value1,

          entity: {
            name: value2,
          },

          entityExcluded: [
            value3,
            {
              name: value4,
            },
          ],

          primitiveExcluded: [
            value5,
            {
              name: value6,
            },
          ],

          array: [
            value7,
            {
              name: value8,
            },
            {
              entity: {
                name: value9,
                array: [
                  {
                    name: value10,
                  },
                ],
              },
            },
            {
              array: [
                {
                  entity: {
                    name: value11,
                  },
                },
              ],
            },
          ],

          rules: [
            {
              requirements: [
                {
                  audiences: value12,
                },
              ],
            },
            {
              requirements: null,
            },
          ],

          nestedArrayVariants: [
            {
              a: [{b: value13}, {c: value14}],
            },
            {
              a: null,
            },
            {
              a: [value15],
            },
            {
              a: [{b: ['nasty', 'array']}],
            },
          ],

          alpha: ['beta', 'gamma'],

          omega: ['beta', 'gamma'],
        },
      };

      var expectedEntityProto = {
        key: null,
        properties: {
          name: {
            stringValue: value1,
            excludeFromIndexes: true,
          },
          entity: {
            entityValue: {
              properties: {
                name: {
                  stringValue: value2,
                  excludeFromIndexes: true,
                },
              },
            },
          },
          entityExcluded: {
            arrayValue: {
              values: [
                {
                  stringValue: value3,
                },
                {
                  entityValue: {
                    properties: {
                      name: {
                        stringValue: value4,
                        excludeFromIndexes: true,
                      },
                    },
                  },
                },
              ],
            },
          },
          primitiveExcluded: {
            arrayValue: {
              values: [
                {
                  stringValue: value5,
                  excludeFromIndexes: true,
                },
                {
                  entityValue: {
                    properties: {
                      name: {
                        stringValue: value6,
                      },
                    },
                  },
                  excludeFromIndexes: true,
                },
              ],
            },
          },
          array: {
            arrayValue: {
              values: [
                {
                  stringValue: value7,
                  excludeFromIndexes: true,
                },
                {
                  entityValue: {
                    properties: {
                      name: {
                        stringValue: value8,
                        excludeFromIndexes: true,
                      },
                    },
                  },
                  excludeFromIndexes: true,
                },
                {
                  entityValue: {
                    properties: {
                      entity: {
                        entityValue: {
                          properties: {
                            name: {
                              stringValue: value9,
                              excludeFromIndexes: true,
                            },
                            array: {
                              arrayValue: {
                                values: [
                                  {
                                    entityValue: {
                                      properties: {
                                        name: {
                                          stringValue: value10,
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
                    },
                  },
                  excludeFromIndexes: true,
                },
                {
                  entityValue: {
                    properties: {
                      array: {
                        arrayValue: {
                          values: [
                            {
                              entityValue: {
                                properties: {
                                  entity: {
                                    entityValue: {
                                      properties: {
                                        name: {
                                          stringValue: value11,
                                          excludeFromIndexes: true,
                                        },
                                      },
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
                  excludeFromIndexes: true,
                },
              ],
            },
          },
          rules: {
            arrayValue: {
              values: [
                {
                  entityValue: {
                    properties: {
                      requirements: {
                        arrayValue: {
                          values: [
                            {
                              entityValue: {
                                properties: {
                                  audiences: {
                                    stringValue: value12,
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
                {
                  entityValue: {
                    properties: {
                      requirements: {
                        nullValue: 0,
                      },
                    },
                  },
                },
              ],
            },
          },
          nestedArrayVariants: {
            arrayValue: {
              values: [
                {
                  entityValue: {
                    properties: {
                      a: {
                        arrayValue: {
                          values: [
                            {
                              entityValue: {
                                properties: {
                                  b: {
                                    stringValue: value13,
                                    excludeFromIndexes: true,
                                  },
                                },
                              },
                            },
                            {
                              entityValue: {
                                properties: {
                                  c: {
                                    stringValue: value14,
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
                {
                  entityValue: {
                    properties: {
                      a: {
                        nullValue: 0,
                      },
                    },
                  },
                },
                {
                  entityValue: {
                    properties: {
                      a: {
                        arrayValue: {
                          values: [
                            {
                              stringValue: value15,
                            },
                          ],
                        },
                      },
                    },
                  },
                },
                {
                  entityValue: {
                    properties: {
                      a: {
                        arrayValue: {
                          values: [
                            {
                              entityValue: {
                                properties: {
                                  b: {
                                    // excludeFromIndexes: ['nestedArrayVariants[].a[].b'] does not apply here,
                                    // To exclude this array (= all its elements), we would use ['nestedArrayVariants[].a[].b[]']
                                    arrayValue: {
                                      values: [
                                        {
                                          stringValue: 'nasty',
                                        },
                                        {
                                          stringValue: 'array',
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
              ],
            },
          },
          alpha: {
            // `excludeFromIndexes: ['alpha[]']` results in exclusion of all array elements
            arrayValue: {
              values: [
                {
                  excludeFromIndexes: true,
                  stringValue: 'beta',
                },
                {
                  excludeFromIndexes: true,
                  stringValue: 'gamma',
                },
              ],
            },
          },
          omega: {
            // `excludeFromIndexes: ['omega']` is not applied, because 'omega' is an array.
            arrayValue: {
              values: [
                {
                  stringValue: 'beta',
                },
                {
                  stringValue: 'gamma',
                },
              ],
            },
          },
        },
      };

      assert.deepEqual(
        entity.entityToEntityProto(entityObject),
        expectedEntityProto
      );
    });
  });

  describe('formatArray', function() {
    it('should convert protos to key/data entity array', function() {
      var key = {};

      var entityProto = {
        key: key,
      };

      var results = [
        {
          entity: entityProto,
        },
      ];

      var expectedResults = entityProto;

      entity.keyFromKeyProto = function(key_) {
        assert.strictEqual(key_, key);
        return key;
      };

      entity.entityFromEntityProto = function(entityProto_) {
        assert.strictEqual(entityProto_, entityProto);
        return entityProto;
      };

      var ent = entity.formatArray(results)[0];

      assert.deepEqual(ent, expectedResults);
      assert.strictEqual(ent[entity.KEY_SYMBOL], key);
    });
  });

  describe('isKeyComplete', function() {
    it('should convert key to key proto', function(done) {
      var key = new entity.Key({
        path: ['Kind', 123],
      });

      entity.keyToKeyProto = function(key_) {
        assert.strictEqual(key_, key);
        setImmediate(done);
        return key;
      };

      entity.isKeyComplete(key);
    });

    it('should return true if key has id', function() {
      var key = new entity.Key({
        path: ['Kind', 123],
      });

      assert.strictEqual(entity.isKeyComplete(key), true);
    });

    it('should return true if key has name', function() {
      var key = new entity.Key({
        path: ['Kind', 'name'],
      });

      assert.strictEqual(entity.isKeyComplete(key), true);
    });

    it('should return false if key does not have name or ID', function() {
      var key = new entity.Key({
        path: ['Kind'],
      });

      assert.strictEqual(entity.isKeyComplete(key), false);
    });
  });

  describe('keyFromKeyProto', function() {
    var NAMESPACE = 'Namespace';

    var keyProto = {
      partitionId: {
        namespaceId: NAMESPACE,
        projectId: 'project-id',
      },
      path: [
        {
          idType: 'id',
          kind: 'Kind',
          id: '111',
        },
        {
          idType: 'name',
          kind: 'Kind2',
          name: 'name',
        },
      ],
    };

    it('should set the namespace', function(done) {
      entity.Key = function(keyOptions) {
        assert.strictEqual(keyOptions.namespace, NAMESPACE);
        done();
      };

      entity.keyFromKeyProto(keyProto);
    });

    it('should create a proper Key', function(done) {
      entity.Key = function(keyOptions) {
        assert.deepEqual(keyOptions, {
          namespace: NAMESPACE,
          path: ['Kind', new entity.Int(111), 'Kind2', 'name'],
        });

        done();
      };

      entity.keyFromKeyProto(keyProto);
    });

    it('should return the created Key', function() {
      var expectedValue = {};

      entity.Key = function() {
        return expectedValue;
      };

      assert.strictEqual(entity.keyFromKeyProto(keyProto), expectedValue);
    });

    it('should throw if path is invalid', function(done) {
      var keyProtoInvalid = {
        partitionId: {
          namespaceId: 'Namespace',
          projectId: 'project-id',
        },
        path: [
          {
            kind: 'Kind',
          },
          {
            kind: 'Kind2',
          },
        ],
      };

      try {
        entity.keyFromKeyProto(keyProtoInvalid);
      } catch (e) {
        assert.strictEqual(e.name, 'InvalidKey');
        assert.strictEqual(e.message, 'Ancestor keys require an id or name.');
        done();
      }
    });
  });

  describe('keyToKeyProto', function() {
    it('should handle hierarchical key definitions', function() {
      var key = new entity.Key({
        path: ['Kind1', 1, 'Kind2', 'name', 'Kind3', new entity.Int(3)],
      });

      var keyProto = entity.keyToKeyProto(key);

      assert.strictEqual(keyProto.partitionId, undefined);

      assert.strictEqual(keyProto.path[0].kind, 'Kind1');
      assert.strictEqual(keyProto.path[0].id, 1);
      assert.strictEqual(keyProto.path[0].name, undefined);

      assert.strictEqual(keyProto.path[1].kind, 'Kind2');
      assert.strictEqual(keyProto.path[1].id, undefined);
      assert.strictEqual(keyProto.path[1].name, 'name');

      assert.strictEqual(keyProto.path[2].kind, 'Kind3');
      assert.strictEqual(keyProto.path[2].id, new entity.Int(3).value);
      assert.strictEqual(keyProto.path[2].name, undefined);
    });

    it('should detect the namespace of the hierarchical keys', function() {
      var key = new entity.Key({
        namespace: 'Namespace',
        path: ['Kind1', 1, 'Kind2', 'name'],
      });

      var keyProto = entity.keyToKeyProto(key);

      assert.strictEqual(keyProto.partitionId.namespaceId, 'Namespace');

      assert.strictEqual(keyProto.path[0].kind, 'Kind1');
      assert.strictEqual(keyProto.path[0].id, 1);
      assert.strictEqual(keyProto.path[0].name, undefined);

      assert.strictEqual(keyProto.path[1].kind, 'Kind2');
      assert.strictEqual(keyProto.path[1].id, undefined);
      assert.strictEqual(keyProto.path[1].name, 'name');
    });

    it('should handle incomplete keys with & without namespaces', function() {
      var incompleteKey = new entity.Key({
        path: ['Kind'],
      });

      var incompleteKeyWithNs = new entity.Key({
        namespace: 'Namespace',
        path: ['Kind'],
      });

      var keyProto = entity.keyToKeyProto(incompleteKey);
      var keyProtoWithNs = entity.keyToKeyProto(incompleteKeyWithNs);

      assert.strictEqual(keyProto.partitionId, undefined);
      assert.strictEqual(keyProto.path[0].kind, 'Kind');
      assert.strictEqual(keyProto.path[0].id, undefined);
      assert.strictEqual(keyProto.path[0].name, undefined);

      assert.strictEqual(keyProtoWithNs.partitionId.namespaceId, 'Namespace');
      assert.strictEqual(keyProtoWithNs.path[0].kind, 'Kind');
      assert.strictEqual(keyProtoWithNs.path[0].id, undefined);
      assert.strictEqual(keyProtoWithNs.path[0].name, undefined);
    });

    it('should throw if key contains 0 items', function(done) {
      var key = new entity.Key({
        path: [],
      });

      try {
        entity.keyToKeyProto(key);
      } catch (e) {
        assert.strictEqual(e.name, 'InvalidKey');
        assert.strictEqual(e.message, 'A key should contain at least a kind.');
        done();
      }
    });

    it('should throw if key path contains null ids', function(done) {
      var key = new entity.Key({
        namespace: 'Namespace',
        path: ['Kind1', null, 'Company'],
      });

      try {
        entity.keyToKeyProto(key);
      } catch (e) {
        assert.strictEqual(e.name, 'InvalidKey');
        assert.strictEqual(e.message, 'Ancestor keys require an id or name.');
        done();
      }
    });

    it('should not throw if key is incomplete', function() {
      var key = new entity.Key({
        namespace: 'Namespace',
        path: ['Kind1', 123, 'Company', null],
      });

      assert.doesNotThrow(function() {
        entity.keyToKeyProto(key);
      });
    });
  });

  describe('queryToQueryProto', function() {
    var queryProto = {
      distinctOn: [
        {
          name: 'name',
        },
      ],
      kind: [
        {
          name: 'Kind1',
        },
      ],
      order: [
        {
          property: {
            name: 'name',
          },
          direction: 'ASCENDING',
        },
      ],
      projection: [
        {
          property: {
            name: 'name',
          },
        },
      ],
      endCursor: 'end',
      limit: {
        value: 1,
      },
      offset: 1,
      startCursor: 'start',
      filter: {
        compositeFilter: {
          filters: [
            {
              propertyFilter: {
                property: {
                  name: 'name',
                },
                op: 'EQUAL',
                value: {
                  stringValue: 'John',
                },
              },
            },
            {
              propertyFilter: {
                property: {
                  name: '__key__',
                },
                op: 'HAS_ANCESTOR',
                value: {
                  keyValue: {
                    path: [
                      {
                        kind: 'Kind2',
                        name: 'somename',
                      },
                    ],
                  },
                },
              },
            },
          ],
          op: 'AND',
        },
      },
    };

    it('should support all configurations of a query', function() {
      var ancestorKey = new entity.Key({
        path: ['Kind2', 'somename'],
      });

      var ds = new Datastore({projectId: 'project-id'});

      var query = ds
        .createQuery('Kind1')
        .filter('name', 'John')
        .start('start')
        .end('end')
        .groupBy(['name'])
        .order('name')
        .select('name')
        .limit(1)
        .offset(1)
        .hasAncestor(ancestorKey);

      assert.deepEqual(entity.queryToQueryProto(query), queryProto);
    });

    it('should handle buffer start and end values', function() {
      var ds = new Datastore({projectId: 'project-id'});
      var startVal = new Buffer('start');
      var endVal = new Buffer('end');

      var query = ds
        .createQuery('Kind1')
        .start(startVal)
        .end(endVal);

      var queryProto = entity.queryToQueryProto(query);
      assert.strictEqual(queryProto.endCursor, endVal);
      assert.strictEqual(queryProto.startCursor, startVal);
    });
  });
});
