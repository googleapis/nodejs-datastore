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
import {beforeEach, describe, it} from 'mocha';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {Query} = require('../src/query');
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {Datastore} from '../src';
import {AggregateField, AggregateQuery} from '../src/aggregate';
import {PropertyFilter, Filter, OR} from '../src/filter';

describe('Query', () => {
  const SCOPE = {} as Datastore;
  const NAMESPACE = 'Namespace';
  const KINDS = ['Kind'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  beforeEach(() => {
    query = new Query(SCOPE, NAMESPACE, KINDS);
  });

  describe('instantiation', () => {
    it('should localize the scope', () => {
      assert.strictEqual(query.scope, SCOPE);
    });

    it('should localize the namespace', () => {
      assert.strictEqual(query.namespace, NAMESPACE);
    });

    it('should localize the kind', () => {
      assert.strictEqual(query.kinds, KINDS);
    });

    it('should use null for all falsy namespace values', () => {
      [
        new Query(SCOPE, '', KINDS),
        new Query(SCOPE, null, KINDS),
        new Query(SCOPE, undefined, KINDS),
        new Query(SCOPE, 0 as {} as string, KINDS),
        new Query(SCOPE, KINDS),
      ].forEach(query => {
        assert.strictEqual(query.namespace, null);
      });
    });

    it('should create a query with a count aggregation', () => {
      const query = new Query(['kind1']);
      const firstAggregation = AggregateField.count().alias('total');
      const secondAggregation = AggregateField.count().alias('total2');
      const aggregate = new AggregateQuery(query).addAggregations([
        firstAggregation,
        secondAggregation,
      ]);
      const aggregate2 = new AggregateQuery(query)
        .count('total')
        .count('total2');
      assert.deepStrictEqual(aggregate.aggregations, aggregate2.aggregations);
      assert.deepStrictEqual(aggregate.aggregations, [
        firstAggregation,
        secondAggregation,
      ]);
    });
  });

  describe('filter', () => {
    it('should support filtering', () => {
      const now = new Date();
      const query = new Query(['kind1']).filter('date', '<=', now);
      const filter = query.filters[0];

      assert.strictEqual(filter.name, 'date');
      assert.strictEqual(filter.op, '<=');
      assert.strictEqual(filter.val, now);
    });

    it('should recognize all the different operators', () => {
      const now = new Date();
      const query = new Query(['kind1'])
        .filter('date', '<=', now)
        .filter('name', '=', 'Title')
        .filter('count', '>', 20)
        .filter('size', '<', 10)
        .filter('something', '>=', 11)
        .filter('neProperty', '!=', 12)
        .filter('inProperty', 'IN', 13)
        .filter('notInProperty', 'NOT_IN', 14);

      assert.strictEqual(query.filters[0].name, 'date');
      assert.strictEqual(query.filters[0].op, '<=');
      assert.strictEqual(query.filters[0].val, now);

      assert.strictEqual(query.filters[1].name, 'name');
      assert.strictEqual(query.filters[1].op, '=');
      assert.strictEqual(query.filters[1].val, 'Title');

      assert.strictEqual(query.filters[2].name, 'count');
      assert.strictEqual(query.filters[2].op, '>');
      assert.strictEqual(query.filters[2].val, 20);

      assert.strictEqual(query.filters[3].name, 'size');
      assert.strictEqual(query.filters[3].op, '<');
      assert.strictEqual(query.filters[3].val, 10);

      assert.strictEqual(query.filters[4].name, 'something');
      assert.strictEqual(query.filters[4].op, '>=');
      assert.strictEqual(query.filters[4].val, 11);

      assert.strictEqual(query.filters[5].name, 'neProperty');
      assert.strictEqual(query.filters[5].op, '!=');
      assert.strictEqual(query.filters[5].val, 12);

      assert.strictEqual(query.filters[6].name, 'inProperty');
      assert.strictEqual(query.filters[6].op, 'IN');
      assert.strictEqual(query.filters[6].val, 13);

      assert.strictEqual(query.filters[7].name, 'notInProperty');
      assert.strictEqual(query.filters[7].op, 'NOT_IN');
      assert.strictEqual(query.filters[7].val, 14);
    });

    it('should remove any whitespace surrounding the filter name', () => {
      const query = new Query(['kind1']).filter('   count    ', '>', 123);

      assert.strictEqual(query.filters[0].name, 'count');
    });

    it('should remove any whitespace surrounding the operator', () => {
      const query = new Query(['kind1']).filter(
        'count',
        '       <        ',
        123
      );

      assert.strictEqual(query.filters[0].op, '<');
    });

    it('should return the query instance', () => {
      const query = new Query(['kind1']);
      const nextQuery = query.filter('count', '<', 5);

      assert.strictEqual(query, nextQuery);
    });

    it('should default the operator to "="', () => {
      const query = new Query(['kind1']).filter('name', 'Stephen');
      const filter = query.filters[0];

      assert.strictEqual(filter.name, 'name');
      assert.strictEqual(filter.op, '=');
      assert.strictEqual(filter.val, 'Stephen');
    });
  });

  describe('filter with Filter class', () => {
    it('should support filter with Filter', () => {
      const now = new Date();
      const query = new Query(['kind1']).filter(
        new PropertyFilter('date', '<=', now)
      );
      const filter = query.newFilters[0];

      assert.strictEqual(filter.name, 'date');
      assert.strictEqual(filter.op, '<=');
      assert.strictEqual(filter.val, now);
    });
    it('should support filter with OR', () => {
      const now = new Date();
      const query = new Query(['kind1']).filter(
        OR([
          new PropertyFilter('date', '<=', now),
          new PropertyFilter('name', '=', 'Stephen'),
        ])
      );
      const filter = query.newFilters[0];
      assert.strictEqual(filter.op, 'OR');
      // Check filters
      const filters = filter.filters;
      assert.strictEqual(filters.length, 2);
      assert.strictEqual(filters[0].name, 'date');
      assert.strictEqual(filters[0].op, '<=');
      assert.strictEqual(filters[0].val, now);
      assert.strictEqual(filters[1].name, 'name');
      assert.strictEqual(filters[1].op, '=');
      assert.strictEqual(filters[1].val, 'Stephen');
    });
    it('should accept null as value', () => {
      assert.strictEqual(
        new Query(['kind1']).filter('status', null).filters.pop()?.val,
        null
      );
      assert.strictEqual(
        new Query(['kind1']).filter('status', '=', null).filters.pop()?.val,
        null
      );
    });
  });

  describe('hasAncestor', () => {
    it('should support ancestor filtering', () => {
      const query = new Query(['kind1']).hasAncestor(['kind2', 123]);

      assert.strictEqual(query.filters[0].name, '__key__');
      assert.strictEqual(query.filters[0].op, 'HAS_ANCESTOR');
      assert.deepStrictEqual(query.filters[0].val, ['kind2', 123]);
    });

    it('should return the query instance', () => {
      const query = new Query(['kind1']);
      const nextQuery = query.hasAncestor(['kind2', 123]);

      assert.strictEqual(query, nextQuery);
    });
  });

  describe('order', () => {
    it('should default ordering to ascending', () => {
      const query = new Query(['kind1']).order('name');

      assert.strictEqual(query.orders[0].name, 'name');
      assert.strictEqual(query.orders[0].sign, '+');
    });

    it('should support ascending order', () => {
      const query = new Query(['kind1']).order('name');

      assert.strictEqual(query.orders[0].name, 'name');
      assert.strictEqual(query.orders[0].sign, '+');
    });

    it('should support descending order', () => {
      const query = new Query(['kind1']).order('count', {descending: true});

      assert.strictEqual(query.orders[0].name, 'count');
      assert.strictEqual(query.orders[0].sign, '-');
    });

    it('should support both ascending and descending', () => {
      const query = new Query(['kind1'])
        .order('name')
        .order('count', {descending: true});

      assert.strictEqual(query.orders[0].name, 'name');
      assert.strictEqual(query.orders[0].sign, '+');
      assert.strictEqual(query.orders[1].name, 'count');
      assert.strictEqual(query.orders[1].sign, '-');
    });

    it('should return the query instance', () => {
      const query = new Query(['kind1']);
      const nextQuery = query.order('name');

      assert.strictEqual(query, nextQuery);
    });
  });

  describe('groupBy', () => {
    it('should store an array of properties to group by', () => {
      const query = new Query(['kind1']).groupBy(['name', 'size']);

      assert.deepStrictEqual(query.groupByVal, ['name', 'size']);
    });

    it('should convert a single property into an array', () => {
      const query = new Query(['kind1']).groupBy('name');

      assert.deepStrictEqual(query.groupByVal, ['name']);
    });

    it('should return the query instance', () => {
      const query = new Query(['kind1']);
      const nextQuery = query.groupBy(['name', 'size']);

      assert.strictEqual(query, nextQuery);
    });
  });

  describe('select', () => {
    it('should store an array of properties to select', () => {
      const query = new Query(['kind1']).select(['name', 'size']);

      assert.deepStrictEqual(query.selectVal, ['name', 'size']);
    });

    it('should convert a single property into an array', () => {
      const query = new Query(['kind1']).select('name');

      assert.deepStrictEqual(query.selectVal, ['name']);
    });

    it('should return the query instance', () => {
      const query = new Query(['kind1']);
      const nextQuery = query.select(['name', 'size']);

      assert.strictEqual(query, nextQuery);
    });
  });

  describe('start', () => {
    it('should capture the starting cursor value', () => {
      const query = new Query(['kind1']).start('X');

      assert.strictEqual(query.startVal, 'X');
    });

    it('should return the query instance', () => {
      const query = new Query(['kind1']);
      const nextQuery = query.start('X');

      assert.strictEqual(query, nextQuery);
    });
  });

  describe('end', () => {
    it('should capture the ending cursor value', () => {
      const query = new Query(['kind1']).end('Z');

      assert.strictEqual(query.endVal, 'Z');
    });

    it('should return the query instance', () => {
      const query = new Query(['kind1']);
      const nextQuery = query.end('Z');

      assert.strictEqual(query, nextQuery);
    });
  });

  describe('limit', () => {
    it('should capture the number of results to limit to', () => {
      const query = new Query(['kind1']).limit(20);

      assert.strictEqual(query.limitVal, 20);
    });

    it('should return the query instance', () => {
      const query = new Query(['kind1']);
      const nextQuery = query.limit(20);

      assert.strictEqual(query, nextQuery);
    });
  });

  describe('offset', () => {
    it('should capture the number of results to offset by', () => {
      const query = new Query(['kind1']).offset(100);

      assert.strictEqual(query.offsetVal, 100);
    });

    it('should return the query instance', () => {
      const query = new Query(['kind1']);
      const nextQuery = query.offset(100);

      assert.strictEqual(query, nextQuery);
    });
  });

  describe('run', () => {
    it('should call the parent instance runQuery correctly', done => {
      const args = [{}, () => {}];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query.scope.runQuery = function (...thisArgs: any[]) {
        assert.strictEqual(this, query.scope);
        assert.strictEqual(thisArgs[0], query);
        assert.strictEqual(thisArgs[1], args[0]);
        done();
      };

      query.run(...args);
    });
  });

  describe('runStream', () => {
    it('should not require options', () => {
      const runQueryReturnValue = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query.scope.runQueryStream = function (...args: any[]) {
        assert.strictEqual(this, query.scope);
        assert.strictEqual(args[0], query);
        return runQueryReturnValue;
      };

      const results = query.runStream();
      assert.strictEqual(results, runQueryReturnValue);
    });

    it('should call the parent instance runQueryStream correctly', () => {
      const options = {
        consistency: 'string',
        gaxOptions: {},
        wrapNumbers: true,
      };
      const runQueryReturnValue = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query.scope.runQueryStream = function (...args: any[]) {
        assert.strictEqual(this, query.scope);
        assert.strictEqual(args[0], query);
        assert.strictEqual(args[1], options);
        return runQueryReturnValue;
      };

      const results = query.runStream(options);
      assert.strictEqual(results, runQueryReturnValue);
    });
  });
});
