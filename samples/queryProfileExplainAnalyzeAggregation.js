// Copyright 2024 Google LLC
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

'use strict';

// sample-metadata:
//   title: Run query profiling (aggregation query)
//   description: Run query profiling for an aggregation query and print query results

async function main() {
  // [START datastore_query_explain_analyze_aggregation]

  // Imports the Cloud Datastore
  const {Datastore, AggregateField} = require('@google-cloud/datastore');

  // Instantiate the Datastore
  const datastore = new Datastore();
  const q = datastore.createQuery('Task');
  const aggregate = datastore
    .createAggregationQuery(q)
    .addAggregation(AggregateField.sum('created'));

  const [entities, info] = await datastore.runAggregationQuery(aggregate, {
    explainOptions: {analyze: true},
  });

  for (const entity of entities) {
    console.log(`Entity found: ${JSON.stringify(entity)}`);
  }
  console.log(`info: ${Object.keys(info.explainMetrics)}`);
  // [END datastore_query_explain_analyze_aggregation]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);