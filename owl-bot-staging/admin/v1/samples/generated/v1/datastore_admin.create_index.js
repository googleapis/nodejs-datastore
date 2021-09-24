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

function main() {
  // [START admin_v1_generated_DatastoreAdmin_CreateIndex_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Project ID against which to make the request.
   */
  // const projectId = 'abc123'
  /**
   *  The index to create. The name and state fields are output only and will be
   *  ignored. Single property indexes cannot be created or deleted.
   */
  // const index = ''

  // Imports the Admin library
  const {DatastoreAdminClient} = require('admin').v1;

  // Instantiates a client
  const adminClient = new DatastoreAdminClient();

  async function createIndex() {
    // Construct request
    const request = {
    };

    // Run request
    const [operation] = await adminClient.createIndex(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  createIndex();
  // [END admin_v1_generated_DatastoreAdmin_CreateIndex_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
