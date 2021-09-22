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
  // [START datastore_commit_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The ID of the project against which to make the request.
   */
  // const projectId = 'abc123'
  /**
   *  The type of commit to perform. Defaults to `TRANSACTIONAL`.
   */
  // const mode = ''
  /**
   *  The identifier of the transaction associated with the commit. A
   *  transaction identifier is returned by a call to
   *  [Datastore.BeginTransaction][google.datastore.v1.Datastore.BeginTransaction].
   */
  // const transaction = 'Buffer.from('string')'
  /**
   *  The mutations to perform.
   *  When mode is `TRANSACTIONAL`, mutations affecting a single entity are
   *  applied in order. The following sequences of mutations affecting a single
   *  entity are not permitted in a single `Commit` request:
   *  - `insert` followed by `insert`
   *  - `update` followed by `insert`
   *  - `upsert` followed by `insert`
   *  - `delete` followed by `update`
   *  When mode is `NON_TRANSACTIONAL`, no two mutations may affect a single
   *  entity.
   */
  // const mutations = 1234

  // Imports the Datastore library
  const {DatastoreClient} = require('@google-cloud/datastore').v1;

  // Instantiates a client
  const datastoreClient = new DatastoreClient();

  async function commit() {
    // Construct request
    const request = {
      projectId,
    };

    // Run request
    const response = await datastoreClient.commit(request);
    console.log(response);
  }

  commit();
  // [END datastore_commit_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
