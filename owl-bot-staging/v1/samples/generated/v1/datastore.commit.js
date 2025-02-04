// Copyright 2025 Google LLC
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
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(projectId) {
  // [START datastore_v1_generated_Datastore_Commit_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The ID of the project against which to make the request.
   */
  // const projectId = 'abc123'
  /**
   *  The ID of the database against which to make the request.
   *  '(default)' is not allowed; please use empty string '' to refer the default
   *  database.
   */
  // const databaseId = 'abc123'
  /**
   *  The type of commit to perform. Defaults to `TRANSACTIONAL`.
   */
  // const mode = {}
  /**
   *  The identifier of the transaction associated with the commit. A
   *  transaction identifier is returned by a call to
   *  Datastore.BeginTransaction google.datastore.v1.Datastore.BeginTransaction.
   */
  // const transaction = Buffer.from('string')
  /**
   *  Options for beginning a new transaction for this request.
   *  The transaction is committed when the request completes. If specified,
   *  TransactionOptions.mode google.datastore.v1.TransactionOptions  must be
   *  TransactionOptions.ReadWrite google.datastore.v1.TransactionOptions.ReadWrite.
   */
  // const singleUseTransaction = {}
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
  // const mutations = [1,2,3,4]

  // Imports the Datastore library
  const {DatastoreClient} = require('@google-cloud/datastore').v1;

  // Instantiates a client
  const datastoreClient = new DatastoreClient();

  async function callCommit() {
    // Construct request
    const request = {
      projectId,
    };

    // Run request
    const response = await datastoreClient.commit(request);
    console.log(response);
  }

  callCommit();
  // [END datastore_v1_generated_Datastore_Commit_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
