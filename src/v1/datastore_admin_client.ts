// Copyright 2020 Google LLC
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

import * as gax from 'google-gax';
import {
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  LROperation,
  PaginationCallback,
  GaxCall,
} from 'google-gax';
import * as path from 'path';

import {Transform} from 'stream';
import {RequestType} from 'google-gax/build/src/apitypes';
import * as protos from '../../protos/protos';
import * as gapicConfig from './datastore_admin_client_config.json';
import {operationsProtos} from 'google-gax';
const version = require('../../../package.json').version;

/**
 *  Google Cloud Datastore Admin API
 *
 *
 *  The Datastore Admin API provides several admin services for Cloud Datastore.
 *
 *  -----------------------------------------------------------------------------
 *  ## Concepts
 *
 *  Project, namespace, kind, and entity as defined in the Google Cloud Datastore
 *  API.
 *
 *  Operation: An Operation represents work being performed in the background.
 *
 *  EntityFilter: Allows specifying a subset of entities in a project. This is
 *  specified as a combination of kinds and namespaces (either or both of which
 *  may be all).
 *
 *  -----------------------------------------------------------------------------
 *  ## Services
 *
 *  # Export/Import
 *
 *  The Export/Import service provides the ability to copy all or a subset of
 *  entities to/from Google Cloud Storage.
 *
 *  Exported data may be imported into Cloud Datastore for any Google Cloud
 *  Platform project. It is not restricted to the export source project. It is
 *  possible to export from one project and then import into another.
 *
 *  Exported data can also be loaded into Google BigQuery for analysis.
 *
 *  Exports and imports are performed asynchronously. An Operation resource is
 *  created for each export/import. The state (including any errors encountered)
 *  of the export/import may be queried via the Operation resource.
 *
 *  # Index
 *
 *  The index service manages Cloud Datastore composite indexes.
 *
 *  Index creation and deletion are performed asynchronously.
 *  An Operation resource is created for each such asynchronous operation.
 *  The state of the operation (including any errors encountered)
 *  may be queried via the Operation resource.
 *
 *  # Operation
 *
 *  The Operations collection provides a record of actions performed for the
 *  specified project (including any operations in progress). Operations are not
 *  created directly but through calls on other collections or resources.
 *
 *  An operation that is not yet done may be cancelled. The request to cancel is
 *  asynchronous and the operation may continue to run for some time after the
 *  request to cancel is made.
 *
 *  An operation that is done may be deleted so that it is no longer listed as
 *  part of the Operation collection.
 *
 *  ListOperations returns all pending operations, but not completed operations.
 *
 *  Operations are created by service DatastoreAdmin,
 *  but are accessed via service google.longrunning.Operations.
 * @class
 * @memberof v1
 */
