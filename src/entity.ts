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

import * as arrify from 'arrify';
import * as extend from 'extend';
import * as is from 'is';
import {Query, QueryProto} from './query';

// tslint:disable-next-line no-namespace
export namespace entity {
  export interface InvalidKeyErrorOptions {
    code: string;
  }

  export class InvalidKeyError extends Error {
    constructor(opts: InvalidKeyErrorOptions) {
      const errorMessages = {
        MISSING_KIND: 'A key should contain at least a kind.',
        MISSING_ANCESTOR_ID: 'Ancestor keys require an id or name.',
      } as {[index: string]: string};
      super(errorMessages[opts.code]);
      this.name = 'InvalidKey';
    }
  }

  /**
   * A symbol to access the Key object from an entity object.
   *
   * @type {symbol}
   * @private
   */
  export const KEY_SYMBOL = Symbol('KEY');

  /**
   * Build a Datastore Double object. For long doubles, a string can be
   * provided.
   *
   * @class
   * @param {number} value The double value.
   *
   * @example
   * const {Datastore} = require('@google-cloud/datastore');
   * const datastore = new Datastore();
   * const aDouble = datastore.double(7.3);
   */
  export class Double {
    value: number;
    constructor(value: number) {
      /**
       * @name Double#value
       * @type {number}
       */
      this.value = value;
    }
  }

  /**
   * Check if something is a Datastore Double object.
   *
   * @private
   * @param {*} value
   * @returns {boolean}
   */
  export function isDsDouble(value?: {}) {
    return value instanceof entity.Double;
  }

  /**
   * Build a Datastore Int object. For long integers, a string can be provided.
   *
   * @class
   * @param {number|string} value The integer value.
   *
   * @example
   * const {Datastore} = require('@google-cloud/datastore');
   * const datastore = new Datastore();
   * const anInt = datastore.int(7);
   */
  export class Int {
    value: string;
    constructor(value: number|string) {
      /**
       * @name Int#value
       * @type {string}
       */
      this.value = value.toString();
    }
  }

  /**
   * Check if something is a Datastore Int object.
   *
   * @private
   * @param {*} value
   * @returns {boolean}
   */
  export function isDsInt(value?: {}) {
    return value instanceof entity.Int;
  }

  export interface Coordinates {
    latitude: number;
    longitude: number;
  }

  /**
   * Build a Datastore Geo Point object.
   *
   * @class
   * @param {object} coordinates Coordinate value.
   * @param {number} coordinates.latitude Latitudinal value.
   * @param {number} coordinates.longitude Longitudinal value.
   *
   * @example
   * const {Datastore} = require('@google-cloud/datastore');
   * const datastore = new Datastore();
   * const coordinates = {
   *   latitude: 40.6894,
   *   longitude: -74.0447
   * };
   *
   * const geoPoint = datastore.geoPoint(coordinates);
   */
  export class GeoPoint {
    value: Coordinates;
    constructor(coordinates: Coordinates) {
      /**
       * Coordinate value.
       *
       * @name GeoPoint#coordinates
       * @type {object}
       * @property {number} latitude Latitudinal value.
       * @property {number} longitude Longitudinal value.
       */
      this.value = coordinates;
    }
  }

  /**
   * Check if something is a Datastore Geo Point object.
   *
   * @private
   * @param {*} value
   * @returns {boolean}
   */
  export function isDsGeoPoint(value?: {}) {
    return value instanceof entity.GeoPoint;
  }

  export interface KeyOptions {
    namespace?: string;
    path: Array<string|number>;
  }

  /**
   * Build a Datastore Key object.
   *
   * @class
   * @param {object} options Configuration object.
   * @param {array} options.path Key path.
   * @param {string} [options.namespace] Optional namespace.
   *
   * @example
   * <caption>Create an incomplete key with a kind value of `Company`.</caption>
   * const {Datastore} = require('@google-cloud/datastore');
   * const datastore = new Datastore();
   * const key = datastore.key('Company');
   *
   * @example
   * <caption>Create a complete key with a kind value of `Company` and id
   * `123`.</caption> const {Datastore} = require('@google-cloud/datastore');
   * const datastore = new Datastore();
   * const key = datastore.key(['Company', 123]);
   *
   * @example
   * <caption>If the ID integer is outside the bounds of a JavaScript Number
   * object, create an Int.</caption> const {Datastore} =
   * require('@google-cloud/datastore'); const datastore = new Datastore();
   * const key = datastore.key([
   *   'Company',
   *   datastore.int('100000000000001234')
   * ]);
   *
   * @example
   * const {Datastore} = require('@google-cloud/datastore');
   * const datastore = new Datastore();
   * // Create a complete key with a kind value of `Company` and name `Google`.
   * // Note: `id` is used for numeric identifiers and `name` is used otherwise.
   * const key = datastore.key(['Company', 'Google']);
   *
   * @example
   * <caption>Create a complete key from a provided namespace and
   * path.</caption> const {Datastore} = require('@google-cloud/datastore');
   * const datastore = new Datastore();
   * const key = datastore.key({
   *   namespace: 'My-NS',
   *   path: ['Company', 123]
   * });
   */
  export class Key {
    namespace?: string;
    id?: string;
    name?: string;
    kind: string;
    parent?: Key;
    path!: Array<string|number>;

