// Copyright 2021 Google LLC
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

function main(projectId) {
  // [START datastore_v1_generated_Datastore_RunQuery_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The ID of the project against which to make the request.
   */
  // const projectId = 'abc123'
  /**
   *  Entities are partitioned into subsets, identified by a partition ID.
   *  Queries are scoped to a single partition.
   *  This partition ID is normalized with the standard default context
   *  partition ID.
   */
  // const partitionId = {}
  /**
   *  The options for this query.
   */
  // const readOptions = {}
  /**
   *  The query to run.
   */
  // const query = {}
  /**
   *  The GQL query to run.
   */
  // const gqlQuery = {}

  // Imports the Datastore library
  const {DatastoreClient} = require('@google-cloud/datastore').v1;

  // Instantiates a client
  const datastoreClient = new DatastoreClient();

  async function callRunQuery() {
    // Construct request
    const request = {
      projectId,
    };

    // Run request
    const response = await datastoreClient.runQuery(request);
    console.log(response);
  }

  callRunQuery();
  // [END datastore_v1_generated_Datastore_RunQuery_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