export class DatastoreAdminClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  innerApiCalls: {[name: string]: Function};
  operationsClient: gax.OperationsClient;
  datastoreAdminStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of DatastoreAdminClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof DatastoreAdminClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;

    // users can override the config from client side, like retry codes name.
    // The detailed structure of the clientConfig can be found here: https://github.com/googleapis/gax-nodejs/blob/master/src/gax.ts#L546
    // The way to override client config for Showcase API:
    //
    // const customConfig = {"interfaces": {"google.showcase.v1beta1.Echo": {"methods": {"Echo": {"retry_codes_name": "idempotent", "retry_params_name": "default"}}}}}
    // const showcaseClient = new showcaseClient({ projectId, customConfig });
    opts.clientConfig = opts.clientConfig || {};

    // If we're running in browser, it's OK to omit `fallback` since
    // google-gax has `browser` field in its `package.json`.
    // For Electron (which does not respect `browser` field),
    // pass `{fallback: true}` to the DatastoreAdminClient constructor.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof DatastoreAdminClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback
        ? // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../protos/protos.json')
        : nodejsProtoPath
    );

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this.descriptors.page = {
      listIndexes: new this._gaxModule.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'indexes'
      ),
    };

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    const protoFilesRoot = opts.fallback
      ? this._gaxModule.protobuf.Root.fromJSON(
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../protos/protos.json')
        )
      : this._gaxModule.protobuf.loadSync(nodejsProtoPath);

    this.operationsClient = this._gaxModule
      .lro({
        auth: this.auth,
        grpc: 'grpc' in this._gaxGrpc ? this._gaxGrpc.grpc : undefined,
      })
      .operationsClient(opts);
    const exportEntitiesResponse = protoFilesRoot.lookup(
      '.google.datastore.admin.v1.ExportEntitiesResponse'
    ) as gax.protobuf.Type;
    const exportEntitiesMetadata = protoFilesRoot.lookup(
      '.google.datastore.admin.v1.ExportEntitiesMetadata'
    ) as gax.protobuf.Type;
    const importEntitiesResponse = protoFilesRoot.lookup(
      '.google.protobuf.Empty'
    ) as gax.protobuf.Type;
    const importEntitiesMetadata = protoFilesRoot.lookup(
      '.google.datastore.admin.v1.ImportEntitiesMetadata'
    ) as gax.protobuf.Type;

    this.descriptors.longrunning = {
      exportEntities: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        exportEntitiesResponse.decode.bind(exportEntitiesResponse),
        exportEntitiesMetadata.decode.bind(exportEntitiesMetadata)
      ),
      importEntities: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        importEntitiesResponse.decode.bind(importEntitiesResponse),
        importEntitiesMetadata.decode.bind(importEntitiesMetadata)
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.datastore.admin.v1.DatastoreAdmin',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.datastoreAdminStub) {
      return this.datastoreAdminStub;
    }

    // Put together the "service stub" for
    // google.datastore.admin.v1.DatastoreAdmin.
    this.datastoreAdminStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.datastore.admin.v1.DatastoreAdmin'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.datastore.admin.v1.DatastoreAdmin,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const datastoreAdminStubMethods = [
      'exportEntities',
      'importEntities',
      'getIndex',
      'listIndexes',
    ];
    for (const methodName of datastoreAdminStubMethods) {
      const callPromise = this.datastoreAdminStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const descriptor =
        this.descriptors.page[methodName] ||
        this.descriptors.longrunning[methodName] ||
        undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.datastoreAdminStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'datastore.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'datastore.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/datastore',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  getIndex(
    request: protos.google.datastore.admin.v1.IGetIndexRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.datastore.admin.v1.IIndex,
      protos.google.datastore.admin.v1.IGetIndexRequest | undefined,
      {} | undefined
    ]
  >;
  getIndex(
    request: protos.google.datastore.admin.v1.IGetIndexRequest,
    options: gax.CallOptions,
    callback: Callback<
      protos.google.datastore.admin.v1.IIndex,
      protos.google.datastore.admin.v1.IGetIndexRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  getIndex(
    request: protos.google.datastore.admin.v1.IGetIndexRequest,
    callback: Callback<
      protos.google.datastore.admin.v1.IIndex,
      protos.google.datastore.admin.v1.IGetIndexRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Gets an index.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.projectId
   *   Project ID against which to make the request.
   * @param {string} request.indexId
   *   The resource ID of the index to get.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Index]{@link google.datastore.admin.v1.Index}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  getIndex(
    request: protos.google.datastore.admin.v1.IGetIndexRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protos.google.datastore.admin.v1.IIndex,
          protos.google.datastore.admin.v1.IGetIndexRequest | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.datastore.admin.v1.IIndex,
      protos.google.datastore.admin.v1.IGetIndexRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.datastore.admin.v1.IIndex,
      protos.google.datastore.admin.v1.IGetIndexRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      project_id: request.projectId || '',
    });
    this.initialize();
    return this.innerApiCalls.getIndex(request, options, callback);
  }

  exportEntities(
    request: protos.google.datastore.admin.v1.IExportEntitiesRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      LROperation<
        protos.google.datastore.admin.v1.IExportEntitiesResponse,
        protos.google.datastore.admin.v1.IExportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  exportEntities(
    request: protos.google.datastore.admin.v1.IExportEntitiesRequest,
    options: gax.CallOptions,
    callback: Callback<
      LROperation<
        protos.google.datastore.admin.v1.IExportEntitiesResponse,
        protos.google.datastore.admin.v1.IExportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  exportEntities(
    request: protos.google.datastore.admin.v1.IExportEntitiesRequest,
    callback: Callback<
      LROperation<
        protos.google.datastore.admin.v1.IExportEntitiesResponse,
        protos.google.datastore.admin.v1.IExportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Exports a copy of all or a subset of entities from Google Cloud Datastore
   * to another storage system, such as Google Cloud Storage. Recent updates to
   * entities may not be reflected in the export. The export occurs in the
   * background and its progress can be monitored and managed via the
   * Operation resource that is created. The output of an export may only be
   * used once the associated operation is done. If an export operation is
   * cancelled before completion it may leave partial data behind in Google
   * Cloud Storage.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.projectId
   *   Required. Project ID against which to make the request.
   * @param {number[]} request.labels
   *   Client-assigned labels.
   * @param {google.datastore.admin.v1.EntityFilter} request.entityFilter
   *   Description of what data from the project is included in the export.
   * @param {string} request.outputUrlPrefix
   *   Required. Location for the export metadata and data files.
   *
   *   The full resource URL of the external storage location. Currently, only
   *   Google Cloud Storage is supported. So output_url_prefix should be of the
   *   form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the
   *   name of the Cloud Storage bucket and `NAMESPACE_PATH` is an optional Cloud
   *   Storage namespace path (this is not a Cloud Datastore namespace). For more
   *   information about Cloud Storage namespace paths, see
   *   [Object name
   *   considerations](https://cloud.google.com/storage/docs/naming#object-considerations).
   *
   *   The resulting files will be nested deeper than the specified URL prefix.
   *   The final output URL will be provided in the
   *   {@link google.datastore.admin.v1.ExportEntitiesResponse.output_url|google.datastore.admin.v1.ExportEntitiesResponse.output_url} field. That
   *   value should be used for subsequent ImportEntities operations.
   *
   *   By nesting the data files deeper, the same Cloud Storage bucket can be used
   *   in multiple ExportEntities operations without conflict.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  exportEntities(
    request: protos.google.datastore.admin.v1.IExportEntitiesRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          LROperation<
            protos.google.datastore.admin.v1.IExportEntitiesResponse,
            protos.google.datastore.admin.v1.IExportEntitiesMetadata
          >,
          protos.google.longrunning.IOperation | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      LROperation<
        protos.google.datastore.admin.v1.IExportEntitiesResponse,
        protos.google.datastore.admin.v1.IExportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      LROperation<
        protos.google.datastore.admin.v1.IExportEntitiesResponse,
        protos.google.datastore.admin.v1.IExportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      project_id: request.projectId || '',
    });
    this.initialize();
    return this.innerApiCalls.exportEntities(request, options, callback);
  }
  /**
   * Check the status of the long running operation returned by the exportEntities() method.
   * @param {String} name
   *   The operation name that will be passed.
   * @returns {Promise} - The promise which resolves to an object.
   *   The decoded operation object has result and metadata field to get information from.
   *
   * @example:
   *   const decodedOperation = await checkExportEntitiesProgress(name);
   *   console.log(decodedOperation.result);
   *   console.log(decodedOperation.done);
   *   console.log(decodedOperation.metadata);
   *
   */
  async checkExportEntitiesProgress(
    name: string
  ): Promise<
    LROperation<
      protos.google.datastore.admin.v1.ExportEntitiesResponse,
      protos.google.datastore.admin.v1.ExportEntitiesMetadata
    >
  > {
    const request = new operationsProtos.google.longrunning.GetOperationRequest(
      {name}
    );
    const [operation] = await this.operationsClient.getOperation(request);
    const decodeOperation = new gax.Operation(
      operation,
      this.descriptors.longrunning.exportEntities,
      gax.createDefaultBackoffSettings()
    );
    return decodeOperation as LROperation<
      protos.google.datastore.admin.v1.ExportEntitiesResponse,
      protos.google.datastore.admin.v1.ExportEntitiesMetadata
    >;
  }
  importEntities(
    request: protos.google.datastore.admin.v1.IImportEntitiesRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      LROperation<
        protos.google.protobuf.IEmpty,
        protos.google.datastore.admin.v1.IImportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  importEntities(
    request: protos.google.datastore.admin.v1.IImportEntitiesRequest,
    options: gax.CallOptions,
    callback: Callback<
      LROperation<
        protos.google.protobuf.IEmpty,
        protos.google.datastore.admin.v1.IImportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  importEntities(
    request: protos.google.datastore.admin.v1.IImportEntitiesRequest,
    callback: Callback<
      LROperation<
        protos.google.protobuf.IEmpty,
        protos.google.datastore.admin.v1.IImportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Imports entities into Google Cloud Datastore. Existing entities with the
   * same key are overwritten. The import occurs in the background and its
   * progress can be monitored and managed via the Operation resource that is
   * created. If an ImportEntities operation is cancelled, it is possible
   * that a subset of the data has already been imported to Cloud Datastore.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.projectId
   *   Required. Project ID against which to make the request.
   * @param {number[]} request.labels
   *   Client-assigned labels.
   * @param {string} request.inputUrl
   *   Required. The full resource URL of the external storage location. Currently, only
   *   Google Cloud Storage is supported. So input_url should be of the form:
   *   `gs://BUCKET_NAME[/NAMESPACE_PATH]/OVERALL_EXPORT_METADATA_FILE`, where
   *   `BUCKET_NAME` is the name of the Cloud Storage bucket, `NAMESPACE_PATH` is
   *   an optional Cloud Storage namespace path (this is not a Cloud Datastore
   *   namespace), and `OVERALL_EXPORT_METADATA_FILE` is the metadata file written
   *   by the ExportEntities operation. For more information about Cloud Storage
   *   namespace paths, see
   *   [Object name
   *   considerations](https://cloud.google.com/storage/docs/naming#object-considerations).
   *
   *   For more information, see
   *   {@link google.datastore.admin.v1.ExportEntitiesResponse.output_url|google.datastore.admin.v1.ExportEntitiesResponse.output_url}.
   * @param {google.datastore.admin.v1.EntityFilter} request.entityFilter
   *   Optionally specify which kinds/namespaces are to be imported. If provided,
   *   the list must be a subset of the EntityFilter used in creating the export,
   *   otherwise a FAILED_PRECONDITION error will be returned. If no filter is
   *   specified then all entities from the export are imported.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  importEntities(
    request: protos.google.datastore.admin.v1.IImportEntitiesRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          LROperation<
            protos.google.protobuf.IEmpty,
            protos.google.datastore.admin.v1.IImportEntitiesMetadata
          >,
          protos.google.longrunning.IOperation | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      LROperation<
        protos.google.protobuf.IEmpty,
        protos.google.datastore.admin.v1.IImportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      LROperation<
        protos.google.protobuf.IEmpty,
        protos.google.datastore.admin.v1.IImportEntitiesMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      project_id: request.projectId || '',
    });
    this.initialize();
    return this.innerApiCalls.importEntities(request, options, callback);
  }
  /**
   * Check the status of the long running operation returned by the importEntities() method.
   * @param {String} name
   *   The operation name that will be passed.
   * @returns {Promise} - The promise which resolves to an object.
   *   The decoded operation object has result and metadata field to get information from.
   *
   * @example:
   *   const decodedOperation = await checkImportEntitiesProgress(name);
   *   console.log(decodedOperation.result);
   *   console.log(decodedOperation.done);
   *   console.log(decodedOperation.metadata);
   *
   */
  async checkImportEntitiesProgress(
    name: string
  ): Promise<
    LROperation<
      protos.google.protobuf.Empty,
      protos.google.datastore.admin.v1.ImportEntitiesMetadata
    >
  > {
    const request = new operationsProtos.google.longrunning.GetOperationRequest(
      {name}
    );
    const [operation] = await this.operationsClient.getOperation(request);
    const decodeOperation = new gax.Operation(
      operation,
      this.descriptors.longrunning.importEntities,
      gax.createDefaultBackoffSettings()
    );
    return decodeOperation as LROperation<
      protos.google.protobuf.Empty,
      protos.google.datastore.admin.v1.ImportEntitiesMetadata
    >;
  }
  listIndexes(
    request: protos.google.datastore.admin.v1.IListIndexesRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.datastore.admin.v1.IIndex[],
      protos.google.datastore.admin.v1.IListIndexesRequest | null,
      protos.google.datastore.admin.v1.IListIndexesResponse
    ]
  >;
  listIndexes(
    request: protos.google.datastore.admin.v1.IListIndexesRequest,
    options: gax.CallOptions,
    callback: PaginationCallback<
      protos.google.datastore.admin.v1.IListIndexesRequest,
      protos.google.datastore.admin.v1.IListIndexesResponse | null | undefined,
      protos.google.datastore.admin.v1.IIndex
    >
  ): void;
  listIndexes(
    request: protos.google.datastore.admin.v1.IListIndexesRequest,
    callback: PaginationCallback<
      protos.google.datastore.admin.v1.IListIndexesRequest,
      protos.google.datastore.admin.v1.IListIndexesResponse | null | undefined,
      protos.google.datastore.admin.v1.IIndex
    >
  ): void;
  /**
   * Lists the indexes that match the specified filters.  Datastore uses an
   * eventually consistent query to fetch the list of indexes and may
   * occasionally return stale results.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.projectId
   *   Project ID against which to make the request.
   * @param {string} request.filter
   * @param {number} request.pageSize
   *   The maximum number of items to return.  If zero, then all results will be
   *   returned.
   * @param {string} request.pageToken
   *   The next_page_token value returned from a previous List request, if any.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [Index]{@link google.datastore.admin.v1.Index}.
   *   The client library support auto-pagination by default: it will call the API as many
   *   times as needed and will merge results from all the pages into this array.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [Index]{@link google.datastore.admin.v1.Index} that corresponds to
   *   the one page received from the API server.
   *   If the second element is not null it contains the request object of type [ListIndexesRequest]{@link google.datastore.admin.v1.ListIndexesRequest}
   *   that can be used to obtain the next page of the results.
   *   If it is null, the next page does not exist.
   *   The third element contains the raw response received from the API server. Its type is
   *   [ListIndexesResponse]{@link google.datastore.admin.v1.ListIndexesResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listIndexes(
    request: protos.google.datastore.admin.v1.IListIndexesRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | PaginationCallback<
          protos.google.datastore.admin.v1.IListIndexesRequest,
          | protos.google.datastore.admin.v1.IListIndexesResponse
          | null
          | undefined,
          protos.google.datastore.admin.v1.IIndex
        >,
    callback?: PaginationCallback<
      protos.google.datastore.admin.v1.IListIndexesRequest,
      protos.google.datastore.admin.v1.IListIndexesResponse | null | undefined,
      protos.google.datastore.admin.v1.IIndex
    >
  ): Promise<
    [
      protos.google.datastore.admin.v1.IIndex[],
      protos.google.datastore.admin.v1.IListIndexesRequest | null,
      protos.google.datastore.admin.v1.IListIndexesResponse
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      project_id: request.projectId || '',
    });
    this.initialize();
    return this.innerApiCalls.listIndexes(request, options, callback);
  }

  /**
   * Equivalent to {@link listIndexes}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listIndexes} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.projectId
   *   Project ID against which to make the request.
   * @param {string} request.filter
   * @param {number} request.pageSize
   *   The maximum number of items to return.  If zero, then all results will be
   *   returned.
   * @param {string} request.pageToken
   *   The next_page_token value returned from a previous List request, if any.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which emits an object representing [Index]{@link google.datastore.admin.v1.Index} on 'data' event.
   */
  listIndexesStream(
    request?: protos.google.datastore.admin.v1.IListIndexesRequest,
    options?: gax.CallOptions
  ): Transform {
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      project_id: request.projectId || '',
    });
    const callSettings = new gax.CallSettings(options);
    this.initialize();
    return this.descriptors.page.listIndexes.createStream(
      this.innerApiCalls.listIndexes as gax.GaxCall,
      request,
      callSettings
    );
  }

  /**
   * Equivalent to {@link listIndexes}, but returns an iterable object.
   *
   * for-await-of syntax is used with the iterable to recursively get response element on-demand.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.projectId
   *   Project ID against which to make the request.
   * @param {string} request.filter
   * @param {number} request.pageSize
   *   The maximum number of items to return.  If zero, then all results will be
   *   returned.
   * @param {string} request.pageToken
   *   The next_page_token value returned from a previous List request, if any.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Object}
   *   An iterable Object that conforms to @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols.
   */
  listIndexesAsync(
    request?: protos.google.datastore.admin.v1.IListIndexesRequest,
    options?: gax.CallOptions
  ): AsyncIterable<protos.google.datastore.admin.v1.IIndex> {
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      project_id: request.projectId || '',
    });
    options = options || {};
    const callSettings = new gax.CallSettings(options);
    this.initialize();
    return this.descriptors.page.listIndexes.asyncIterate(
      this.innerApiCalls['listIndexes'] as GaxCall,
      (request as unknown) as RequestType,
      callSettings
    ) as AsyncIterable<protos.google.datastore.admin.v1.IIndex>;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.datastoreAdminStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