    constructor(options: KeyOptions) {
      /**
       * @name Key#namespace
       * @type {string}
       */
      this.namespace = options.namespace;

      options.path = [].slice.call(options.path);

      if (options.path.length % 2 === 0) {
        const identifier = options.path.pop();

        if (is.number(identifier) || isDsInt(identifier)) {
          this.id = ((identifier as {} as Int).value || identifier) as string;
        } else if (is.string(identifier)) {
          this.name = identifier as string;
        }
      }

      this.kind = options.path.pop() as string;

      if (options.path.length > 0) {
        this.parent = new Key(options);
      }

      // `path` is computed on demand to consider any changes that may have been
      // made to the key.
      /**
       * @name Key#path
       * @type {array}
       */
      Object.defineProperty(this, 'path', {
        enumerable: true,
        get() {
          return arrify(this.parent && this.parent.path).concat([
            this.kind,
            this.name || this.id,
          ]);
        },
      });
    }
  }

  /**
   * Check if something is a Datastore Key object.
   *
   * @private
   * @param {*} value
   * @returns {boolean}
   */
  export function isDsKey(value?: {}) {
    return value instanceof entity.Key;
  }

  /**
   * Convert a protobuf Value message to its native value.
   *
   * @private
   * @param {object} valueProto The protobuf Value message to convert.
   * @returns {*}
   *
   * @example
   * decodeValueProto({
   *   booleanValue: false
   * });
   * // false
   *
   * decodeValueProto({
   *   stringValue: 'Hi'
   * });
   * // 'Hi'
   *
   * decodeValueProto({
   *   blobValue: Buffer.from('68656c6c6f')
   * });
   * // <Buffer 68 65 6c 6c 6f>
   */
  export function decodeValueProto(valueProto: ValueProto) {
    const valueType = valueProto.valueType!;
    const value = valueProto[valueType];

    switch (valueType) {
      case 'arrayValue': {
        return value.values.map(entity.decodeValueProto);
      }

      case 'blobValue': {
        return Buffer.from(value, 'base64');
      }

      case 'nullValue': {
        return null;
      }

      case 'doubleValue': {
        return Number(value);
      }

      case 'integerValue': {
        return Number(value);
      }

      case 'entityValue': {
        return entity.entityFromEntityProto(value);
      }

      case 'keyValue': {
        return entity.keyFromKeyProto(value);
      }

      case 'timestampValue': {
        const milliseconds = Number(value.nanos) / 1e6;
        return new Date(Number(value.seconds) * 1000 + milliseconds);
      }

      default: { return value; }
    }
  }

