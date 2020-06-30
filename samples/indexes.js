// Copyright 2020 Google LLC
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

'use strict';

// sample-metadata
//  title: Describe Indexes
//  description: Reads all indexes, and then looks one up by ID.
//  usage: node indexes.js

const {Datastore} = require('@google-cloud/datastore');
const {inspect} = require('util');

// [START indexes]

// NOTE: ensure the sample indexes have been created defined at samples/index.yaml
// use the following command do to so, until native `createIndex` is supported
// within this client:
// ```shell
//   gcloud datastore indexes create samples/index.yaml
// ```

function dump(object) {
  return inspect(object, {compact: false, depth: null});
}

function main() {
  // Creates a client
  const datastore = new Datastore();

  async function describeIndexes() {
    // `indexes` is a list of Index objects
    const [{indexes}] = await datastore.listIndexes();
    console.log('Found all indexes in the datastore:\n', dump(indexes));

    // now let's use the first index's ID to retrieve it again
    // this illustrates the second way to to retrieve the same
    // information for an index, if the index is known by ID
    const firstIndex = indexes[0];
    console.log('Found at least one index, the first one:\n', dump(firstIndex));

    const indexId = firstIndex.indexId;

    // we have a known index ID, let's look it up
    // `index` is a single Index object
    const [index] = await datastore.getIndex(indexId);
    console.log(
      'Found a specific index using its unique identifier:\n',
      dump(index)
    );
  }

  describeIndexes().catch(console.error);
  // [END indexes]
}

main(...process.argv.slice(2));
