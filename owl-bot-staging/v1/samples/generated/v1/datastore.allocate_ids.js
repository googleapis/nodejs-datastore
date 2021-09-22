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

function main(projectId, keys) {
  // [START datastore_allocate_ids_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The ID of the project against which to make the request.
   */
  // const projectId = 'abc123'
  /**
   *  Required. A list of keys with incomplete key paths for which to allocate IDs.
   *  No key may be reserved/read-only.
   */
  // const keys = 1234

  // Imports the Datastore library
  const {DatastoreClient} = require('@google-cloud/datastore').v1;

  // Instantiates a client
  const datastoreClient = new DatastoreClient();

  async function allocateIds() {
    // Construct request
    const request = {
      projectId,
      keys,
    };

    // Run request
    const response = await datastoreClient.allocateIds(request);
    console.log(response);
  }

  allocateIds();
  // [END datastore_allocate_ids_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