  /**
   * Convert any native value to a protobuf Value message object.
   *
   * @private
   * @param {*} value Native value.
   * @returns {object}
   *
   * @example
   * encodeValue('Hi');
   * // {
   * //   stringValue: 'Hi'
   * // }
   */
  // tslint:disable-next-line no-any
  export function encodeValue(value?: any): ValueProto {
    const valueProto: ValueProto = {};

    if (is.boolean(value)) {
      valueProto.booleanValue = value;
      return valueProto;
    }

    if (is.null(value)) {
      valueProto.nullValue = 0;
      return valueProto;
    }

    if (typeof value === 'number') {
      if (value % 1 === 0) {
        value = new entity.Int(value);
      } else {
        value = new entity.Double(value);
      }
    }

    if (isDsInt(value)) {
      valueProto.integerValue = (value as Int).value;
      return valueProto;
    }

    if (isDsDouble(value)) {
      valueProto.doubleValue = (value as Double).value;
      return valueProto;
    }

    if (isDsGeoPoint(value)) {
      valueProto.geoPointValue = (value as GeoPoint).value;
      return valueProto;
    }

    if (value instanceof Date) {
      const seconds = value.getTime() / 1000;

      valueProto.timestampValue = {
        seconds: Math.floor(seconds),
        nanos: value.getMilliseconds() * 1e6,
      };

      return valueProto;
    }

    if (is.string(value)) {
      valueProto.stringValue = value;
      return valueProto;
    }

    if (value instanceof Buffer) {
      valueProto.blobValue = value;
      return valueProto;
    }

    if (Array.isArray(value)) {
      valueProto.arrayValue = {
        values: value.map(entity.encodeValue),
      };
      return valueProto;
    }

    if (isDsKey(value)) {
      valueProto.keyValue = entity.keyToKeyProto(value);
      return valueProto;
    }

    if (is.object(value)) {
      if (!is.empty(value)) {
        value = extend(true, {}, value);

        for (const prop in value) {
          if (value.hasOwnProperty(prop)) {
            value[prop] = entity.encodeValue(value[prop]);
          }
        }
      }

      valueProto.entityValue = {
        properties: value,
      };

      return valueProto;
    }

    throw new Error('Unsupported field value, ' + value + ', was provided.');
  }

  /**
   * Convert any entity protocol to a plain object.
   *
   * @todo Use registered metadata if provided.
   *
   * @private
   * @param {object} entityProto The protocol entity object to convert.
   * @returns {object}
   *
   * @example
   * entityFromEntityProto({
   *   properties: {
   *     map: {
   *       name: {
   *         value: {
   *           valueType: 'stringValue',
   *           stringValue: 'Stephen'
   *         }
   *       }
   *     }
   *   }
   * });
   * // {
   * //   name: 'Stephen'
   * // }
   */
  // tslint:disable-next-line no-any
  export function entityFromEntityProto(entityProto: EntityProto): any {
    // tslint:disable-next-line no-any
    const entityObject: any = {};
    const properties = entityProto.properties || {};

    // tslint:disable-next-line forin
    for (const property in properties) {
      const value = properties[property];
      entityObject[property] = entity.decodeValueProto(value);
    }

    return entityObject;
  }

  /**
   * Convert an entity object to an entity protocol object.
   *
   * @private
   * @param {object} entityObject The entity object to convert.
   * @returns {object}
   *
   * @example
   * entityToEntityProto({
   *   excludeFromIndexes: [
   *     'name'
   *   ],
   *   data: {
   *     name: 'Burcu',
   *     legit: true
   *   }
   * });
   * // {
   * //   key: null,
   * //   properties: {
   * //     name: {
   * //       stringValue: 'Burcu'
   * //       excludeFromIndexes: true
   * //     },
   * //     legit: {
   * //       booleanValue: true
   * //     }
   * //   }
   * // }
   */
  export function entityToEntityProto(entityObject: Entity): EntityProto {
    const properties = entityObject.data;
    const excludeFromIndexes = entityObject.excludeFromIndexes;

    const entityProto: EntityProto = {
      key: null,

      properties: Object.keys(properties)
                      .reduce(
                          (encoded, key) => {
                            encoded[key] = entity.encodeValue(properties[key]);
                            return encoded;
                          },
                          // tslint:disable-next-line no-any
                          {} as any),
    };

    if (excludeFromIndexes && excludeFromIndexes.length > 0) {
      excludeFromIndexes.forEach(excludePath => {
        excludePathFromEntity(entityProto, excludePath);
      });
    }

    return entityProto;

    function excludePathFromEntity(entity: EntityProto, path: string) {
      const arrayIndex = path.indexOf('[]');
      const entityIndex = path.indexOf('.');

      const hasArrayPath = arrayIndex > -1;
      const hasEntityPath = entityIndex > -1;

      if (!hasArrayPath && !hasEntityPath) {
        // This is the path end node. Traversal ends here in either case.
        if (entity.properties) {
          if (entity.properties[path] &&
              // array properties should be excluded with [] syntax:
              !entity.properties[path].arrayValue) {
            // This is the property to exclude!
            entity.properties[path].excludeFromIndexes = true;
          }
        } else if (!path) {
          // This is a primitive or entity root that should be excluded.
          entity.excludeFromIndexes = true;
        }
        return;
      }

      let delimiterIndex;
      if (hasArrayPath && hasEntityPath) {
        delimiterIndex = Math.min(arrayIndex, entityIndex);
      } else {
        delimiterIndex = Math.max(arrayIndex, entityIndex);
      }

      const firstPathPartIsArray = delimiterIndex === arrayIndex;
      const firstPathPartIsEntity = delimiterIndex === entityIndex;

      const delimiter = firstPathPartIsArray ? '[]' : '.';
      const splitPath = path.split(delimiter);
      const firstPathPart = splitPath.shift()!;
      const remainderPath = splitPath.join(delimiter).replace(/^(\.|\[\])/, '');

      if (!(entity.properties && entity.properties[firstPathPart])) {
        // Either a primitive or an entity for which this path doesn't apply.
        return;
      }

      if (firstPathPartIsArray &&
          // check also if the property in question is actually an array value.
          entity.properties[firstPathPart].arrayValue) {
        const array = entity.properties[firstPathPart].arrayValue;
        // tslint:disable-next-line no-any
        array.values.forEach((value: any) => {
          if (remainderPath === '') {
            // We want to exclude *this* array property, which is
            // equivalent with excluding all its values
            // (including entity values at their roots):
            excludePathFromEntity(
                value,
                remainderPath  // === ''
            );
          } else {
            // Path traversal continues at value.entityValue,
            // if it is an entity, or must end at value.
            excludePathFromEntity(
                value.entityValue || value,
                remainderPath  // !== ''
            );
          }
        });
      } else if (firstPathPartIsEntity) {
        const parentEntity = entity.properties[firstPathPart].entityValue;
        excludePathFromEntity(parentEntity, remainderPath);
      }
    }
  }

