// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Query} from './index';
import {RunQueryOptions, RunQueryResponse} from './query';
import {RequestCallback} from './request';
const AGGREGATE_QUERY = Symbol('AGGREGATE_QUERY');

class AggregateQuery {
  type = AGGREGATE_QUERY;
  aggregations: Array<AggregateField>;
  query: Query | undefined;

  constructor(query: Query) {
    this.query = query;
    this.aggregations = [];
  }

  count(alias: string): AggregateQuery {
    this.aggregations.push(AggregateField.count().alias(alias));
    return this;
  }

  addAggregation(aggregation: AggregateField): AggregateQuery {
    this.aggregations.push(aggregation);
    return this;
  }

  addAggregations(aggregations: AggregateField[]): AggregateQuery {
    for (const aggregation of aggregations) {
      this.aggregations.push(aggregation);
    }
    return this;
  }

  run(
    optionsOrCallback?: RunQueryOptions | RequestCallback,
    cb?: RequestCallback
  ): void | Promise<RunQueryResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const scope = this.query!.scope;
    const runAggregationQuery = scope!.runAggregationQuery.bind(scope);
    return runAggregationQuery(this, options, callback);
  }

  // eslint-disable-next-line
  toProto(): any {
    return this.aggregations.map(aggregation => aggregation.toProto());
  }
}

abstract class AggregateField {
  alias_?: string;

  static count(): Count {
    return new Count();
  }

  alias(alias: string): AggregateField {
    this.alias_ = alias;
    return this;
  }

  // eslint-disable-next-line
  abstract toProto(): any;
}

class Count extends AggregateField {
  // eslint-disable-next-line
  toProto(): any {
    const count = Object.assign({});
    return Object.assign({count}, this.alias_ ? {alias: this.alias_} : null);
  }
}

export {AggregateField, AggregateQuery, AGGREGATE_QUERY};