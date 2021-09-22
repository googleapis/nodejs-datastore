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

function main(projectId, outputUrlPrefix) {
  // [START admin_export_entities_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Project ID against which to make the request.
   */
  // const projectId = 'abc123'
  /**
   *  Client-assigned labels.
   */
  // const labels = 1234
  /**
   *  Description of what data from the project is included in the export.
   */
  // const entityFilter = ''
  /**
   *  Required. Location for the export metadata and data files.
   *  The full resource URL of the external storage location. Currently, only
   *  Google Cloud Storage is supported. So output_url_prefix should be of the
   *  form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the
   *  name of the Cloud Storage bucket and `NAMESPACE_PATH` is an optional Cloud
   *  Storage namespace path (this is not a Cloud Datastore namespace). For more
   *  information about Cloud Storage namespace paths, see
   *  [Object name
   *  considerations](https://cloud.google.com/storage/docs/naming#object-considerations).
   *  The resulting files will be nested deeper than the specified URL prefix.
   *  The final output URL will be provided in the
   *  [google.datastore.admin.v1.ExportEntitiesResponse.output_url][google.datastore.admin.v1.ExportEntitiesResponse.output_url] field. That
   *  value should be used for subsequent ImportEntities operations.
   *  By nesting the data files deeper, the same Cloud Storage bucket can be used
   *  in multiple ExportEntities operations without conflict.
   */
  // const outputUrlPrefix = 'abc123'

  // Imports the Admin library
  const {DatastoreAdminClient} = require('admin').v1;

  // Instantiates a client
  const adminClient = new DatastoreAdminClient();

  async function exportEntities() {
    // Construct request
    const request = {
      projectId,
      outputUrlPrefix,
    };

    // Run request
    const [operation] = await adminClient.exportEntities(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  exportEntities();
  // [END admin_export_entities_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