  /**
   * Convert an API response array to a qualified Key and data object.
   *
   * @private
   * @param {object[]} results The response array.
   * @param {object} results.entity An entity object.
   * @param {object} results.entity.key The entity's key.
   * @returns {object[]}
   *
   * @example
   * request_('runQuery', {}, (err, response) => {
   *   const entityObjects = formatArray(response.batch.entityResults);
   *   // {
   *   //   key: {},
   *   //   data: {
   *   //     fieldName: 'value'
   *   //   }
   *   // }
   *   //
   * });
   */
  export function formatArray(results: ResponseResult[]) {
    return results.map(result => {
      const ent = entity.entityFromEntityProto(result.entity);
      ent[entity.KEY_SYMBOL] = entity.keyFromKeyProto(result.entity.key!);
      return ent;
    });
  }

  /**
   * Check if a key is complete.
   *
   * @private
   * @param {Key} key The Key object.
   * @returns {boolean}
   *
   * @example
   * isKeyComplete(new Key(['Company', 'Google'])); // true
   * isKeyComplete(new Key('Company')); // false
   */
  export function isKeyComplete(key: Key) {
    const lastPathElement = entity.keyToKeyProto(key).path.pop()!;
    return !!(lastPathElement.id || lastPathElement.name);
  }

  /**
   * Convert a key protocol object to a Key object.
   *
   * @private
   * @param {object} keyProto The key protocol object to convert.
   * @returns {Key}
   *
   * @example
   * const key = keyFromKeyProto({
   *   partitionId: {
   *     projectId: 'project-id',
   *     namespaceId: ''
   *   },
   *   path: [
   *     {
   *       kind: 'Kind',
   *       id: '4790047639339008'
   *     }
   *   ]
   * });
   */
  export function keyFromKeyProto(keyProto: KeyProto): Key {
    // tslint:disable-next-line no-any
    const keyOptions: any = {
      path: [],
    };

    if (keyProto.partitionId && keyProto.partitionId.namespaceId) {
      keyOptions.namespace = keyProto.partitionId.namespaceId;
    }

    keyProto.path.forEach((path, index) => {
      keyOptions.path.push(path.kind);

      let id = path[path.idType!];

      if (path.idType === 'id') {
        id = new entity.Int(id);
      }

      if (is.defined(id)) {
        keyOptions.path.push(id);
      } else if (index < keyProto.path.length - 1) {
        throw new InvalidKeyError({
          code: 'MISSING_ANCESTOR_ID',
        });
      }
    });

    return new entity.Key(keyOptions);
  }

