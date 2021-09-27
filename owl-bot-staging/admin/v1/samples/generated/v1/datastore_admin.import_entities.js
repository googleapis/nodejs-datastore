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

function main(projectId, inputUrl) {
  // [START datastore_v1_generated_DatastoreAdmin_ImportEntities_async]
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
   *  Required. The full resource URL of the external storage location. Currently, only
   *  Google Cloud Storage is supported. So input_url should be of the form:
   *  `gs://BUCKET_NAME[/NAMESPACE_PATH]/OVERALL_EXPORT_METADATA_FILE`, where
   *  `BUCKET_NAME` is the name of the Cloud Storage bucket, `NAMESPACE_PATH` is
   *  an optional Cloud Storage namespace path (this is not a Cloud Datastore
   *  namespace), and `OVERALL_EXPORT_METADATA_FILE` is the metadata file written
   *  by the ExportEntities operation. For more information about Cloud Storage
   *  namespace paths, see
   *  [Object name
   *  considerations](https://cloud.google.com/storage/docs/naming#object-considerations).
   *  For more information, see
   *  [google.datastore.admin.v1.ExportEntitiesResponse.output_url][google.datastore.admin.v1.ExportEntitiesResponse.output_url].
   */
  // const inputUrl = 'abc123'
  /**
   *  Optionally specify which kinds/namespaces are to be imported. If provided,
   *  the list must be a subset of the EntityFilter used in creating the export,
   *  otherwise a FAILED_PRECONDITION error will be returned. If no filter is
   *  specified then all entities from the export are imported.
   */
  // const entityFilter = ''

  // Imports the Admin library
  const {DatastoreAdminClient} = require('admin').v1;

  // Instantiates a client
  const adminClient = new DatastoreAdminClient();

  async function importEntities() {
    // Construct request
    const request = {
      projectId,
      inputUrl,
    };

    // Run request
    const [operation] = await adminClient.importEntities(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  importEntities();
  // [END datastore_v1_generated_DatastoreAdmin_ImportEntities_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
