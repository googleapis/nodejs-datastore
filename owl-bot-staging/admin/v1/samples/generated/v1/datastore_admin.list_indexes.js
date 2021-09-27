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
  // [START datastore_v1_generated_DatastoreAdmin_ListIndexes_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Project ID against which to make the request.
   */
  // const projectId = 'abc123'
  /**
   */
  // const filter = 'abc123'
  /**
   *  The maximum number of items to return.  If zero, then all results will be
   *  returned.
   */
  // const pageSize = 1234
  /**
   *  The next_page_token value returned from a previous List request, if any.
   */
  // const pageToken = 'abc123'

  // Imports the Admin library
  const {DatastoreAdminClient} = require('admin').v1;

  // Instantiates a client
  const adminClient = new DatastoreAdminClient();

  async function listIndexes() {
    // Construct request
    const request = {
    };

    // Run request
    const iterable = await adminClient.listIndexesAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  listIndexes();
  // [END datastore_v1_generated_DatastoreAdmin_ListIndexes_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