  /**
   * Convert a Key object to a key protocol object.
   *
   * @private
   * @param {Key} key The Key object to convert.
   * @returns {object}
   *
   * @example
   * const keyProto = keyToKeyProto(new Key(['Company', 1]));
   * // {
   * //   path: [
   * //     {
   * //       kind: 'Company',
   * //       id: 1
   * //     }
   * //   ]
   * // }
   */
  export function keyToKeyProto(key: Key): KeyProto {
    if (is.undefined(key.kind)) {
      throw new InvalidKeyError({
        code: 'MISSING_KIND',
      });
    }

    // tslint:disable-next-line no-any
    const keyProto: KeyProto = {
      path: [],
    };

    if (key.namespace) {
      keyProto.partitionId = {
        namespaceId: key.namespace,
      };
    }

    let numKeysWalked = 0;

    // Reverse-iterate over the Key objects.
    do {
      if (numKeysWalked > 0 && is.undefined(key.id) && is.undefined(key.name)) {
        // This isn't just an incomplete key. An ancestor key is incomplete.
        throw new InvalidKeyError({
          code: 'MISSING_ANCESTOR_ID',
        });
      }

      // tslint:disable-next-line no-any
      const pathElement: any = {
        kind: key.kind,
      };

      if (is.defined(key.id)) {
        pathElement.id = key.id;
      }

      if (is.defined(key.name)) {
        pathElement.name = key.name;
      }

      keyProto.path.unshift(pathElement);
      // tslint:disable-next-line no-conditional-assignment
    } while ((key = key.parent!) && ++numKeysWalked);

    return keyProto;
  }

  /**
   * Convert a query object to a query protocol object.
   *
   * @private
   * @param {object} q The query object to convert.
   * @returns {object}
   *
   * @example
   * queryToQueryProto({
   *   namespace: '',
   *   kinds: [
   *     'Kind'
   *   ],
   *   filters: [],
   *   orders: [],
   *   groupByVal: [],
   *   selectVal: [],
   *   startVal: null,
   *   endVal: null,
   *   limitVal: -1,
   *   offsetVal: -1
   * });
   * // {
   * //   projection: [],
   * //   kinds: [
   * //     {
   * //       name: 'Kind'
   * //     }
   * //   ],
   * //   order: [],
   * //   groupBy: []
   * // }
   */
  export function queryToQueryProto(query: Query): QueryProto {
    const OP_TO_OPERATOR = {
      '=': 'EQUAL',
      '>': 'GREATER_THAN',
      '>=': 'GREATER_THAN_OR_EQUAL',
      '<': 'LESS_THAN',
      '<=': 'LESS_THAN_OR_EQUAL',
      HAS_ANCESTOR: 'HAS_ANCESTOR',
    };

    const SIGN_TO_ORDER = {
      '-': 'DESCENDING',
      '+': 'ASCENDING',
    };

    const queryProto: QueryProto = {
      distinctOn: query.groupByVal.map(groupBy => {
        return {
          name: groupBy,
        };
      }),

      kind: query.kinds.map(kind => {
        return {
          name: kind,
        };
      }),

      order: query.orders.map(order => {
        return {
          property: {
            name: order.name,
          },
          direction: SIGN_TO_ORDER[order.sign],
        };
      }),

      projection: query.selectVal.map(select => {
        return {
          property: {
            name: select,
          },
        };
      }),
    };

    if (query.endVal) {
      queryProto.endCursor = query.endVal;
    }

    if (query.limitVal > 0) {
      queryProto.limit = {
        value: query.limitVal,
      };
    }

    if (query.offsetVal > 0) {
      queryProto.offset = query.offsetVal;
    }

    if (query.startVal) {
      queryProto.startCursor = query.startVal;
    }

    if (query.filters.length > 0) {
      const filters = query.filters.map(filter => {
        // tslint:disable-next-line no-any
        let value: any = {};

        if (filter.name === '__key__') {
          value.keyValue = entity.keyToKeyProto(filter.val);
        } else {
          value = entity.encodeValue(filter.val);
        }

        return {
          propertyFilter: {
            property: {
              name: filter.name,
            },
            op: OP_TO_OPERATOR[filter.op],
            value,
          },
        };
      });

      queryProto.filter = {
        compositeFilter: {
          filters,
          op: 'AND',
        },
      };
    }

    return queryProto;
  }
}

export interface ValueProto {
  // tslint:disable-next-line no-any
  [index: string]: any;
  valueType?: string;
  values?: ValueProto[];
  // tslint:disable-next-line no-any
  value?: any;
}

export interface EntityProto {
  key: KeyProto|null;
  // tslint:disable-next-line no-any
  properties: any;
  excludeFromIndexes?: boolean;
}

// tslint:disable-next-line no-any
export type Entity = any;

export interface KeyProto {
  path: Array<{
    // tslint:disable-next-line no-any
    [index: string]: any; id: string; name: string;
    kind?: string;
    idType?: string;
  }>;
  partitionId?: {namespaceId: {}};
}

export interface ResponseResult {
  entity: EntityProto;
}
