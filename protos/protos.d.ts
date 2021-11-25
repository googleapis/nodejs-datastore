// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as Long from "long";
import {protobuf as $protobuf} from "google-gax";
/** Namespace google. */
export namespace google {

    /** Namespace datastore. */
    namespace datastore {

        /** Namespace admin. */
        namespace admin {

            /** Namespace v1. */
            namespace v1 {

                /** Represents a DatastoreAdmin */
                class DatastoreAdmin extends $protobuf.rpc.Service {

                    /**
                     * Constructs a new DatastoreAdmin service.
                     * @param rpcImpl RPC implementation
                     * @param [requestDelimited=false] Whether requests are length-delimited
                     * @param [responseDelimited=false] Whether responses are length-delimited
                     */
                    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                    /**
                     * Creates new DatastoreAdmin service using the specified rpc implementation.
                     * @param rpcImpl RPC implementation
                     * @param [requestDelimited=false] Whether requests are length-delimited
                     * @param [responseDelimited=false] Whether responses are length-delimited
                     * @returns RPC service. Useful where requests and/or responses are streamed.
                     */
                    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): DatastoreAdmin;

                    /**
                     * Calls ExportEntities.
                     * @param request ExportEntitiesRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public exportEntities(request: google.datastore.admin.v1.IExportEntitiesRequest, callback: google.datastore.admin.v1.DatastoreAdmin.ExportEntitiesCallback): void;

                    /**
                     * Calls ExportEntities.
                     * @param request ExportEntitiesRequest message or plain object
                     * @returns Promise
                     */
                    public exportEntities(request: google.datastore.admin.v1.IExportEntitiesRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls ImportEntities.
                     * @param request ImportEntitiesRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public importEntities(request: google.datastore.admin.v1.IImportEntitiesRequest, callback: google.datastore.admin.v1.DatastoreAdmin.ImportEntitiesCallback): void;

                    /**
                     * Calls ImportEntities.
                     * @param request ImportEntitiesRequest message or plain object
                     * @returns Promise
                     */
                    public importEntities(request: google.datastore.admin.v1.IImportEntitiesRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls CreateIndex.
                     * @param request CreateIndexRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public createIndex(request: google.datastore.admin.v1.ICreateIndexRequest, callback: google.datastore.admin.v1.DatastoreAdmin.CreateIndexCallback): void;

                    /**
                     * Calls CreateIndex.
                     * @param request CreateIndexRequest message or plain object
                     * @returns Promise
                     */
                    public createIndex(request: google.datastore.admin.v1.ICreateIndexRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls DeleteIndex.
                     * @param request DeleteIndexRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public deleteIndex(request: google.datastore.admin.v1.IDeleteIndexRequest, callback: google.datastore.admin.v1.DatastoreAdmin.DeleteIndexCallback): void;

                    /**
                     * Calls DeleteIndex.
                     * @param request DeleteIndexRequest message or plain object
                     * @returns Promise
                     */
                    public deleteIndex(request: google.datastore.admin.v1.IDeleteIndexRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls GetIndex.
                     * @param request GetIndexRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Index
                     */
                    public getIndex(request: google.datastore.admin.v1.IGetIndexRequest, callback: google.datastore.admin.v1.DatastoreAdmin.GetIndexCallback): void;

                    /**
                     * Calls GetIndex.
                     * @param request GetIndexRequest message or plain object
                     * @returns Promise
                     */
                    public getIndex(request: google.datastore.admin.v1.IGetIndexRequest): Promise<google.datastore.admin.v1.Index>;

                    /**
                     * Calls ListIndexes.
                     * @param request ListIndexesRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and ListIndexesResponse
                     */
                    public listIndexes(request: google.datastore.admin.v1.IListIndexesRequest, callback: google.datastore.admin.v1.DatastoreAdmin.ListIndexesCallback): void;

                    /**
                     * Calls ListIndexes.
                     * @param request ListIndexesRequest message or plain object
                     * @returns Promise
                     */
                    public listIndexes(request: google.datastore.admin.v1.IListIndexesRequest): Promise<google.datastore.admin.v1.ListIndexesResponse>;
                }

                namespace DatastoreAdmin {

                    /**
                     * Callback as used by {@link google.datastore.admin.v1.DatastoreAdmin#exportEntities}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type ExportEntitiesCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.datastore.admin.v1.DatastoreAdmin#importEntities}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type ImportEntitiesCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.datastore.admin.v1.DatastoreAdmin#createIndex}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type CreateIndexCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.datastore.admin.v1.DatastoreAdmin#deleteIndex}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type DeleteIndexCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.datastore.admin.v1.DatastoreAdmin#getIndex}.
                     * @param error Error, if any
                     * @param [response] Index
                     */
                    type GetIndexCallback = (error: (Error|null), response?: google.datastore.admin.v1.Index) => void;

                    /**
                     * Callback as used by {@link google.datastore.admin.v1.DatastoreAdmin#listIndexes}.
                     * @param error Error, if any
                     * @param [response] ListIndexesResponse
                     */
                    type ListIndexesCallback = (error: (Error|null), response?: google.datastore.admin.v1.ListIndexesResponse) => void;
                }

                /** Properties of a CommonMetadata. */
                interface ICommonMetadata {

                    /** CommonMetadata startTime */
                    startTime?: (google.protobuf.ITimestamp|null);

                    /** CommonMetadata endTime */
                    endTime?: (google.protobuf.ITimestamp|null);

                    /** CommonMetadata operationType */
                    operationType?: (google.datastore.admin.v1.OperationType|keyof typeof google.datastore.admin.v1.OperationType|null);

                    /** CommonMetadata labels */
                    labels?: ({ [k: string]: string }|null);

                    /** CommonMetadata state */
                    state?: (google.datastore.admin.v1.CommonMetadata.State|keyof typeof google.datastore.admin.v1.CommonMetadata.State|null);
                }

                /** Represents a CommonMetadata. */
                class CommonMetadata implements ICommonMetadata {

                    /**
                     * Constructs a new CommonMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.ICommonMetadata);

                    /** CommonMetadata startTime. */
                    public startTime?: (google.protobuf.ITimestamp|null);

                    /** CommonMetadata endTime. */
                    public endTime?: (google.protobuf.ITimestamp|null);

                    /** CommonMetadata operationType. */
                    public operationType: (google.datastore.admin.v1.OperationType|keyof typeof google.datastore.admin.v1.OperationType);

                    /** CommonMetadata labels. */
                    public labels: { [k: string]: string };

                    /** CommonMetadata state. */
                    public state: (google.datastore.admin.v1.CommonMetadata.State|keyof typeof google.datastore.admin.v1.CommonMetadata.State);

                    /**
                     * Creates a new CommonMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CommonMetadata instance
                     */
                    public static create(properties?: google.datastore.admin.v1.ICommonMetadata): google.datastore.admin.v1.CommonMetadata;

                    /**
                     * Encodes the specified CommonMetadata message. Does not implicitly {@link google.datastore.admin.v1.CommonMetadata.verify|verify} messages.
                     * @param message CommonMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.ICommonMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CommonMetadata message, length delimited. Does not implicitly {@link google.datastore.admin.v1.CommonMetadata.verify|verify} messages.
                     * @param message CommonMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.ICommonMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CommonMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CommonMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.CommonMetadata;

                    /**
                     * Decodes a CommonMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CommonMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.CommonMetadata;

                    /**
                     * Verifies a CommonMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CommonMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CommonMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.CommonMetadata;

                    /**
                     * Creates a plain object from a CommonMetadata message. Also converts values to other types if specified.
                     * @param message CommonMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.CommonMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CommonMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace CommonMetadata {

                    /** State enum. */
                    enum State {
                        STATE_UNSPECIFIED = 0,
                        INITIALIZING = 1,
                        PROCESSING = 2,
                        CANCELLING = 3,
                        FINALIZING = 4,
                        SUCCESSFUL = 5,
                        FAILED = 6,
                        CANCELLED = 7
                    }
                }

                /** Properties of a Progress. */
                interface IProgress {

                    /** Progress workCompleted */
                    workCompleted?: (number|Long|string|null);

                    /** Progress workEstimated */
                    workEstimated?: (number|Long|string|null);
                }

                /** Represents a Progress. */
                class Progress implements IProgress {

                    /**
                     * Constructs a new Progress.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IProgress);

                    /** Progress workCompleted. */
                    public workCompleted: (number|Long|string);

                    /** Progress workEstimated. */
                    public workEstimated: (number|Long|string);

                    /**
                     * Creates a new Progress instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Progress instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IProgress): google.datastore.admin.v1.Progress;

                    /**
                     * Encodes the specified Progress message. Does not implicitly {@link google.datastore.admin.v1.Progress.verify|verify} messages.
                     * @param message Progress message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IProgress, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Progress message, length delimited. Does not implicitly {@link google.datastore.admin.v1.Progress.verify|verify} messages.
                     * @param message Progress message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IProgress, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Progress message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Progress
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.Progress;

                    /**
                     * Decodes a Progress message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Progress
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.Progress;

                    /**
                     * Verifies a Progress message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Progress message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Progress
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.Progress;

                    /**
                     * Creates a plain object from a Progress message. Also converts values to other types if specified.
                     * @param message Progress
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.Progress, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Progress to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ExportEntitiesRequest. */
                interface IExportEntitiesRequest {

                    /** ExportEntitiesRequest projectId */
                    projectId?: (string|null);

                    /** ExportEntitiesRequest labels */
                    labels?: ({ [k: string]: string }|null);

                    /** ExportEntitiesRequest entityFilter */
                    entityFilter?: (google.datastore.admin.v1.IEntityFilter|null);

                    /** ExportEntitiesRequest outputUrlPrefix */
                    outputUrlPrefix?: (string|null);
                }

                /** Represents an ExportEntitiesRequest. */
                class ExportEntitiesRequest implements IExportEntitiesRequest {

                    /**
                     * Constructs a new ExportEntitiesRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IExportEntitiesRequest);

                    /** ExportEntitiesRequest projectId. */
                    public projectId: string;

                    /** ExportEntitiesRequest labels. */
                    public labels: { [k: string]: string };

                    /** ExportEntitiesRequest entityFilter. */
                    public entityFilter?: (google.datastore.admin.v1.IEntityFilter|null);

                    /** ExportEntitiesRequest outputUrlPrefix. */
                    public outputUrlPrefix: string;

                    /**
                     * Creates a new ExportEntitiesRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ExportEntitiesRequest instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IExportEntitiesRequest): google.datastore.admin.v1.ExportEntitiesRequest;

                    /**
                     * Encodes the specified ExportEntitiesRequest message. Does not implicitly {@link google.datastore.admin.v1.ExportEntitiesRequest.verify|verify} messages.
                     * @param message ExportEntitiesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IExportEntitiesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ExportEntitiesRequest message, length delimited. Does not implicitly {@link google.datastore.admin.v1.ExportEntitiesRequest.verify|verify} messages.
                     * @param message ExportEntitiesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IExportEntitiesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ExportEntitiesRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ExportEntitiesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.ExportEntitiesRequest;

                    /**
                     * Decodes an ExportEntitiesRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ExportEntitiesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.ExportEntitiesRequest;

                    /**
                     * Verifies an ExportEntitiesRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ExportEntitiesRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ExportEntitiesRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.ExportEntitiesRequest;

                    /**
                     * Creates a plain object from an ExportEntitiesRequest message. Also converts values to other types if specified.
                     * @param message ExportEntitiesRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.ExportEntitiesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ExportEntitiesRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ImportEntitiesRequest. */
                interface IImportEntitiesRequest {

                    /** ImportEntitiesRequest projectId */
                    projectId?: (string|null);

                    /** ImportEntitiesRequest labels */
                    labels?: ({ [k: string]: string }|null);

                    /** ImportEntitiesRequest inputUrl */
                    inputUrl?: (string|null);

                    /** ImportEntitiesRequest entityFilter */
                    entityFilter?: (google.datastore.admin.v1.IEntityFilter|null);
                }

                /** Represents an ImportEntitiesRequest. */
                class ImportEntitiesRequest implements IImportEntitiesRequest {

                    /**
                     * Constructs a new ImportEntitiesRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IImportEntitiesRequest);

                    /** ImportEntitiesRequest projectId. */
                    public projectId: string;

                    /** ImportEntitiesRequest labels. */
                    public labels: { [k: string]: string };

                    /** ImportEntitiesRequest inputUrl. */
                    public inputUrl: string;

                    /** ImportEntitiesRequest entityFilter. */
                    public entityFilter?: (google.datastore.admin.v1.IEntityFilter|null);

                    /**
                     * Creates a new ImportEntitiesRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ImportEntitiesRequest instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IImportEntitiesRequest): google.datastore.admin.v1.ImportEntitiesRequest;

                    /**
                     * Encodes the specified ImportEntitiesRequest message. Does not implicitly {@link google.datastore.admin.v1.ImportEntitiesRequest.verify|verify} messages.
                     * @param message ImportEntitiesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IImportEntitiesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ImportEntitiesRequest message, length delimited. Does not implicitly {@link google.datastore.admin.v1.ImportEntitiesRequest.verify|verify} messages.
                     * @param message ImportEntitiesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IImportEntitiesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ImportEntitiesRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ImportEntitiesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.ImportEntitiesRequest;

                    /**
                     * Decodes an ImportEntitiesRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ImportEntitiesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.ImportEntitiesRequest;

                    /**
                     * Verifies an ImportEntitiesRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ImportEntitiesRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ImportEntitiesRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.ImportEntitiesRequest;

                    /**
                     * Creates a plain object from an ImportEntitiesRequest message. Also converts values to other types if specified.
                     * @param message ImportEntitiesRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.ImportEntitiesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ImportEntitiesRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ExportEntitiesResponse. */
                interface IExportEntitiesResponse {

                    /** ExportEntitiesResponse outputUrl */
                    outputUrl?: (string|null);
                }

                /** Represents an ExportEntitiesResponse. */
                class ExportEntitiesResponse implements IExportEntitiesResponse {

                    /**
                     * Constructs a new ExportEntitiesResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IExportEntitiesResponse);

                    /** ExportEntitiesResponse outputUrl. */
                    public outputUrl: string;

                    /**
                     * Creates a new ExportEntitiesResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ExportEntitiesResponse instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IExportEntitiesResponse): google.datastore.admin.v1.ExportEntitiesResponse;

                    /**
                     * Encodes the specified ExportEntitiesResponse message. Does not implicitly {@link google.datastore.admin.v1.ExportEntitiesResponse.verify|verify} messages.
                     * @param message ExportEntitiesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IExportEntitiesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ExportEntitiesResponse message, length delimited. Does not implicitly {@link google.datastore.admin.v1.ExportEntitiesResponse.verify|verify} messages.
                     * @param message ExportEntitiesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IExportEntitiesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ExportEntitiesResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ExportEntitiesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.ExportEntitiesResponse;

                    /**
                     * Decodes an ExportEntitiesResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ExportEntitiesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.ExportEntitiesResponse;

                    /**
                     * Verifies an ExportEntitiesResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ExportEntitiesResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ExportEntitiesResponse
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.ExportEntitiesResponse;

                    /**
                     * Creates a plain object from an ExportEntitiesResponse message. Also converts values to other types if specified.
                     * @param message ExportEntitiesResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.ExportEntitiesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ExportEntitiesResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ExportEntitiesMetadata. */
                interface IExportEntitiesMetadata {

                    /** ExportEntitiesMetadata common */
                    common?: (google.datastore.admin.v1.ICommonMetadata|null);

                    /** ExportEntitiesMetadata progressEntities */
                    progressEntities?: (google.datastore.admin.v1.IProgress|null);

                    /** ExportEntitiesMetadata progressBytes */
                    progressBytes?: (google.datastore.admin.v1.IProgress|null);

                    /** ExportEntitiesMetadata entityFilter */
                    entityFilter?: (google.datastore.admin.v1.IEntityFilter|null);

                    /** ExportEntitiesMetadata outputUrlPrefix */
                    outputUrlPrefix?: (string|null);
                }

                /** Represents an ExportEntitiesMetadata. */
                class ExportEntitiesMetadata implements IExportEntitiesMetadata {

                    /**
                     * Constructs a new ExportEntitiesMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IExportEntitiesMetadata);

                    /** ExportEntitiesMetadata common. */
                    public common?: (google.datastore.admin.v1.ICommonMetadata|null);

                    /** ExportEntitiesMetadata progressEntities. */
                    public progressEntities?: (google.datastore.admin.v1.IProgress|null);

                    /** ExportEntitiesMetadata progressBytes. */
                    public progressBytes?: (google.datastore.admin.v1.IProgress|null);

                    /** ExportEntitiesMetadata entityFilter. */
                    public entityFilter?: (google.datastore.admin.v1.IEntityFilter|null);

                    /** ExportEntitiesMetadata outputUrlPrefix. */
                    public outputUrlPrefix: string;

                    /**
                     * Creates a new ExportEntitiesMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ExportEntitiesMetadata instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IExportEntitiesMetadata): google.datastore.admin.v1.ExportEntitiesMetadata;

                    /**
                     * Encodes the specified ExportEntitiesMetadata message. Does not implicitly {@link google.datastore.admin.v1.ExportEntitiesMetadata.verify|verify} messages.
                     * @param message ExportEntitiesMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IExportEntitiesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ExportEntitiesMetadata message, length delimited. Does not implicitly {@link google.datastore.admin.v1.ExportEntitiesMetadata.verify|verify} messages.
                     * @param message ExportEntitiesMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IExportEntitiesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ExportEntitiesMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ExportEntitiesMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.ExportEntitiesMetadata;

                    /**
                     * Decodes an ExportEntitiesMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ExportEntitiesMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.ExportEntitiesMetadata;

                    /**
                     * Verifies an ExportEntitiesMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ExportEntitiesMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ExportEntitiesMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.ExportEntitiesMetadata;

                    /**
                     * Creates a plain object from an ExportEntitiesMetadata message. Also converts values to other types if specified.
                     * @param message ExportEntitiesMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.ExportEntitiesMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ExportEntitiesMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** OperationType enum. */
                enum OperationType {
                    OPERATION_TYPE_UNSPECIFIED = 0,
                    EXPORT_ENTITIES = 1,
                    IMPORT_ENTITIES = 2,
                    CREATE_INDEX = 3,
                    DELETE_INDEX = 4
                }

                /** Properties of an ImportEntitiesMetadata. */
                interface IImportEntitiesMetadata {

                    /** ImportEntitiesMetadata common */
                    common?: (google.datastore.admin.v1.ICommonMetadata|null);

                    /** ImportEntitiesMetadata progressEntities */
                    progressEntities?: (google.datastore.admin.v1.IProgress|null);

                    /** ImportEntitiesMetadata progressBytes */
                    progressBytes?: (google.datastore.admin.v1.IProgress|null);

                    /** ImportEntitiesMetadata entityFilter */
                    entityFilter?: (google.datastore.admin.v1.IEntityFilter|null);

                    /** ImportEntitiesMetadata inputUrl */
                    inputUrl?: (string|null);
                }

                /** Represents an ImportEntitiesMetadata. */
                class ImportEntitiesMetadata implements IImportEntitiesMetadata {

                    /**
                     * Constructs a new ImportEntitiesMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IImportEntitiesMetadata);

                    /** ImportEntitiesMetadata common. */
                    public common?: (google.datastore.admin.v1.ICommonMetadata|null);

                    /** ImportEntitiesMetadata progressEntities. */
                    public progressEntities?: (google.datastore.admin.v1.IProgress|null);

                    /** ImportEntitiesMetadata progressBytes. */
                    public progressBytes?: (google.datastore.admin.v1.IProgress|null);

                    /** ImportEntitiesMetadata entityFilter. */
                    public entityFilter?: (google.datastore.admin.v1.IEntityFilter|null);

                    /** ImportEntitiesMetadata inputUrl. */
                    public inputUrl: string;

                    /**
                     * Creates a new ImportEntitiesMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ImportEntitiesMetadata instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IImportEntitiesMetadata): google.datastore.admin.v1.ImportEntitiesMetadata;

                    /**
                     * Encodes the specified ImportEntitiesMetadata message. Does not implicitly {@link google.datastore.admin.v1.ImportEntitiesMetadata.verify|verify} messages.
                     * @param message ImportEntitiesMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IImportEntitiesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ImportEntitiesMetadata message, length delimited. Does not implicitly {@link google.datastore.admin.v1.ImportEntitiesMetadata.verify|verify} messages.
                     * @param message ImportEntitiesMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IImportEntitiesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ImportEntitiesMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ImportEntitiesMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.ImportEntitiesMetadata;

                    /**
                     * Decodes an ImportEntitiesMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ImportEntitiesMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.ImportEntitiesMetadata;

                    /**
                     * Verifies an ImportEntitiesMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ImportEntitiesMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ImportEntitiesMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.ImportEntitiesMetadata;

                    /**
                     * Creates a plain object from an ImportEntitiesMetadata message. Also converts values to other types if specified.
                     * @param message ImportEntitiesMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.ImportEntitiesMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ImportEntitiesMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an EntityFilter. */
                interface IEntityFilter {

                    /** EntityFilter kinds */
                    kinds?: (string[]|null);

                    /** EntityFilter namespaceIds */
                    namespaceIds?: (string[]|null);
                }

                /** Represents an EntityFilter. */
                class EntityFilter implements IEntityFilter {

                    /**
                     * Constructs a new EntityFilter.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IEntityFilter);

                    /** EntityFilter kinds. */
                    public kinds: string[];

                    /** EntityFilter namespaceIds. */
                    public namespaceIds: string[];

                    /**
                     * Creates a new EntityFilter instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns EntityFilter instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IEntityFilter): google.datastore.admin.v1.EntityFilter;

                    /**
                     * Encodes the specified EntityFilter message. Does not implicitly {@link google.datastore.admin.v1.EntityFilter.verify|verify} messages.
                     * @param message EntityFilter message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IEntityFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified EntityFilter message, length delimited. Does not implicitly {@link google.datastore.admin.v1.EntityFilter.verify|verify} messages.
                     * @param message EntityFilter message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IEntityFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an EntityFilter message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns EntityFilter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.EntityFilter;

                    /**
                     * Decodes an EntityFilter message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns EntityFilter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.EntityFilter;

                    /**
                     * Verifies an EntityFilter message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an EntityFilter message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns EntityFilter
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.EntityFilter;

                    /**
                     * Creates a plain object from an EntityFilter message. Also converts values to other types if specified.
                     * @param message EntityFilter
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.EntityFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this EntityFilter to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CreateIndexRequest. */
                interface ICreateIndexRequest {

                    /** CreateIndexRequest projectId */
                    projectId?: (string|null);

                    /** CreateIndexRequest index */
                    index?: (google.datastore.admin.v1.IIndex|null);
                }

                /** Represents a CreateIndexRequest. */
                class CreateIndexRequest implements ICreateIndexRequest {

                    /**
                     * Constructs a new CreateIndexRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.ICreateIndexRequest);

                    /** CreateIndexRequest projectId. */
                    public projectId: string;

                    /** CreateIndexRequest index. */
                    public index?: (google.datastore.admin.v1.IIndex|null);

                    /**
                     * Creates a new CreateIndexRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CreateIndexRequest instance
                     */
                    public static create(properties?: google.datastore.admin.v1.ICreateIndexRequest): google.datastore.admin.v1.CreateIndexRequest;

                    /**
                     * Encodes the specified CreateIndexRequest message. Does not implicitly {@link google.datastore.admin.v1.CreateIndexRequest.verify|verify} messages.
                     * @param message CreateIndexRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.ICreateIndexRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CreateIndexRequest message, length delimited. Does not implicitly {@link google.datastore.admin.v1.CreateIndexRequest.verify|verify} messages.
                     * @param message CreateIndexRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.ICreateIndexRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CreateIndexRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CreateIndexRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.CreateIndexRequest;

                    /**
                     * Decodes a CreateIndexRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CreateIndexRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.CreateIndexRequest;

                    /**
                     * Verifies a CreateIndexRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CreateIndexRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CreateIndexRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.CreateIndexRequest;

                    /**
                     * Creates a plain object from a CreateIndexRequest message. Also converts values to other types if specified.
                     * @param message CreateIndexRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.CreateIndexRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CreateIndexRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DeleteIndexRequest. */
                interface IDeleteIndexRequest {

                    /** DeleteIndexRequest projectId */
                    projectId?: (string|null);

                    /** DeleteIndexRequest indexId */
                    indexId?: (string|null);
                }

                /** Represents a DeleteIndexRequest. */
                class DeleteIndexRequest implements IDeleteIndexRequest {

                    /**
                     * Constructs a new DeleteIndexRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IDeleteIndexRequest);

                    /** DeleteIndexRequest projectId. */
                    public projectId: string;

                    /** DeleteIndexRequest indexId. */
                    public indexId: string;

                    /**
                     * Creates a new DeleteIndexRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeleteIndexRequest instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IDeleteIndexRequest): google.datastore.admin.v1.DeleteIndexRequest;

                    /**
                     * Encodes the specified DeleteIndexRequest message. Does not implicitly {@link google.datastore.admin.v1.DeleteIndexRequest.verify|verify} messages.
                     * @param message DeleteIndexRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IDeleteIndexRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeleteIndexRequest message, length delimited. Does not implicitly {@link google.datastore.admin.v1.DeleteIndexRequest.verify|verify} messages.
                     * @param message DeleteIndexRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IDeleteIndexRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeleteIndexRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeleteIndexRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.DeleteIndexRequest;

                    /**
                     * Decodes a DeleteIndexRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeleteIndexRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.DeleteIndexRequest;

                    /**
                     * Verifies a DeleteIndexRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeleteIndexRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeleteIndexRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.DeleteIndexRequest;

                    /**
                     * Creates a plain object from a DeleteIndexRequest message. Also converts values to other types if specified.
                     * @param message DeleteIndexRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.DeleteIndexRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeleteIndexRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GetIndexRequest. */
                interface IGetIndexRequest {

                    /** GetIndexRequest projectId */
                    projectId?: (string|null);

                    /** GetIndexRequest indexId */
                    indexId?: (string|null);
                }

                /** Represents a GetIndexRequest. */
                class GetIndexRequest implements IGetIndexRequest {

                    /**
                     * Constructs a new GetIndexRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IGetIndexRequest);

                    /** GetIndexRequest projectId. */
                    public projectId: string;

                    /** GetIndexRequest indexId. */
                    public indexId: string;

                    /**
                     * Creates a new GetIndexRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GetIndexRequest instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IGetIndexRequest): google.datastore.admin.v1.GetIndexRequest;

                    /**
                     * Encodes the specified GetIndexRequest message. Does not implicitly {@link google.datastore.admin.v1.GetIndexRequest.verify|verify} messages.
                     * @param message GetIndexRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IGetIndexRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GetIndexRequest message, length delimited. Does not implicitly {@link google.datastore.admin.v1.GetIndexRequest.verify|verify} messages.
                     * @param message GetIndexRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IGetIndexRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GetIndexRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GetIndexRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.GetIndexRequest;

                    /**
                     * Decodes a GetIndexRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GetIndexRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.GetIndexRequest;

                    /**
                     * Verifies a GetIndexRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GetIndexRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GetIndexRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.GetIndexRequest;

                    /**
                     * Creates a plain object from a GetIndexRequest message. Also converts values to other types if specified.
                     * @param message GetIndexRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.GetIndexRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GetIndexRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListIndexesRequest. */
                interface IListIndexesRequest {

                    /** ListIndexesRequest projectId */
                    projectId?: (string|null);

                    /** ListIndexesRequest filter */
                    filter?: (string|null);

                    /** ListIndexesRequest pageSize */
                    pageSize?: (number|null);

                    /** ListIndexesRequest pageToken */
                    pageToken?: (string|null);
                }

                /** Represents a ListIndexesRequest. */
                class ListIndexesRequest implements IListIndexesRequest {

                    /**
                     * Constructs a new ListIndexesRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IListIndexesRequest);

                    /** ListIndexesRequest projectId. */
                    public projectId: string;

                    /** ListIndexesRequest filter. */
                    public filter: string;

                    /** ListIndexesRequest pageSize. */
                    public pageSize: number;

                    /** ListIndexesRequest pageToken. */
                    public pageToken: string;

                    /**
                     * Creates a new ListIndexesRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListIndexesRequest instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IListIndexesRequest): google.datastore.admin.v1.ListIndexesRequest;

                    /**
                     * Encodes the specified ListIndexesRequest message. Does not implicitly {@link google.datastore.admin.v1.ListIndexesRequest.verify|verify} messages.
                     * @param message ListIndexesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IListIndexesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListIndexesRequest message, length delimited. Does not implicitly {@link google.datastore.admin.v1.ListIndexesRequest.verify|verify} messages.
                     * @param message ListIndexesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IListIndexesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListIndexesRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListIndexesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.ListIndexesRequest;

                    /**
                     * Decodes a ListIndexesRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListIndexesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.ListIndexesRequest;

                    /**
                     * Verifies a ListIndexesRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListIndexesRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListIndexesRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.ListIndexesRequest;

                    /**
                     * Creates a plain object from a ListIndexesRequest message. Also converts values to other types if specified.
                     * @param message ListIndexesRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.ListIndexesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListIndexesRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListIndexesResponse. */
                interface IListIndexesResponse {

                    /** ListIndexesResponse indexes */
                    indexes?: (google.datastore.admin.v1.IIndex[]|null);

                    /** ListIndexesResponse nextPageToken */
                    nextPageToken?: (string|null);
                }

                /** Represents a ListIndexesResponse. */
                class ListIndexesResponse implements IListIndexesResponse {

                    /**
                     * Constructs a new ListIndexesResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IListIndexesResponse);

                    /** ListIndexesResponse indexes. */
                    public indexes: google.datastore.admin.v1.IIndex[];

                    /** ListIndexesResponse nextPageToken. */
                    public nextPageToken: string;

                    /**
                     * Creates a new ListIndexesResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListIndexesResponse instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IListIndexesResponse): google.datastore.admin.v1.ListIndexesResponse;

                    /**
                     * Encodes the specified ListIndexesResponse message. Does not implicitly {@link google.datastore.admin.v1.ListIndexesResponse.verify|verify} messages.
                     * @param message ListIndexesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IListIndexesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListIndexesResponse message, length delimited. Does not implicitly {@link google.datastore.admin.v1.ListIndexesResponse.verify|verify} messages.
                     * @param message ListIndexesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IListIndexesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListIndexesResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListIndexesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.ListIndexesResponse;

                    /**
                     * Decodes a ListIndexesResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListIndexesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.ListIndexesResponse;

                    /**
                     * Verifies a ListIndexesResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListIndexesResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListIndexesResponse
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.ListIndexesResponse;

                    /**
                     * Creates a plain object from a ListIndexesResponse message. Also converts values to other types if specified.
                     * @param message ListIndexesResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.ListIndexesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListIndexesResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an IndexOperationMetadata. */
                interface IIndexOperationMetadata {

                    /** IndexOperationMetadata common */
                    common?: (google.datastore.admin.v1.ICommonMetadata|null);

                    /** IndexOperationMetadata progressEntities */
                    progressEntities?: (google.datastore.admin.v1.IProgress|null);

                    /** IndexOperationMetadata indexId */
                    indexId?: (string|null);
                }

                /** Represents an IndexOperationMetadata. */
                class IndexOperationMetadata implements IIndexOperationMetadata {

                    /**
                     * Constructs a new IndexOperationMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IIndexOperationMetadata);

                    /** IndexOperationMetadata common. */
                    public common?: (google.datastore.admin.v1.ICommonMetadata|null);

                    /** IndexOperationMetadata progressEntities. */
                    public progressEntities?: (google.datastore.admin.v1.IProgress|null);

                    /** IndexOperationMetadata indexId. */
                    public indexId: string;

                    /**
                     * Creates a new IndexOperationMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns IndexOperationMetadata instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IIndexOperationMetadata): google.datastore.admin.v1.IndexOperationMetadata;

                    /**
                     * Encodes the specified IndexOperationMetadata message. Does not implicitly {@link google.datastore.admin.v1.IndexOperationMetadata.verify|verify} messages.
                     * @param message IndexOperationMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IIndexOperationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified IndexOperationMetadata message, length delimited. Does not implicitly {@link google.datastore.admin.v1.IndexOperationMetadata.verify|verify} messages.
                     * @param message IndexOperationMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IIndexOperationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an IndexOperationMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns IndexOperationMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.IndexOperationMetadata;

                    /**
                     * Decodes an IndexOperationMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns IndexOperationMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.IndexOperationMetadata;

                    /**
                     * Verifies an IndexOperationMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an IndexOperationMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns IndexOperationMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.IndexOperationMetadata;

                    /**
                     * Creates a plain object from an IndexOperationMetadata message. Also converts values to other types if specified.
                     * @param message IndexOperationMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.IndexOperationMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this IndexOperationMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an Index. */
                interface IIndex {

                    /** Index projectId */
                    projectId?: (string|null);

                    /** Index indexId */
                    indexId?: (string|null);

                    /** Index kind */
                    kind?: (string|null);

                    /** Index ancestor */
                    ancestor?: (google.datastore.admin.v1.Index.AncestorMode|keyof typeof google.datastore.admin.v1.Index.AncestorMode|null);

                    /** Index properties */
                    properties?: (google.datastore.admin.v1.Index.IIndexedProperty[]|null);

                    /** Index state */
                    state?: (google.datastore.admin.v1.Index.State|keyof typeof google.datastore.admin.v1.Index.State|null);
                }

                /** Represents an Index. */
                class Index implements IIndex {

                    /**
                     * Constructs a new Index.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.admin.v1.IIndex);

                    /** Index projectId. */
                    public projectId: string;

                    /** Index indexId. */
                    public indexId: string;

                    /** Index kind. */
                    public kind: string;

                    /** Index ancestor. */
                    public ancestor: (google.datastore.admin.v1.Index.AncestorMode|keyof typeof google.datastore.admin.v1.Index.AncestorMode);

                    /** Index properties. */
                    public properties: google.datastore.admin.v1.Index.IIndexedProperty[];

                    /** Index state. */
                    public state: (google.datastore.admin.v1.Index.State|keyof typeof google.datastore.admin.v1.Index.State);

                    /**
                     * Creates a new Index instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Index instance
                     */
                    public static create(properties?: google.datastore.admin.v1.IIndex): google.datastore.admin.v1.Index;

                    /**
                     * Encodes the specified Index message. Does not implicitly {@link google.datastore.admin.v1.Index.verify|verify} messages.
                     * @param message Index message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.admin.v1.IIndex, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Index message, length delimited. Does not implicitly {@link google.datastore.admin.v1.Index.verify|verify} messages.
                     * @param message Index message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.admin.v1.IIndex, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Index message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Index
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.Index;

                    /**
                     * Decodes an Index message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Index
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.Index;

                    /**
                     * Verifies an Index message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Index message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Index
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.Index;

                    /**
                     * Creates a plain object from an Index message. Also converts values to other types if specified.
                     * @param message Index
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.admin.v1.Index, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Index to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace Index {

                    /** Properties of an IndexedProperty. */
                    interface IIndexedProperty {

                        /** IndexedProperty name */
                        name?: (string|null);

                        /** IndexedProperty direction */
                        direction?: (google.datastore.admin.v1.Index.Direction|keyof typeof google.datastore.admin.v1.Index.Direction|null);
                    }

                    /** Represents an IndexedProperty. */
                    class IndexedProperty implements IIndexedProperty {

                        /**
                         * Constructs a new IndexedProperty.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.datastore.admin.v1.Index.IIndexedProperty);

                        /** IndexedProperty name. */
                        public name: string;

                        /** IndexedProperty direction. */
                        public direction: (google.datastore.admin.v1.Index.Direction|keyof typeof google.datastore.admin.v1.Index.Direction);

                        /**
                         * Creates a new IndexedProperty instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns IndexedProperty instance
                         */
                        public static create(properties?: google.datastore.admin.v1.Index.IIndexedProperty): google.datastore.admin.v1.Index.IndexedProperty;

                        /**
                         * Encodes the specified IndexedProperty message. Does not implicitly {@link google.datastore.admin.v1.Index.IndexedProperty.verify|verify} messages.
                         * @param message IndexedProperty message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.datastore.admin.v1.Index.IIndexedProperty, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified IndexedProperty message, length delimited. Does not implicitly {@link google.datastore.admin.v1.Index.IndexedProperty.verify|verify} messages.
                         * @param message IndexedProperty message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.datastore.admin.v1.Index.IIndexedProperty, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an IndexedProperty message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns IndexedProperty
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.admin.v1.Index.IndexedProperty;

                        /**
                         * Decodes an IndexedProperty message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns IndexedProperty
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.admin.v1.Index.IndexedProperty;

                        /**
                         * Verifies an IndexedProperty message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an IndexedProperty message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns IndexedProperty
                         */
                        public static fromObject(object: { [k: string]: any }): google.datastore.admin.v1.Index.IndexedProperty;

                        /**
                         * Creates a plain object from an IndexedProperty message. Also converts values to other types if specified.
                         * @param message IndexedProperty
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.datastore.admin.v1.Index.IndexedProperty, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this IndexedProperty to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** AncestorMode enum. */
                    enum AncestorMode {
                        ANCESTOR_MODE_UNSPECIFIED = 0,
                        NONE = 1,
                        ALL_ANCESTORS = 2
                    }

                    /** Direction enum. */
                    enum Direction {
                        DIRECTION_UNSPECIFIED = 0,
                        ASCENDING = 1,
                        DESCENDING = 2
                    }

                    /** State enum. */
                    enum State {
                        STATE_UNSPECIFIED = 0,
                        CREATING = 1,
                        READY = 2,
                        DELETING = 3,
                        ERROR = 4
                    }
                }
            }
        }

        /** Namespace v1. */
        namespace v1 {

            /** Represents a Datastore */
            class Datastore extends $protobuf.rpc.Service {

                /**
                 * Constructs a new Datastore service.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 */
                constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                /**
                 * Creates new Datastore service using the specified rpc implementation.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 * @returns RPC service. Useful where requests and/or responses are streamed.
                 */
                public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Datastore;

                /**
                 * Calls Lookup.
                 * @param request LookupRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and LookupResponse
                 */
                public lookup(request: google.datastore.v1.ILookupRequest, callback: google.datastore.v1.Datastore.LookupCallback): void;

                /**
                 * Calls Lookup.
                 * @param request LookupRequest message or plain object
                 * @returns Promise
                 */
                public lookup(request: google.datastore.v1.ILookupRequest): Promise<google.datastore.v1.LookupResponse>;

                /**
                 * Calls RunQuery.
                 * @param request RunQueryRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and RunQueryResponse
                 */
                public runQuery(request: google.datastore.v1.IRunQueryRequest, callback: google.datastore.v1.Datastore.RunQueryCallback): void;

                /**
                 * Calls RunQuery.
                 * @param request RunQueryRequest message or plain object
                 * @returns Promise
                 */
                public runQuery(request: google.datastore.v1.IRunQueryRequest): Promise<google.datastore.v1.RunQueryResponse>;

                /**
                 * Calls BeginTransaction.
                 * @param request BeginTransactionRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and BeginTransactionResponse
                 */
                public beginTransaction(request: google.datastore.v1.IBeginTransactionRequest, callback: google.datastore.v1.Datastore.BeginTransactionCallback): void;

                /**
                 * Calls BeginTransaction.
                 * @param request BeginTransactionRequest message or plain object
                 * @returns Promise
                 */
                public beginTransaction(request: google.datastore.v1.IBeginTransactionRequest): Promise<google.datastore.v1.BeginTransactionResponse>;

                /**
                 * Calls Commit.
                 * @param request CommitRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and CommitResponse
                 */
                public commit(request: google.datastore.v1.ICommitRequest, callback: google.datastore.v1.Datastore.CommitCallback): void;

                /**
                 * Calls Commit.
                 * @param request CommitRequest message or plain object
                 * @returns Promise
                 */
                public commit(request: google.datastore.v1.ICommitRequest): Promise<google.datastore.v1.CommitResponse>;

                /**
                 * Calls Rollback.
                 * @param request RollbackRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and RollbackResponse
                 */
                public rollback(request: google.datastore.v1.IRollbackRequest, callback: google.datastore.v1.Datastore.RollbackCallback): void;

                /**
                 * Calls Rollback.
                 * @param request RollbackRequest message or plain object
                 * @returns Promise
                 */
                public rollback(request: google.datastore.v1.IRollbackRequest): Promise<google.datastore.v1.RollbackResponse>;

                /**
                 * Calls AllocateIds.
                 * @param request AllocateIdsRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and AllocateIdsResponse
                 */
                public allocateIds(request: google.datastore.v1.IAllocateIdsRequest, callback: google.datastore.v1.Datastore.AllocateIdsCallback): void;

                /**
                 * Calls AllocateIds.
                 * @param request AllocateIdsRequest message or plain object
                 * @returns Promise
                 */
                public allocateIds(request: google.datastore.v1.IAllocateIdsRequest): Promise<google.datastore.v1.AllocateIdsResponse>;

                /**
                 * Calls ReserveIds.
                 * @param request ReserveIdsRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and ReserveIdsResponse
                 */
                public reserveIds(request: google.datastore.v1.IReserveIdsRequest, callback: google.datastore.v1.Datastore.ReserveIdsCallback): void;

                /**
                 * Calls ReserveIds.
                 * @param request ReserveIdsRequest message or plain object
                 * @returns Promise
                 */
                public reserveIds(request: google.datastore.v1.IReserveIdsRequest): Promise<google.datastore.v1.ReserveIdsResponse>;
            }

            namespace Datastore {

                /**
                 * Callback as used by {@link google.datastore.v1.Datastore#lookup}.
                 * @param error Error, if any
                 * @param [response] LookupResponse
                 */
                type LookupCallback = (error: (Error|null), response?: google.datastore.v1.LookupResponse) => void;

                /**
                 * Callback as used by {@link google.datastore.v1.Datastore#runQuery}.
                 * @param error Error, if any
                 * @param [response] RunQueryResponse
                 */
                type RunQueryCallback = (error: (Error|null), response?: google.datastore.v1.RunQueryResponse) => void;

                /**
                 * Callback as used by {@link google.datastore.v1.Datastore#beginTransaction}.
                 * @param error Error, if any
                 * @param [response] BeginTransactionResponse
                 */
                type BeginTransactionCallback = (error: (Error|null), response?: google.datastore.v1.BeginTransactionResponse) => void;

                /**
                 * Callback as used by {@link google.datastore.v1.Datastore#commit}.
                 * @param error Error, if any
                 * @param [response] CommitResponse
                 */
                type CommitCallback = (error: (Error|null), response?: google.datastore.v1.CommitResponse) => void;

                /**
                 * Callback as used by {@link google.datastore.v1.Datastore#rollback}.
                 * @param error Error, if any
                 * @param [response] RollbackResponse
                 */
                type RollbackCallback = (error: (Error|null), response?: google.datastore.v1.RollbackResponse) => void;

                /**
                 * Callback as used by {@link google.datastore.v1.Datastore#allocateIds}.
                 * @param error Error, if any
                 * @param [response] AllocateIdsResponse
                 */
                type AllocateIdsCallback = (error: (Error|null), response?: google.datastore.v1.AllocateIdsResponse) => void;

                /**
                 * Callback as used by {@link google.datastore.v1.Datastore#reserveIds}.
                 * @param error Error, if any
                 * @param [response] ReserveIdsResponse
                 */
                type ReserveIdsCallback = (error: (Error|null), response?: google.datastore.v1.ReserveIdsResponse) => void;
            }

            /** Properties of a LookupRequest. */
            interface ILookupRequest {

                /** LookupRequest projectId */
                projectId?: (string|null);

                /** LookupRequest readOptions */
                readOptions?: (google.datastore.v1.IReadOptions|null);

                /** LookupRequest keys */
                keys?: (google.datastore.v1.IKey[]|null);
            }

            /** Represents a LookupRequest. */
            class LookupRequest implements ILookupRequest {

                /**
                 * Constructs a new LookupRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.ILookupRequest);

                /** LookupRequest projectId. */
                public projectId: string;

                /** LookupRequest readOptions. */
                public readOptions?: (google.datastore.v1.IReadOptions|null);

                /** LookupRequest keys. */
                public keys: google.datastore.v1.IKey[];

                /**
                 * Creates a new LookupRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LookupRequest instance
                 */
                public static create(properties?: google.datastore.v1.ILookupRequest): google.datastore.v1.LookupRequest;

                /**
                 * Encodes the specified LookupRequest message. Does not implicitly {@link google.datastore.v1.LookupRequest.verify|verify} messages.
                 * @param message LookupRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.ILookupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LookupRequest message, length delimited. Does not implicitly {@link google.datastore.v1.LookupRequest.verify|verify} messages.
                 * @param message LookupRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.ILookupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LookupRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LookupRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.LookupRequest;

                /**
                 * Decodes a LookupRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LookupRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.LookupRequest;

                /**
                 * Verifies a LookupRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LookupRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LookupRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.LookupRequest;

                /**
                 * Creates a plain object from a LookupRequest message. Also converts values to other types if specified.
                 * @param message LookupRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.LookupRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LookupRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a LookupResponse. */
            interface ILookupResponse {

                /** LookupResponse found */
                found?: (google.datastore.v1.IEntityResult[]|null);

                /** LookupResponse missing */
                missing?: (google.datastore.v1.IEntityResult[]|null);

                /** LookupResponse deferred */
                deferred?: (google.datastore.v1.IKey[]|null);
            }

            /** Represents a LookupResponse. */
            class LookupResponse implements ILookupResponse {

                /**
                 * Constructs a new LookupResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.ILookupResponse);

                /** LookupResponse found. */
                public found: google.datastore.v1.IEntityResult[];

                /** LookupResponse missing. */
                public missing: google.datastore.v1.IEntityResult[];

                /** LookupResponse deferred. */
                public deferred: google.datastore.v1.IKey[];

                /**
                 * Creates a new LookupResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LookupResponse instance
                 */
                public static create(properties?: google.datastore.v1.ILookupResponse): google.datastore.v1.LookupResponse;

                /**
                 * Encodes the specified LookupResponse message. Does not implicitly {@link google.datastore.v1.LookupResponse.verify|verify} messages.
                 * @param message LookupResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.ILookupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LookupResponse message, length delimited. Does not implicitly {@link google.datastore.v1.LookupResponse.verify|verify} messages.
                 * @param message LookupResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.ILookupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LookupResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LookupResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.LookupResponse;

                /**
                 * Decodes a LookupResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LookupResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.LookupResponse;

                /**
                 * Verifies a LookupResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LookupResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LookupResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.LookupResponse;

                /**
                 * Creates a plain object from a LookupResponse message. Also converts values to other types if specified.
                 * @param message LookupResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.LookupResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LookupResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RunQueryRequest. */
            interface IRunQueryRequest {

                /** RunQueryRequest projectId */
                projectId?: (string|null);

                /** RunQueryRequest partitionId */
                partitionId?: (google.datastore.v1.IPartitionId|null);

                /** RunQueryRequest readOptions */
                readOptions?: (google.datastore.v1.IReadOptions|null);

                /** RunQueryRequest query */
                query?: (google.datastore.v1.IQuery|null);

                /** RunQueryRequest gqlQuery */
                gqlQuery?: (google.datastore.v1.IGqlQuery|null);
            }

            /** Represents a RunQueryRequest. */
            class RunQueryRequest implements IRunQueryRequest {

                /**
                 * Constructs a new RunQueryRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IRunQueryRequest);

                /** RunQueryRequest projectId. */
                public projectId: string;

                /** RunQueryRequest partitionId. */
                public partitionId?: (google.datastore.v1.IPartitionId|null);

                /** RunQueryRequest readOptions. */
                public readOptions?: (google.datastore.v1.IReadOptions|null);

                /** RunQueryRequest query. */
                public query?: (google.datastore.v1.IQuery|null);

                /** RunQueryRequest gqlQuery. */
                public gqlQuery?: (google.datastore.v1.IGqlQuery|null);

                /** RunQueryRequest queryType. */
                public queryType?: ("query"|"gqlQuery");

                /**
                 * Creates a new RunQueryRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RunQueryRequest instance
                 */
                public static create(properties?: google.datastore.v1.IRunQueryRequest): google.datastore.v1.RunQueryRequest;

                /**
                 * Encodes the specified RunQueryRequest message. Does not implicitly {@link google.datastore.v1.RunQueryRequest.verify|verify} messages.
                 * @param message RunQueryRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IRunQueryRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RunQueryRequest message, length delimited. Does not implicitly {@link google.datastore.v1.RunQueryRequest.verify|verify} messages.
                 * @param message RunQueryRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IRunQueryRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RunQueryRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RunQueryRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.RunQueryRequest;

                /**
                 * Decodes a RunQueryRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RunQueryRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.RunQueryRequest;

                /**
                 * Verifies a RunQueryRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RunQueryRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RunQueryRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.RunQueryRequest;

                /**
                 * Creates a plain object from a RunQueryRequest message. Also converts values to other types if specified.
                 * @param message RunQueryRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.RunQueryRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RunQueryRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RunQueryResponse. */
            interface IRunQueryResponse {

                /** RunQueryResponse batch */
                batch?: (google.datastore.v1.IQueryResultBatch|null);

                /** RunQueryResponse query */
                query?: (google.datastore.v1.IQuery|null);
            }

            /** Represents a RunQueryResponse. */
            class RunQueryResponse implements IRunQueryResponse {

                /**
                 * Constructs a new RunQueryResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IRunQueryResponse);

                /** RunQueryResponse batch. */
                public batch?: (google.datastore.v1.IQueryResultBatch|null);

                /** RunQueryResponse query. */
                public query?: (google.datastore.v1.IQuery|null);

                /**
                 * Creates a new RunQueryResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RunQueryResponse instance
                 */
                public static create(properties?: google.datastore.v1.IRunQueryResponse): google.datastore.v1.RunQueryResponse;

                /**
                 * Encodes the specified RunQueryResponse message. Does not implicitly {@link google.datastore.v1.RunQueryResponse.verify|verify} messages.
                 * @param message RunQueryResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IRunQueryResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RunQueryResponse message, length delimited. Does not implicitly {@link google.datastore.v1.RunQueryResponse.verify|verify} messages.
                 * @param message RunQueryResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IRunQueryResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RunQueryResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RunQueryResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.RunQueryResponse;

                /**
                 * Decodes a RunQueryResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RunQueryResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.RunQueryResponse;

                /**
                 * Verifies a RunQueryResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RunQueryResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RunQueryResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.RunQueryResponse;

                /**
                 * Creates a plain object from a RunQueryResponse message. Also converts values to other types if specified.
                 * @param message RunQueryResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.RunQueryResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RunQueryResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a BeginTransactionRequest. */
            interface IBeginTransactionRequest {

                /** BeginTransactionRequest projectId */
                projectId?: (string|null);

                /** BeginTransactionRequest transactionOptions */
                transactionOptions?: (google.datastore.v1.ITransactionOptions|null);
            }

            /** Represents a BeginTransactionRequest. */
            class BeginTransactionRequest implements IBeginTransactionRequest {

                /**
                 * Constructs a new BeginTransactionRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IBeginTransactionRequest);

                /** BeginTransactionRequest projectId. */
                public projectId: string;

                /** BeginTransactionRequest transactionOptions. */
                public transactionOptions?: (google.datastore.v1.ITransactionOptions|null);

                /**
                 * Creates a new BeginTransactionRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BeginTransactionRequest instance
                 */
                public static create(properties?: google.datastore.v1.IBeginTransactionRequest): google.datastore.v1.BeginTransactionRequest;

                /**
                 * Encodes the specified BeginTransactionRequest message. Does not implicitly {@link google.datastore.v1.BeginTransactionRequest.verify|verify} messages.
                 * @param message BeginTransactionRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IBeginTransactionRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BeginTransactionRequest message, length delimited. Does not implicitly {@link google.datastore.v1.BeginTransactionRequest.verify|verify} messages.
                 * @param message BeginTransactionRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IBeginTransactionRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BeginTransactionRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BeginTransactionRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.BeginTransactionRequest;

                /**
                 * Decodes a BeginTransactionRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BeginTransactionRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.BeginTransactionRequest;

                /**
                 * Verifies a BeginTransactionRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BeginTransactionRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BeginTransactionRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.BeginTransactionRequest;

                /**
                 * Creates a plain object from a BeginTransactionRequest message. Also converts values to other types if specified.
                 * @param message BeginTransactionRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.BeginTransactionRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BeginTransactionRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a BeginTransactionResponse. */
            interface IBeginTransactionResponse {

                /** BeginTransactionResponse transaction */
                transaction?: (Uint8Array|string|null);
            }

            /** Represents a BeginTransactionResponse. */
            class BeginTransactionResponse implements IBeginTransactionResponse {

                /**
                 * Constructs a new BeginTransactionResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IBeginTransactionResponse);

                /** BeginTransactionResponse transaction. */
                public transaction: (Uint8Array|string);

                /**
                 * Creates a new BeginTransactionResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BeginTransactionResponse instance
                 */
                public static create(properties?: google.datastore.v1.IBeginTransactionResponse): google.datastore.v1.BeginTransactionResponse;

                /**
                 * Encodes the specified BeginTransactionResponse message. Does not implicitly {@link google.datastore.v1.BeginTransactionResponse.verify|verify} messages.
                 * @param message BeginTransactionResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IBeginTransactionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BeginTransactionResponse message, length delimited. Does not implicitly {@link google.datastore.v1.BeginTransactionResponse.verify|verify} messages.
                 * @param message BeginTransactionResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IBeginTransactionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BeginTransactionResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BeginTransactionResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.BeginTransactionResponse;

                /**
                 * Decodes a BeginTransactionResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BeginTransactionResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.BeginTransactionResponse;

                /**
                 * Verifies a BeginTransactionResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BeginTransactionResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BeginTransactionResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.BeginTransactionResponse;

                /**
                 * Creates a plain object from a BeginTransactionResponse message. Also converts values to other types if specified.
                 * @param message BeginTransactionResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.BeginTransactionResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BeginTransactionResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RollbackRequest. */
            interface IRollbackRequest {

                /** RollbackRequest projectId */
                projectId?: (string|null);

                /** RollbackRequest transaction */
                transaction?: (Uint8Array|string|null);
            }

            /** Represents a RollbackRequest. */
            class RollbackRequest implements IRollbackRequest {

                /**
                 * Constructs a new RollbackRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IRollbackRequest);

                /** RollbackRequest projectId. */
                public projectId: string;

                /** RollbackRequest transaction. */
                public transaction: (Uint8Array|string);

                /**
                 * Creates a new RollbackRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RollbackRequest instance
                 */
                public static create(properties?: google.datastore.v1.IRollbackRequest): google.datastore.v1.RollbackRequest;

                /**
                 * Encodes the specified RollbackRequest message. Does not implicitly {@link google.datastore.v1.RollbackRequest.verify|verify} messages.
                 * @param message RollbackRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IRollbackRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RollbackRequest message, length delimited. Does not implicitly {@link google.datastore.v1.RollbackRequest.verify|verify} messages.
                 * @param message RollbackRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IRollbackRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RollbackRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RollbackRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.RollbackRequest;

                /**
                 * Decodes a RollbackRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RollbackRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.RollbackRequest;

                /**
                 * Verifies a RollbackRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RollbackRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RollbackRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.RollbackRequest;

                /**
                 * Creates a plain object from a RollbackRequest message. Also converts values to other types if specified.
                 * @param message RollbackRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.RollbackRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RollbackRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RollbackResponse. */
            interface IRollbackResponse {
            }

            /** Represents a RollbackResponse. */
            class RollbackResponse implements IRollbackResponse {

                /**
                 * Constructs a new RollbackResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IRollbackResponse);

                /**
                 * Creates a new RollbackResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RollbackResponse instance
                 */
                public static create(properties?: google.datastore.v1.IRollbackResponse): google.datastore.v1.RollbackResponse;

                /**
                 * Encodes the specified RollbackResponse message. Does not implicitly {@link google.datastore.v1.RollbackResponse.verify|verify} messages.
                 * @param message RollbackResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IRollbackResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RollbackResponse message, length delimited. Does not implicitly {@link google.datastore.v1.RollbackResponse.verify|verify} messages.
                 * @param message RollbackResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IRollbackResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RollbackResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RollbackResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.RollbackResponse;

                /**
                 * Decodes a RollbackResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RollbackResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.RollbackResponse;

                /**
                 * Verifies a RollbackResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RollbackResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RollbackResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.RollbackResponse;

                /**
                 * Creates a plain object from a RollbackResponse message. Also converts values to other types if specified.
                 * @param message RollbackResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.RollbackResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RollbackResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CommitRequest. */
            interface ICommitRequest {

                /** CommitRequest projectId */
                projectId?: (string|null);

                /** CommitRequest mode */
                mode?: (google.datastore.v1.CommitRequest.Mode|keyof typeof google.datastore.v1.CommitRequest.Mode|null);

                /** CommitRequest transaction */
                transaction?: (Uint8Array|string|null);

                /** CommitRequest mutations */
                mutations?: (google.datastore.v1.IMutation[]|null);
            }

            /** Represents a CommitRequest. */
            class CommitRequest implements ICommitRequest {

                /**
                 * Constructs a new CommitRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.ICommitRequest);

                /** CommitRequest projectId. */
                public projectId: string;

                /** CommitRequest mode. */
                public mode: (google.datastore.v1.CommitRequest.Mode|keyof typeof google.datastore.v1.CommitRequest.Mode);

                /** CommitRequest transaction. */
                public transaction?: (Uint8Array|string|null);

                /** CommitRequest mutations. */
                public mutations: google.datastore.v1.IMutation[];

                /** CommitRequest transactionSelector. */
                public transactionSelector?: "transaction";

                /**
                 * Creates a new CommitRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommitRequest instance
                 */
                public static create(properties?: google.datastore.v1.ICommitRequest): google.datastore.v1.CommitRequest;

                /**
                 * Encodes the specified CommitRequest message. Does not implicitly {@link google.datastore.v1.CommitRequest.verify|verify} messages.
                 * @param message CommitRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.ICommitRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommitRequest message, length delimited. Does not implicitly {@link google.datastore.v1.CommitRequest.verify|verify} messages.
                 * @param message CommitRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.ICommitRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommitRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.CommitRequest;

                /**
                 * Decodes a CommitRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.CommitRequest;

                /**
                 * Verifies a CommitRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommitRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommitRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.CommitRequest;

                /**
                 * Creates a plain object from a CommitRequest message. Also converts values to other types if specified.
                 * @param message CommitRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.CommitRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommitRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace CommitRequest {

                /** Mode enum. */
                enum Mode {
                    MODE_UNSPECIFIED = 0,
                    TRANSACTIONAL = 1,
                    NON_TRANSACTIONAL = 2
                }
            }

            /** Properties of a CommitResponse. */
            interface ICommitResponse {

                /** CommitResponse mutationResults */
                mutationResults?: (google.datastore.v1.IMutationResult[]|null);

                /** CommitResponse indexUpdates */
                indexUpdates?: (number|null);
            }

            /** Represents a CommitResponse. */
            class CommitResponse implements ICommitResponse {

                /**
                 * Constructs a new CommitResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.ICommitResponse);

                /** CommitResponse mutationResults. */
                public mutationResults: google.datastore.v1.IMutationResult[];

                /** CommitResponse indexUpdates. */
                public indexUpdates: number;

                /**
                 * Creates a new CommitResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CommitResponse instance
                 */
                public static create(properties?: google.datastore.v1.ICommitResponse): google.datastore.v1.CommitResponse;

                /**
                 * Encodes the specified CommitResponse message. Does not implicitly {@link google.datastore.v1.CommitResponse.verify|verify} messages.
                 * @param message CommitResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.ICommitResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CommitResponse message, length delimited. Does not implicitly {@link google.datastore.v1.CommitResponse.verify|verify} messages.
                 * @param message CommitResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.ICommitResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CommitResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CommitResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.CommitResponse;

                /**
                 * Decodes a CommitResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CommitResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.CommitResponse;

                /**
                 * Verifies a CommitResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CommitResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CommitResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.CommitResponse;

                /**
                 * Creates a plain object from a CommitResponse message. Also converts values to other types if specified.
                 * @param message CommitResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.CommitResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CommitResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an AllocateIdsRequest. */
            interface IAllocateIdsRequest {

                /** AllocateIdsRequest projectId */
                projectId?: (string|null);

                /** AllocateIdsRequest keys */
                keys?: (google.datastore.v1.IKey[]|null);
            }

            /** Represents an AllocateIdsRequest. */
            class AllocateIdsRequest implements IAllocateIdsRequest {

                /**
                 * Constructs a new AllocateIdsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IAllocateIdsRequest);

                /** AllocateIdsRequest projectId. */
                public projectId: string;

                /** AllocateIdsRequest keys. */
                public keys: google.datastore.v1.IKey[];

                /**
                 * Creates a new AllocateIdsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AllocateIdsRequest instance
                 */
                public static create(properties?: google.datastore.v1.IAllocateIdsRequest): google.datastore.v1.AllocateIdsRequest;

                /**
                 * Encodes the specified AllocateIdsRequest message. Does not implicitly {@link google.datastore.v1.AllocateIdsRequest.verify|verify} messages.
                 * @param message AllocateIdsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IAllocateIdsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AllocateIdsRequest message, length delimited. Does not implicitly {@link google.datastore.v1.AllocateIdsRequest.verify|verify} messages.
                 * @param message AllocateIdsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IAllocateIdsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AllocateIdsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AllocateIdsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.AllocateIdsRequest;

                /**
                 * Decodes an AllocateIdsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AllocateIdsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.AllocateIdsRequest;

                /**
                 * Verifies an AllocateIdsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AllocateIdsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AllocateIdsRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.AllocateIdsRequest;

                /**
                 * Creates a plain object from an AllocateIdsRequest message. Also converts values to other types if specified.
                 * @param message AllocateIdsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.AllocateIdsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AllocateIdsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an AllocateIdsResponse. */
            interface IAllocateIdsResponse {

                /** AllocateIdsResponse keys */
                keys?: (google.datastore.v1.IKey[]|null);
            }

            /** Represents an AllocateIdsResponse. */
            class AllocateIdsResponse implements IAllocateIdsResponse {

                /**
                 * Constructs a new AllocateIdsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IAllocateIdsResponse);

                /** AllocateIdsResponse keys. */
                public keys: google.datastore.v1.IKey[];

                /**
                 * Creates a new AllocateIdsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AllocateIdsResponse instance
                 */
                public static create(properties?: google.datastore.v1.IAllocateIdsResponse): google.datastore.v1.AllocateIdsResponse;

                /**
                 * Encodes the specified AllocateIdsResponse message. Does not implicitly {@link google.datastore.v1.AllocateIdsResponse.verify|verify} messages.
                 * @param message AllocateIdsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IAllocateIdsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AllocateIdsResponse message, length delimited. Does not implicitly {@link google.datastore.v1.AllocateIdsResponse.verify|verify} messages.
                 * @param message AllocateIdsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IAllocateIdsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AllocateIdsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AllocateIdsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.AllocateIdsResponse;

                /**
                 * Decodes an AllocateIdsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AllocateIdsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.AllocateIdsResponse;

                /**
                 * Verifies an AllocateIdsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AllocateIdsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AllocateIdsResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.AllocateIdsResponse;

                /**
                 * Creates a plain object from an AllocateIdsResponse message. Also converts values to other types if specified.
                 * @param message AllocateIdsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.AllocateIdsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AllocateIdsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReserveIdsRequest. */
            interface IReserveIdsRequest {

                /** ReserveIdsRequest projectId */
                projectId?: (string|null);

                /** ReserveIdsRequest databaseId */
                databaseId?: (string|null);

                /** ReserveIdsRequest keys */
                keys?: (google.datastore.v1.IKey[]|null);
            }

            /** Represents a ReserveIdsRequest. */
            class ReserveIdsRequest implements IReserveIdsRequest {

                /**
                 * Constructs a new ReserveIdsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IReserveIdsRequest);

                /** ReserveIdsRequest projectId. */
                public projectId: string;

                /** ReserveIdsRequest databaseId. */
                public databaseId: string;

                /** ReserveIdsRequest keys. */
                public keys: google.datastore.v1.IKey[];

                /**
                 * Creates a new ReserveIdsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReserveIdsRequest instance
                 */
                public static create(properties?: google.datastore.v1.IReserveIdsRequest): google.datastore.v1.ReserveIdsRequest;

                /**
                 * Encodes the specified ReserveIdsRequest message. Does not implicitly {@link google.datastore.v1.ReserveIdsRequest.verify|verify} messages.
                 * @param message ReserveIdsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IReserveIdsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReserveIdsRequest message, length delimited. Does not implicitly {@link google.datastore.v1.ReserveIdsRequest.verify|verify} messages.
                 * @param message ReserveIdsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IReserveIdsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReserveIdsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReserveIdsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.ReserveIdsRequest;

                /**
                 * Decodes a ReserveIdsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReserveIdsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.ReserveIdsRequest;

                /**
                 * Verifies a ReserveIdsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReserveIdsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReserveIdsRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.ReserveIdsRequest;

                /**
                 * Creates a plain object from a ReserveIdsRequest message. Also converts values to other types if specified.
                 * @param message ReserveIdsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.ReserveIdsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReserveIdsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReserveIdsResponse. */
            interface IReserveIdsResponse {
            }

            /** Represents a ReserveIdsResponse. */
            class ReserveIdsResponse implements IReserveIdsResponse {

                /**
                 * Constructs a new ReserveIdsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IReserveIdsResponse);

                /**
                 * Creates a new ReserveIdsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReserveIdsResponse instance
                 */
                public static create(properties?: google.datastore.v1.IReserveIdsResponse): google.datastore.v1.ReserveIdsResponse;

                /**
                 * Encodes the specified ReserveIdsResponse message. Does not implicitly {@link google.datastore.v1.ReserveIdsResponse.verify|verify} messages.
                 * @param message ReserveIdsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IReserveIdsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReserveIdsResponse message, length delimited. Does not implicitly {@link google.datastore.v1.ReserveIdsResponse.verify|verify} messages.
                 * @param message ReserveIdsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IReserveIdsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReserveIdsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReserveIdsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.ReserveIdsResponse;

                /**
                 * Decodes a ReserveIdsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReserveIdsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.ReserveIdsResponse;

                /**
                 * Verifies a ReserveIdsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReserveIdsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReserveIdsResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.ReserveIdsResponse;

                /**
                 * Creates a plain object from a ReserveIdsResponse message. Also converts values to other types if specified.
                 * @param message ReserveIdsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.ReserveIdsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReserveIdsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Mutation. */
            interface IMutation {

                /** Mutation insert */
                insert?: (google.datastore.v1.IEntity|null);

                /** Mutation update */
                update?: (google.datastore.v1.IEntity|null);

                /** Mutation upsert */
                upsert?: (google.datastore.v1.IEntity|null);

                /** Mutation delete */
                "delete"?: (google.datastore.v1.IKey|null);

                /** Mutation baseVersion */
                baseVersion?: (number|Long|string|null);
            }

            /** Represents a Mutation. */
            class Mutation implements IMutation {

                /**
                 * Constructs a new Mutation.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IMutation);

                /** Mutation insert. */
                public insert?: (google.datastore.v1.IEntity|null);

                /** Mutation update. */
                public update?: (google.datastore.v1.IEntity|null);

                /** Mutation upsert. */
                public upsert?: (google.datastore.v1.IEntity|null);

                /** Mutation delete. */
                public delete?: (google.datastore.v1.IKey|null);

                /** Mutation baseVersion. */
                public baseVersion?: (number|Long|string|null);

                /** Mutation operation. */
                public operation?: ("insert"|"update"|"upsert"|"delete");

                /** Mutation conflictDetectionStrategy. */
                public conflictDetectionStrategy?: "baseVersion";

                /**
                 * Creates a new Mutation instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Mutation instance
                 */
                public static create(properties?: google.datastore.v1.IMutation): google.datastore.v1.Mutation;

                /**
                 * Encodes the specified Mutation message. Does not implicitly {@link google.datastore.v1.Mutation.verify|verify} messages.
                 * @param message Mutation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IMutation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Mutation message, length delimited. Does not implicitly {@link google.datastore.v1.Mutation.verify|verify} messages.
                 * @param message Mutation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IMutation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Mutation message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Mutation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.Mutation;

                /**
                 * Decodes a Mutation message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Mutation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.Mutation;

                /**
                 * Verifies a Mutation message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Mutation message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Mutation
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.Mutation;

                /**
                 * Creates a plain object from a Mutation message. Also converts values to other types if specified.
                 * @param message Mutation
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.Mutation, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Mutation to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a MutationResult. */
            interface IMutationResult {

                /** MutationResult key */
                key?: (google.datastore.v1.IKey|null);

                /** MutationResult version */
                version?: (number|Long|string|null);

                /** MutationResult conflictDetected */
                conflictDetected?: (boolean|null);
            }

            /** Represents a MutationResult. */
            class MutationResult implements IMutationResult {

                /**
                 * Constructs a new MutationResult.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IMutationResult);

                /** MutationResult key. */
                public key?: (google.datastore.v1.IKey|null);

                /** MutationResult version. */
                public version: (number|Long|string);

                /** MutationResult conflictDetected. */
                public conflictDetected: boolean;

                /**
                 * Creates a new MutationResult instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MutationResult instance
                 */
                public static create(properties?: google.datastore.v1.IMutationResult): google.datastore.v1.MutationResult;

                /**
                 * Encodes the specified MutationResult message. Does not implicitly {@link google.datastore.v1.MutationResult.verify|verify} messages.
                 * @param message MutationResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IMutationResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MutationResult message, length delimited. Does not implicitly {@link google.datastore.v1.MutationResult.verify|verify} messages.
                 * @param message MutationResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IMutationResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MutationResult message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MutationResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.MutationResult;

                /**
                 * Decodes a MutationResult message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MutationResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.MutationResult;

                /**
                 * Verifies a MutationResult message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MutationResult message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MutationResult
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.MutationResult;

                /**
                 * Creates a plain object from a MutationResult message. Also converts values to other types if specified.
                 * @param message MutationResult
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.MutationResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MutationResult to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReadOptions. */
            interface IReadOptions {

                /** ReadOptions readConsistency */
                readConsistency?: (google.datastore.v1.ReadOptions.ReadConsistency|keyof typeof google.datastore.v1.ReadOptions.ReadConsistency|null);

                /** ReadOptions transaction */
                transaction?: (Uint8Array|string|null);
            }

            /** Represents a ReadOptions. */
            class ReadOptions implements IReadOptions {

                /**
                 * Constructs a new ReadOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IReadOptions);

                /** ReadOptions readConsistency. */
                public readConsistency?: (google.datastore.v1.ReadOptions.ReadConsistency|keyof typeof google.datastore.v1.ReadOptions.ReadConsistency|null);

                /** ReadOptions transaction. */
                public transaction?: (Uint8Array|string|null);

                /** ReadOptions consistencyType. */
                public consistencyType?: ("readConsistency"|"transaction");

                /**
                 * Creates a new ReadOptions instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReadOptions instance
                 */
                public static create(properties?: google.datastore.v1.IReadOptions): google.datastore.v1.ReadOptions;

                /**
                 * Encodes the specified ReadOptions message. Does not implicitly {@link google.datastore.v1.ReadOptions.verify|verify} messages.
                 * @param message ReadOptions message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IReadOptions, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReadOptions message, length delimited. Does not implicitly {@link google.datastore.v1.ReadOptions.verify|verify} messages.
                 * @param message ReadOptions message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IReadOptions, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReadOptions message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReadOptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.ReadOptions;

                /**
                 * Decodes a ReadOptions message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReadOptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.ReadOptions;

                /**
                 * Verifies a ReadOptions message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReadOptions message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReadOptions
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.ReadOptions;

                /**
                 * Creates a plain object from a ReadOptions message. Also converts values to other types if specified.
                 * @param message ReadOptions
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.ReadOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReadOptions to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace ReadOptions {

                /** ReadConsistency enum. */
                enum ReadConsistency {
                    READ_CONSISTENCY_UNSPECIFIED = 0,
                    STRONG = 1,
                    EVENTUAL = 2
                }
            }

            /** Properties of a TransactionOptions. */
            interface ITransactionOptions {

                /** TransactionOptions readWrite */
                readWrite?: (google.datastore.v1.TransactionOptions.IReadWrite|null);

                /** TransactionOptions readOnly */
                readOnly?: (google.datastore.v1.TransactionOptions.IReadOnly|null);
            }

            /** Represents a TransactionOptions. */
            class TransactionOptions implements ITransactionOptions {

                /**
                 * Constructs a new TransactionOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.ITransactionOptions);

                /** TransactionOptions readWrite. */
                public readWrite?: (google.datastore.v1.TransactionOptions.IReadWrite|null);

                /** TransactionOptions readOnly. */
                public readOnly?: (google.datastore.v1.TransactionOptions.IReadOnly|null);

                /** TransactionOptions mode. */
                public mode?: ("readWrite"|"readOnly");

                /**
                 * Creates a new TransactionOptions instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TransactionOptions instance
                 */
                public static create(properties?: google.datastore.v1.ITransactionOptions): google.datastore.v1.TransactionOptions;

                /**
                 * Encodes the specified TransactionOptions message. Does not implicitly {@link google.datastore.v1.TransactionOptions.verify|verify} messages.
                 * @param message TransactionOptions message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.ITransactionOptions, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TransactionOptions message, length delimited. Does not implicitly {@link google.datastore.v1.TransactionOptions.verify|verify} messages.
                 * @param message TransactionOptions message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.ITransactionOptions, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TransactionOptions message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TransactionOptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.TransactionOptions;

                /**
                 * Decodes a TransactionOptions message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TransactionOptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.TransactionOptions;

                /**
                 * Verifies a TransactionOptions message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TransactionOptions message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TransactionOptions
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.TransactionOptions;

                /**
                 * Creates a plain object from a TransactionOptions message. Also converts values to other types if specified.
                 * @param message TransactionOptions
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.TransactionOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TransactionOptions to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace TransactionOptions {

                /** Properties of a ReadWrite. */
                interface IReadWrite {

                    /** ReadWrite previousTransaction */
                    previousTransaction?: (Uint8Array|string|null);
                }

                /** Represents a ReadWrite. */
                class ReadWrite implements IReadWrite {

                    /**
                     * Constructs a new ReadWrite.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.v1.TransactionOptions.IReadWrite);

                    /** ReadWrite previousTransaction. */
                    public previousTransaction: (Uint8Array|string);

                    /**
                     * Creates a new ReadWrite instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ReadWrite instance
                     */
                    public static create(properties?: google.datastore.v1.TransactionOptions.IReadWrite): google.datastore.v1.TransactionOptions.ReadWrite;

                    /**
                     * Encodes the specified ReadWrite message. Does not implicitly {@link google.datastore.v1.TransactionOptions.ReadWrite.verify|verify} messages.
                     * @param message ReadWrite message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.v1.TransactionOptions.IReadWrite, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ReadWrite message, length delimited. Does not implicitly {@link google.datastore.v1.TransactionOptions.ReadWrite.verify|verify} messages.
                     * @param message ReadWrite message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.v1.TransactionOptions.IReadWrite, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ReadWrite message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ReadWrite
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.TransactionOptions.ReadWrite;

                    /**
                     * Decodes a ReadWrite message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ReadWrite
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.TransactionOptions.ReadWrite;

                    /**
                     * Verifies a ReadWrite message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ReadWrite message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ReadWrite
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.v1.TransactionOptions.ReadWrite;

                    /**
                     * Creates a plain object from a ReadWrite message. Also converts values to other types if specified.
                     * @param message ReadWrite
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.v1.TransactionOptions.ReadWrite, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ReadWrite to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ReadOnly. */
                interface IReadOnly {
                }

                /** Represents a ReadOnly. */
                class ReadOnly implements IReadOnly {

                    /**
                     * Constructs a new ReadOnly.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.v1.TransactionOptions.IReadOnly);

                    /**
                     * Creates a new ReadOnly instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ReadOnly instance
                     */
                    public static create(properties?: google.datastore.v1.TransactionOptions.IReadOnly): google.datastore.v1.TransactionOptions.ReadOnly;

                    /**
                     * Encodes the specified ReadOnly message. Does not implicitly {@link google.datastore.v1.TransactionOptions.ReadOnly.verify|verify} messages.
                     * @param message ReadOnly message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.v1.TransactionOptions.IReadOnly, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ReadOnly message, length delimited. Does not implicitly {@link google.datastore.v1.TransactionOptions.ReadOnly.verify|verify} messages.
                     * @param message ReadOnly message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.v1.TransactionOptions.IReadOnly, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ReadOnly message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ReadOnly
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.TransactionOptions.ReadOnly;

                    /**
                     * Decodes a ReadOnly message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ReadOnly
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.TransactionOptions.ReadOnly;

                    /**
                     * Verifies a ReadOnly message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ReadOnly message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ReadOnly
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.v1.TransactionOptions.ReadOnly;

                    /**
                     * Creates a plain object from a ReadOnly message. Also converts values to other types if specified.
                     * @param message ReadOnly
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.v1.TransactionOptions.ReadOnly, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ReadOnly to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a PartitionId. */
            interface IPartitionId {

                /** PartitionId projectId */
                projectId?: (string|null);

                /** PartitionId namespaceId */
                namespaceId?: (string|null);
            }

            /** Represents a PartitionId. */
            class PartitionId implements IPartitionId {

                /**
                 * Constructs a new PartitionId.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IPartitionId);

                /** PartitionId projectId. */
                public projectId: string;

                /** PartitionId namespaceId. */
                public namespaceId: string;

                /**
                 * Creates a new PartitionId instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PartitionId instance
                 */
                public static create(properties?: google.datastore.v1.IPartitionId): google.datastore.v1.PartitionId;

                /**
                 * Encodes the specified PartitionId message. Does not implicitly {@link google.datastore.v1.PartitionId.verify|verify} messages.
                 * @param message PartitionId message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IPartitionId, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PartitionId message, length delimited. Does not implicitly {@link google.datastore.v1.PartitionId.verify|verify} messages.
                 * @param message PartitionId message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IPartitionId, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PartitionId message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PartitionId
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.PartitionId;

                /**
                 * Decodes a PartitionId message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PartitionId
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.PartitionId;

                /**
                 * Verifies a PartitionId message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PartitionId message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PartitionId
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.PartitionId;

                /**
                 * Creates a plain object from a PartitionId message. Also converts values to other types if specified.
                 * @param message PartitionId
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.PartitionId, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PartitionId to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Key. */
            interface IKey {

                /** Key partitionId */
                partitionId?: (google.datastore.v1.IPartitionId|null);

                /** Key path */
                path?: (google.datastore.v1.Key.IPathElement[]|null);
            }

            /** Represents a Key. */
            class Key implements IKey {

                /**
                 * Constructs a new Key.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IKey);

                /** Key partitionId. */
                public partitionId?: (google.datastore.v1.IPartitionId|null);

                /** Key path. */
                public path: google.datastore.v1.Key.IPathElement[];

                /**
                 * Creates a new Key instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Key instance
                 */
                public static create(properties?: google.datastore.v1.IKey): google.datastore.v1.Key;

                /**
                 * Encodes the specified Key message. Does not implicitly {@link google.datastore.v1.Key.verify|verify} messages.
                 * @param message Key message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Key message, length delimited. Does not implicitly {@link google.datastore.v1.Key.verify|verify} messages.
                 * @param message Key message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IKey, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Key message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Key
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.Key;

                /**
                 * Decodes a Key message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Key
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.Key;

                /**
                 * Verifies a Key message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Key message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Key
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.Key;

                /**
                 * Creates a plain object from a Key message. Also converts values to other types if specified.
                 * @param message Key
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.Key, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Key to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace Key {

                /** Properties of a PathElement. */
                interface IPathElement {

                    /** PathElement kind */
                    kind?: (string|null);

                    /** PathElement id */
                    id?: (number|Long|string|null);

                    /** PathElement name */
                    name?: (string|null);
                }

                /** Represents a PathElement. */
                class PathElement implements IPathElement {

                    /**
                     * Constructs a new PathElement.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.datastore.v1.Key.IPathElement);

                    /** PathElement kind. */
                    public kind: string;

                    /** PathElement id. */
                    public id?: (number|Long|string|null);

                    /** PathElement name. */
                    public name?: (string|null);

                    /** PathElement idType. */
                    public idType?: ("id"|"name");

                    /**
                     * Creates a new PathElement instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PathElement instance
                     */
                    public static create(properties?: google.datastore.v1.Key.IPathElement): google.datastore.v1.Key.PathElement;

                    /**
                     * Encodes the specified PathElement message. Does not implicitly {@link google.datastore.v1.Key.PathElement.verify|verify} messages.
                     * @param message PathElement message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.datastore.v1.Key.IPathElement, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PathElement message, length delimited. Does not implicitly {@link google.datastore.v1.Key.PathElement.verify|verify} messages.
                     * @param message PathElement message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.datastore.v1.Key.IPathElement, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PathElement message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PathElement
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.Key.PathElement;

                    /**
                     * Decodes a PathElement message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PathElement
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.Key.PathElement;

                    /**
                     * Verifies a PathElement message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PathElement message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PathElement
                     */
                    public static fromObject(object: { [k: string]: any }): google.datastore.v1.Key.PathElement;

                    /**
                     * Creates a plain object from a PathElement message. Also converts values to other types if specified.
                     * @param message PathElement
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.datastore.v1.Key.PathElement, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PathElement to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of an ArrayValue. */
            interface IArrayValue {

                /** ArrayValue values */
                values?: (google.datastore.v1.IValue[]|null);
            }

            /** Represents an ArrayValue. */
            class ArrayValue implements IArrayValue {

                /**
                 * Constructs a new ArrayValue.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IArrayValue);

                /** ArrayValue values. */
                public values: google.datastore.v1.IValue[];

                /**
                 * Creates a new ArrayValue instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ArrayValue instance
                 */
                public static create(properties?: google.datastore.v1.IArrayValue): google.datastore.v1.ArrayValue;

                /**
                 * Encodes the specified ArrayValue message. Does not implicitly {@link google.datastore.v1.ArrayValue.verify|verify} messages.
                 * @param message ArrayValue message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IArrayValue, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ArrayValue message, length delimited. Does not implicitly {@link google.datastore.v1.ArrayValue.verify|verify} messages.
                 * @param message ArrayValue message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IArrayValue, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ArrayValue message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ArrayValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.ArrayValue;

                /**
                 * Decodes an ArrayValue message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ArrayValue
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.ArrayValue;

                /**
                 * Verifies an ArrayValue message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ArrayValue message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ArrayValue
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.ArrayValue;

                /**
                 * Creates a plain object from an ArrayValue message. Also converts values to other types if specified.
                 * @param message ArrayValue
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.ArrayValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ArrayValue to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Value. */
            interface IValue {

                /** Value nullValue */
                nullValue?: (google.protobuf.NullValue|keyof typeof google.protobuf.NullValue|null);

                /** Value booleanValue */
                booleanValue?: (boolean|null);

                /** Value integerValue */
                integerValue?: (number|Long|string|null);

                /** Value doubleValue */
                doubleValue?: (number|null);

                /** Value timestampValue */
                timestampValue?: (google.protobuf.ITimestamp|null);

                /** Value keyValue */
                keyValue?: (google.datastore.v1.IKey|null);

                /** Value stringValue */
                stringValue?: (string|null);

                /** Value blobValue */
                blobValue?: (Uint8Array|string|null);

                /** Value geoPointValue */
                geoPointValue?: (google.type.ILatLng|null);

                /** Value entityValue */
                entityValue?: (google.datastore.v1.IEntity|null);

                /** Value arrayValue */
                arrayValue?: (google.datastore.v1.IArrayValue|null);

                /** Value meaning */
                meaning?: (number|null);

                /** Value excludeFromIndexes */
                excludeFromIndexes?: (boolean|null);
            }

            /** Represents a Value. */
            class Value implements IValue {

                /**
                 * Constructs a new Value.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IValue);

                /** Value nullValue. */
                public nullValue?: (google.protobuf.NullValue|keyof typeof google.protobuf.NullValue|null);

                /** Value booleanValue. */
                public booleanValue?: (boolean|null);

                /** Value integerValue. */
                public integerValue?: (number|Long|string|null);

                /** Value doubleValue. */
                public doubleValue?: (number|null);

                /** Value timestampValue. */
                public timestampValue?: (google.protobuf.ITimestamp|null);

                /** Value keyValue. */
                public keyValue?: (google.datastore.v1.IKey|null);

                /** Value stringValue. */
                public stringValue?: (string|null);

                /** Value blobValue. */
                public blobValue?: (Uint8Array|string|null);

                /** Value geoPointValue. */
                public geoPointValue?: (google.type.ILatLng|null);

                /** Value entityValue. */
                public entityValue?: (google.datastore.v1.IEntity|null);

                /** Value arrayValue. */
                public arrayValue?: (google.datastore.v1.IArrayValue|null);

                /** Value meaning. */
                public meaning: number;

                /** Value excludeFromIndexes. */
                public excludeFromIndexes: boolean;

                /** Value valueType. */
                public valueType?: ("nullValue"|"booleanValue"|"integerValue"|"doubleValue"|"timestampValue"|"keyValue"|"stringValue"|"blobValue"|"geoPointValue"|"entityValue"|"arrayValue");

                /**
                 * Creates a new Value instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Value instance
                 */
                public static create(properties?: google.datastore.v1.IValue): google.datastore.v1.Value;

                /**
                 * Encodes the specified Value message. Does not implicitly {@link google.datastore.v1.Value.verify|verify} messages.
                 * @param message Value message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Value message, length delimited. Does not implicitly {@link google.datastore.v1.Value.verify|verify} messages.
                 * @param message Value message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Value message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.Value;

                /**
                 * Decodes a Value message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Value
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.Value;

                /**
                 * Verifies a Value message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Value message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Value
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.Value;

                /**
                 * Creates a plain object from a Value message. Also converts values to other types if specified.
                 * @param message Value
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Value to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an Entity. */
            interface IEntity {

                /** Entity key */
                key?: (google.datastore.v1.IKey|null);

                /** Entity properties */
                properties?: ({ [k: string]: google.datastore.v1.IValue }|null);
            }

            /** Represents an Entity. */
            class Entity implements IEntity {

                /**
                 * Constructs a new Entity.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IEntity);

                /** Entity key. */
                public key?: (google.datastore.v1.IKey|null);

                /** Entity properties. */
                public properties: { [k: string]: google.datastore.v1.IValue };

                /**
                 * Creates a new Entity instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Entity instance
                 */
                public static create(properties?: google.datastore.v1.IEntity): google.datastore.v1.Entity;

                /**
                 * Encodes the specified Entity message. Does not implicitly {@link google.datastore.v1.Entity.verify|verify} messages.
                 * @param message Entity message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IEntity, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Entity message, length delimited. Does not implicitly {@link google.datastore.v1.Entity.verify|verify} messages.
                 * @param message Entity message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IEntity, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Entity message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Entity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.Entity;

                /**
                 * Decodes an Entity message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Entity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.Entity;

                /**
                 * Verifies an Entity message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Entity message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Entity
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.Entity;

                /**
                 * Creates a plain object from an Entity message. Also converts values to other types if specified.
                 * @param message Entity
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.Entity, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Entity to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an EntityResult. */
            interface IEntityResult {

                /** EntityResult entity */
                entity?: (google.datastore.v1.IEntity|null);

                /** EntityResult version */
                version?: (number|Long|string|null);

                /** EntityResult cursor */
                cursor?: (Uint8Array|string|null);
            }

            /** Represents an EntityResult. */
            class EntityResult implements IEntityResult {

                /**
                 * Constructs a new EntityResult.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IEntityResult);

                /** EntityResult entity. */
                public entity?: (google.datastore.v1.IEntity|null);

                /** EntityResult version. */
                public version: (number|Long|string);

                /** EntityResult cursor. */
                public cursor: (Uint8Array|string);

                /**
                 * Creates a new EntityResult instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EntityResult instance
                 */
                public static create(properties?: google.datastore.v1.IEntityResult): google.datastore.v1.EntityResult;

                /**
                 * Encodes the specified EntityResult message. Does not implicitly {@link google.datastore.v1.EntityResult.verify|verify} messages.
                 * @param message EntityResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IEntityResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified EntityResult message, length delimited. Does not implicitly {@link google.datastore.v1.EntityResult.verify|verify} messages.
                 * @param message EntityResult message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IEntityResult, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EntityResult message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns EntityResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.EntityResult;

                /**
                 * Decodes an EntityResult message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns EntityResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.EntityResult;

                /**
                 * Verifies an EntityResult message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an EntityResult message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns EntityResult
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.EntityResult;

                /**
                 * Creates a plain object from an EntityResult message. Also converts values to other types if specified.
                 * @param message EntityResult
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.EntityResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this EntityResult to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace EntityResult {

                /** ResultType enum. */
                enum ResultType {
                    RESULT_TYPE_UNSPECIFIED = 0,
                    FULL = 1,
                    PROJECTION = 2,
                    KEY_ONLY = 3
                }
            }

            /** Properties of a Query. */
            interface IQuery {

                /** Query projection */
                projection?: (google.datastore.v1.IProjection[]|null);

                /** Query kind */
                kind?: (google.datastore.v1.IKindExpression[]|null);

                /** Query filter */
                filter?: (google.datastore.v1.IFilter|null);

                /** Query order */
                order?: (google.datastore.v1.IPropertyOrder[]|null);

                /** Query distinctOn */
                distinctOn?: (google.datastore.v1.IPropertyReference[]|null);

                /** Query startCursor */
                startCursor?: (Uint8Array|string|null);

                /** Query endCursor */
                endCursor?: (Uint8Array|string|null);

                /** Query offset */
                offset?: (number|null);

                /** Query limit */
                limit?: (google.protobuf.IInt32Value|null);
            }

            /** Represents a Query. */
            class Query implements IQuery {

                /**
                 * Constructs a new Query.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IQuery);

                /** Query projection. */
                public projection: google.datastore.v1.IProjection[];

                /** Query kind. */
                public kind: google.datastore.v1.IKindExpression[];

                /** Query filter. */
                public filter?: (google.datastore.v1.IFilter|null);

                /** Query order. */
                public order: google.datastore.v1.IPropertyOrder[];

                /** Query distinctOn. */
                public distinctOn: google.datastore.v1.IPropertyReference[];

                /** Query startCursor. */
                public startCursor: (Uint8Array|string);

                /** Query endCursor. */
                public endCursor: (Uint8Array|string);

                /** Query offset. */
                public offset: number;

                /** Query limit. */
                public limit?: (google.protobuf.IInt32Value|null);

                /**
                 * Creates a new Query instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Query instance
                 */
                public static create(properties?: google.datastore.v1.IQuery): google.datastore.v1.Query;

                /**
                 * Encodes the specified Query message. Does not implicitly {@link google.datastore.v1.Query.verify|verify} messages.
                 * @param message Query message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IQuery, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Query message, length delimited. Does not implicitly {@link google.datastore.v1.Query.verify|verify} messages.
                 * @param message Query message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IQuery, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Query message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Query
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.Query;

                /**
                 * Decodes a Query message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Query
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.Query;

                /**
                 * Verifies a Query message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Query message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Query
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.Query;

                /**
                 * Creates a plain object from a Query message. Also converts values to other types if specified.
                 * @param message Query
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.Query, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Query to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a KindExpression. */
            interface IKindExpression {

                /** KindExpression name */
                name?: (string|null);
            }

            /** Represents a KindExpression. */
            class KindExpression implements IKindExpression {

                /**
                 * Constructs a new KindExpression.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IKindExpression);

                /** KindExpression name. */
                public name: string;

                /**
                 * Creates a new KindExpression instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns KindExpression instance
                 */
                public static create(properties?: google.datastore.v1.IKindExpression): google.datastore.v1.KindExpression;

                /**
                 * Encodes the specified KindExpression message. Does not implicitly {@link google.datastore.v1.KindExpression.verify|verify} messages.
                 * @param message KindExpression message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IKindExpression, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified KindExpression message, length delimited. Does not implicitly {@link google.datastore.v1.KindExpression.verify|verify} messages.
                 * @param message KindExpression message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IKindExpression, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a KindExpression message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns KindExpression
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.KindExpression;

                /**
                 * Decodes a KindExpression message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns KindExpression
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.KindExpression;

                /**
                 * Verifies a KindExpression message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a KindExpression message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns KindExpression
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.KindExpression;

                /**
                 * Creates a plain object from a KindExpression message. Also converts values to other types if specified.
                 * @param message KindExpression
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.KindExpression, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this KindExpression to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PropertyReference. */
            interface IPropertyReference {

                /** PropertyReference name */
                name?: (string|null);
            }

            /** Represents a PropertyReference. */
            class PropertyReference implements IPropertyReference {

                /**
                 * Constructs a new PropertyReference.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IPropertyReference);

                /** PropertyReference name. */
                public name: string;

                /**
                 * Creates a new PropertyReference instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PropertyReference instance
                 */
                public static create(properties?: google.datastore.v1.IPropertyReference): google.datastore.v1.PropertyReference;

                /**
                 * Encodes the specified PropertyReference message. Does not implicitly {@link google.datastore.v1.PropertyReference.verify|verify} messages.
                 * @param message PropertyReference message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IPropertyReference, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PropertyReference message, length delimited. Does not implicitly {@link google.datastore.v1.PropertyReference.verify|verify} messages.
                 * @param message PropertyReference message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IPropertyReference, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PropertyReference message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PropertyReference
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.PropertyReference;

                /**
                 * Decodes a PropertyReference message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PropertyReference
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.PropertyReference;

                /**
                 * Verifies a PropertyReference message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PropertyReference message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PropertyReference
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.PropertyReference;

                /**
                 * Creates a plain object from a PropertyReference message. Also converts values to other types if specified.
                 * @param message PropertyReference
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.PropertyReference, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PropertyReference to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Projection. */
            interface IProjection {

                /** Projection property */
                property?: (google.datastore.v1.IPropertyReference|null);
            }

            /** Represents a Projection. */
            class Projection implements IProjection {

                /**
                 * Constructs a new Projection.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IProjection);

                /** Projection property. */
                public property?: (google.datastore.v1.IPropertyReference|null);

                /**
                 * Creates a new Projection instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Projection instance
                 */
                public static create(properties?: google.datastore.v1.IProjection): google.datastore.v1.Projection;

                /**
                 * Encodes the specified Projection message. Does not implicitly {@link google.datastore.v1.Projection.verify|verify} messages.
                 * @param message Projection message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IProjection, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Projection message, length delimited. Does not implicitly {@link google.datastore.v1.Projection.verify|verify} messages.
                 * @param message Projection message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IProjection, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Projection message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Projection
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.Projection;

                /**
                 * Decodes a Projection message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Projection
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.Projection;

                /**
                 * Verifies a Projection message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Projection message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Projection
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.Projection;

                /**
                 * Creates a plain object from a Projection message. Also converts values to other types if specified.
                 * @param message Projection
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.Projection, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Projection to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PropertyOrder. */
            interface IPropertyOrder {

                /** PropertyOrder property */
                property?: (google.datastore.v1.IPropertyReference|null);

                /** PropertyOrder direction */
                direction?: (google.datastore.v1.PropertyOrder.Direction|keyof typeof google.datastore.v1.PropertyOrder.Direction|null);
            }

            /** Represents a PropertyOrder. */
            class PropertyOrder implements IPropertyOrder {

                /**
                 * Constructs a new PropertyOrder.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IPropertyOrder);

                /** PropertyOrder property. */
                public property?: (google.datastore.v1.IPropertyReference|null);

                /** PropertyOrder direction. */
                public direction: (google.datastore.v1.PropertyOrder.Direction|keyof typeof google.datastore.v1.PropertyOrder.Direction);

                /**
                 * Creates a new PropertyOrder instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PropertyOrder instance
                 */
                public static create(properties?: google.datastore.v1.IPropertyOrder): google.datastore.v1.PropertyOrder;

                /**
                 * Encodes the specified PropertyOrder message. Does not implicitly {@link google.datastore.v1.PropertyOrder.verify|verify} messages.
                 * @param message PropertyOrder message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IPropertyOrder, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PropertyOrder message, length delimited. Does not implicitly {@link google.datastore.v1.PropertyOrder.verify|verify} messages.
                 * @param message PropertyOrder message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IPropertyOrder, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PropertyOrder message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PropertyOrder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.PropertyOrder;

                /**
                 * Decodes a PropertyOrder message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PropertyOrder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.PropertyOrder;

                /**
                 * Verifies a PropertyOrder message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PropertyOrder message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PropertyOrder
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.PropertyOrder;

                /**
                 * Creates a plain object from a PropertyOrder message. Also converts values to other types if specified.
                 * @param message PropertyOrder
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.PropertyOrder, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PropertyOrder to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace PropertyOrder {

                /** Direction enum. */
                enum Direction {
                    DIRECTION_UNSPECIFIED = 0,
                    ASCENDING = 1,
                    DESCENDING = 2
                }
            }

            /** Properties of a Filter. */
            interface IFilter {

                /** Filter compositeFilter */
                compositeFilter?: (google.datastore.v1.ICompositeFilter|null);

                /** Filter propertyFilter */
                propertyFilter?: (google.datastore.v1.IPropertyFilter|null);
            }

            /** Represents a Filter. */
            class Filter implements IFilter {

                /**
                 * Constructs a new Filter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IFilter);

                /** Filter compositeFilter. */
                public compositeFilter?: (google.datastore.v1.ICompositeFilter|null);

                /** Filter propertyFilter. */
                public propertyFilter?: (google.datastore.v1.IPropertyFilter|null);

                /** Filter filterType. */
                public filterType?: ("compositeFilter"|"propertyFilter");

                /**
                 * Creates a new Filter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Filter instance
                 */
                public static create(properties?: google.datastore.v1.IFilter): google.datastore.v1.Filter;

                /**
                 * Encodes the specified Filter message. Does not implicitly {@link google.datastore.v1.Filter.verify|verify} messages.
                 * @param message Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Filter message, length delimited. Does not implicitly {@link google.datastore.v1.Filter.verify|verify} messages.
                 * @param message Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Filter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.Filter;

                /**
                 * Decodes a Filter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.Filter;

                /**
                 * Verifies a Filter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Filter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Filter
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.Filter;

                /**
                 * Creates a plain object from a Filter message. Also converts values to other types if specified.
                 * @param message Filter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.Filter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Filter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CompositeFilter. */
            interface ICompositeFilter {

                /** CompositeFilter op */
                op?: (google.datastore.v1.CompositeFilter.Operator|keyof typeof google.datastore.v1.CompositeFilter.Operator|null);

                /** CompositeFilter filters */
                filters?: (google.datastore.v1.IFilter[]|null);
            }

            /** Represents a CompositeFilter. */
            class CompositeFilter implements ICompositeFilter {

                /**
                 * Constructs a new CompositeFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.ICompositeFilter);

                /** CompositeFilter op. */
                public op: (google.datastore.v1.CompositeFilter.Operator|keyof typeof google.datastore.v1.CompositeFilter.Operator);

                /** CompositeFilter filters. */
                public filters: google.datastore.v1.IFilter[];

                /**
                 * Creates a new CompositeFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CompositeFilter instance
                 */
                public static create(properties?: google.datastore.v1.ICompositeFilter): google.datastore.v1.CompositeFilter;

                /**
                 * Encodes the specified CompositeFilter message. Does not implicitly {@link google.datastore.v1.CompositeFilter.verify|verify} messages.
                 * @param message CompositeFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.ICompositeFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CompositeFilter message, length delimited. Does not implicitly {@link google.datastore.v1.CompositeFilter.verify|verify} messages.
                 * @param message CompositeFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.ICompositeFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CompositeFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CompositeFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.CompositeFilter;

                /**
                 * Decodes a CompositeFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CompositeFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.CompositeFilter;

                /**
                 * Verifies a CompositeFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CompositeFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CompositeFilter
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.CompositeFilter;

                /**
                 * Creates a plain object from a CompositeFilter message. Also converts values to other types if specified.
                 * @param message CompositeFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.CompositeFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CompositeFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace CompositeFilter {

                /** Operator enum. */
                enum Operator {
                    OPERATOR_UNSPECIFIED = 0,
                    AND = 1
                }
            }

            /** Properties of a PropertyFilter. */
            interface IPropertyFilter {

                /** PropertyFilter property */
                property?: (google.datastore.v1.IPropertyReference|null);

                /** PropertyFilter op */
                op?: (google.datastore.v1.PropertyFilter.Operator|keyof typeof google.datastore.v1.PropertyFilter.Operator|null);

                /** PropertyFilter value */
                value?: (google.datastore.v1.IValue|null);
            }

            /** Represents a PropertyFilter. */
            class PropertyFilter implements IPropertyFilter {

                /**
                 * Constructs a new PropertyFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IPropertyFilter);

                /** PropertyFilter property. */
                public property?: (google.datastore.v1.IPropertyReference|null);

                /** PropertyFilter op. */
                public op: (google.datastore.v1.PropertyFilter.Operator|keyof typeof google.datastore.v1.PropertyFilter.Operator);

                /** PropertyFilter value. */
                public value?: (google.datastore.v1.IValue|null);

                /**
                 * Creates a new PropertyFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PropertyFilter instance
                 */
                public static create(properties?: google.datastore.v1.IPropertyFilter): google.datastore.v1.PropertyFilter;

                /**
                 * Encodes the specified PropertyFilter message. Does not implicitly {@link google.datastore.v1.PropertyFilter.verify|verify} messages.
                 * @param message PropertyFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IPropertyFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PropertyFilter message, length delimited. Does not implicitly {@link google.datastore.v1.PropertyFilter.verify|verify} messages.
                 * @param message PropertyFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IPropertyFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PropertyFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PropertyFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.PropertyFilter;

                /**
                 * Decodes a PropertyFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PropertyFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.PropertyFilter;

                /**
                 * Verifies a PropertyFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PropertyFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PropertyFilter
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.PropertyFilter;

                /**
                 * Creates a plain object from a PropertyFilter message. Also converts values to other types if specified.
                 * @param message PropertyFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.PropertyFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PropertyFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace PropertyFilter {

                /** Operator enum. */
                enum Operator {
                    OPERATOR_UNSPECIFIED = 0,
                    LESS_THAN = 1,
                    LESS_THAN_OR_EQUAL = 2,
                    GREATER_THAN = 3,
                    GREATER_THAN_OR_EQUAL = 4,
                    EQUAL = 5,
                    HAS_ANCESTOR = 11
                }
            }

            /** Properties of a GqlQuery. */
            interface IGqlQuery {

                /** GqlQuery queryString */
                queryString?: (string|null);

                /** GqlQuery allowLiterals */
                allowLiterals?: (boolean|null);

                /** GqlQuery namedBindings */
                namedBindings?: ({ [k: string]: google.datastore.v1.IGqlQueryParameter }|null);

                /** GqlQuery positionalBindings */
                positionalBindings?: (google.datastore.v1.IGqlQueryParameter[]|null);
            }

            /** Represents a GqlQuery. */
            class GqlQuery implements IGqlQuery {

                /**
                 * Constructs a new GqlQuery.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IGqlQuery);

                /** GqlQuery queryString. */
                public queryString: string;

                /** GqlQuery allowLiterals. */
                public allowLiterals: boolean;

                /** GqlQuery namedBindings. */
                public namedBindings: { [k: string]: google.datastore.v1.IGqlQueryParameter };

                /** GqlQuery positionalBindings. */
                public positionalBindings: google.datastore.v1.IGqlQueryParameter[];

                /**
                 * Creates a new GqlQuery instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GqlQuery instance
                 */
                public static create(properties?: google.datastore.v1.IGqlQuery): google.datastore.v1.GqlQuery;

                /**
                 * Encodes the specified GqlQuery message. Does not implicitly {@link google.datastore.v1.GqlQuery.verify|verify} messages.
                 * @param message GqlQuery message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IGqlQuery, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GqlQuery message, length delimited. Does not implicitly {@link google.datastore.v1.GqlQuery.verify|verify} messages.
                 * @param message GqlQuery message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IGqlQuery, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GqlQuery message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GqlQuery
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.GqlQuery;

                /**
                 * Decodes a GqlQuery message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GqlQuery
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.GqlQuery;

                /**
                 * Verifies a GqlQuery message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GqlQuery message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GqlQuery
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.GqlQuery;

                /**
                 * Creates a plain object from a GqlQuery message. Also converts values to other types if specified.
                 * @param message GqlQuery
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.GqlQuery, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GqlQuery to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GqlQueryParameter. */
            interface IGqlQueryParameter {

                /** GqlQueryParameter value */
                value?: (google.datastore.v1.IValue|null);

                /** GqlQueryParameter cursor */
                cursor?: (Uint8Array|string|null);
            }

            /** Represents a GqlQueryParameter. */
            class GqlQueryParameter implements IGqlQueryParameter {

                /**
                 * Constructs a new GqlQueryParameter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IGqlQueryParameter);

                /** GqlQueryParameter value. */
                public value?: (google.datastore.v1.IValue|null);

                /** GqlQueryParameter cursor. */
                public cursor?: (Uint8Array|string|null);

                /** GqlQueryParameter parameterType. */
                public parameterType?: ("value"|"cursor");

                /**
                 * Creates a new GqlQueryParameter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GqlQueryParameter instance
                 */
                public static create(properties?: google.datastore.v1.IGqlQueryParameter): google.datastore.v1.GqlQueryParameter;

                /**
                 * Encodes the specified GqlQueryParameter message. Does not implicitly {@link google.datastore.v1.GqlQueryParameter.verify|verify} messages.
                 * @param message GqlQueryParameter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IGqlQueryParameter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GqlQueryParameter message, length delimited. Does not implicitly {@link google.datastore.v1.GqlQueryParameter.verify|verify} messages.
                 * @param message GqlQueryParameter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IGqlQueryParameter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GqlQueryParameter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GqlQueryParameter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.GqlQueryParameter;

                /**
                 * Decodes a GqlQueryParameter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GqlQueryParameter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.GqlQueryParameter;

                /**
                 * Verifies a GqlQueryParameter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GqlQueryParameter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GqlQueryParameter
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.GqlQueryParameter;

                /**
                 * Creates a plain object from a GqlQueryParameter message. Also converts values to other types if specified.
                 * @param message GqlQueryParameter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.GqlQueryParameter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GqlQueryParameter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a QueryResultBatch. */
            interface IQueryResultBatch {

                /** QueryResultBatch skippedResults */
                skippedResults?: (number|null);

                /** QueryResultBatch skippedCursor */
                skippedCursor?: (Uint8Array|string|null);

                /** QueryResultBatch entityResultType */
                entityResultType?: (google.datastore.v1.EntityResult.ResultType|keyof typeof google.datastore.v1.EntityResult.ResultType|null);

                /** QueryResultBatch entityResults */
                entityResults?: (google.datastore.v1.IEntityResult[]|null);

                /** QueryResultBatch endCursor */
                endCursor?: (Uint8Array|string|null);

                /** QueryResultBatch moreResults */
                moreResults?: (google.datastore.v1.QueryResultBatch.MoreResultsType|keyof typeof google.datastore.v1.QueryResultBatch.MoreResultsType|null);

                /** QueryResultBatch snapshotVersion */
                snapshotVersion?: (number|Long|string|null);
            }

            /** Represents a QueryResultBatch. */
            class QueryResultBatch implements IQueryResultBatch {

                /**
                 * Constructs a new QueryResultBatch.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.datastore.v1.IQueryResultBatch);

                /** QueryResultBatch skippedResults. */
                public skippedResults: number;

                /** QueryResultBatch skippedCursor. */
                public skippedCursor: (Uint8Array|string);

                /** QueryResultBatch entityResultType. */
                public entityResultType: (google.datastore.v1.EntityResult.ResultType|keyof typeof google.datastore.v1.EntityResult.ResultType);

                /** QueryResultBatch entityResults. */
                public entityResults: google.datastore.v1.IEntityResult[];

                /** QueryResultBatch endCursor. */
                public endCursor: (Uint8Array|string);

                /** QueryResultBatch moreResults. */
                public moreResults: (google.datastore.v1.QueryResultBatch.MoreResultsType|keyof typeof google.datastore.v1.QueryResultBatch.MoreResultsType);

                /** QueryResultBatch snapshotVersion. */
                public snapshotVersion: (number|Long|string);

                /**
                 * Creates a new QueryResultBatch instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns QueryResultBatch instance
                 */
                public static create(properties?: google.datastore.v1.IQueryResultBatch): google.datastore.v1.QueryResultBatch;

                /**
                 * Encodes the specified QueryResultBatch message. Does not implicitly {@link google.datastore.v1.QueryResultBatch.verify|verify} messages.
                 * @param message QueryResultBatch message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.datastore.v1.IQueryResultBatch, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified QueryResultBatch message, length delimited. Does not implicitly {@link google.datastore.v1.QueryResultBatch.verify|verify} messages.
                 * @param message QueryResultBatch message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.datastore.v1.IQueryResultBatch, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a QueryResultBatch message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns QueryResultBatch
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.datastore.v1.QueryResultBatch;

                /**
                 * Decodes a QueryResultBatch message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns QueryResultBatch
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.datastore.v1.QueryResultBatch;

                /**
                 * Verifies a QueryResultBatch message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a QueryResultBatch message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns QueryResultBatch
                 */
                public static fromObject(object: { [k: string]: any }): google.datastore.v1.QueryResultBatch;

                /**
                 * Creates a plain object from a QueryResultBatch message. Also converts values to other types if specified.
                 * @param message QueryResultBatch
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.datastore.v1.QueryResultBatch, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this QueryResultBatch to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace QueryResultBatch {

                /** MoreResultsType enum. */
                enum MoreResultsType {
                    MORE_RESULTS_TYPE_UNSPECIFIED = 0,
                    NOT_FINISHED = 1,
                    MORE_RESULTS_AFTER_LIMIT = 2,
                    MORE_RESULTS_AFTER_CURSOR = 4,
                    NO_MORE_RESULTS = 3
                }
            }
        }
    }

    /** Namespace api. */
    namespace api {

        /** Properties of a Http. */
        interface IHttp {

            /** Http rules */
            rules?: (google.api.IHttpRule[]|null);

            /** Http fullyDecodeReservedExpansion */
            fullyDecodeReservedExpansion?: (boolean|null);
        }

        /** Represents a Http. */
        class Http implements IHttp {

            /**
             * Constructs a new Http.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttp);

            /** Http rules. */
            public rules: google.api.IHttpRule[];

            /** Http fullyDecodeReservedExpansion. */
            public fullyDecodeReservedExpansion: boolean;

            /**
             * Creates a new Http instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Http instance
             */
            public static create(properties?: google.api.IHttp): google.api.Http;

            /**
             * Encodes the specified Http message. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @param message Http message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IHttp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Http message, length delimited. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @param message Http message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IHttp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Http message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.Http;

            /**
             * Decodes a Http message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.Http;

            /**
             * Verifies a Http message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Http message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Http
             */
            public static fromObject(object: { [k: string]: any }): google.api.Http;

            /**
             * Creates a plain object from a Http message. Also converts values to other types if specified.
             * @param message Http
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.Http, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Http to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a HttpRule. */
        interface IHttpRule {

            /** HttpRule selector */
            selector?: (string|null);

            /** HttpRule get */
            get?: (string|null);

            /** HttpRule put */
            put?: (string|null);

            /** HttpRule post */
            post?: (string|null);

            /** HttpRule delete */
            "delete"?: (string|null);

            /** HttpRule patch */
            patch?: (string|null);

            /** HttpRule custom */
            custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule body */
            body?: (string|null);

            /** HttpRule responseBody */
            responseBody?: (string|null);

            /** HttpRule additionalBindings */
            additionalBindings?: (google.api.IHttpRule[]|null);
        }

        /** Represents a HttpRule. */
        class HttpRule implements IHttpRule {

            /**
             * Constructs a new HttpRule.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttpRule);

            /** HttpRule selector. */
            public selector: string;

            /** HttpRule get. */
            public get?: (string|null);

            /** HttpRule put. */
            public put?: (string|null);

            /** HttpRule post. */
            public post?: (string|null);

            /** HttpRule delete. */
            public delete?: (string|null);

            /** HttpRule patch. */
            public patch?: (string|null);

            /** HttpRule custom. */
            public custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule body. */
            public body: string;

            /** HttpRule responseBody. */
            public responseBody: string;

            /** HttpRule additionalBindings. */
            public additionalBindings: google.api.IHttpRule[];

            /** HttpRule pattern. */
            public pattern?: ("get"|"put"|"post"|"delete"|"patch"|"custom");

            /**
             * Creates a new HttpRule instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HttpRule instance
             */
            public static create(properties?: google.api.IHttpRule): google.api.HttpRule;

            /**
             * Encodes the specified HttpRule message. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @param message HttpRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IHttpRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HttpRule message, length delimited. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @param message HttpRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IHttpRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HttpRule message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.HttpRule;

            /**
             * Decodes a HttpRule message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.HttpRule;

            /**
             * Verifies a HttpRule message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HttpRule message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HttpRule
             */
            public static fromObject(object: { [k: string]: any }): google.api.HttpRule;

            /**
             * Creates a plain object from a HttpRule message. Also converts values to other types if specified.
             * @param message HttpRule
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.HttpRule, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HttpRule to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CustomHttpPattern. */
        interface ICustomHttpPattern {

            /** CustomHttpPattern kind */
            kind?: (string|null);

            /** CustomHttpPattern path */
            path?: (string|null);
        }

        /** Represents a CustomHttpPattern. */
        class CustomHttpPattern implements ICustomHttpPattern {

            /**
             * Constructs a new CustomHttpPattern.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.ICustomHttpPattern);

            /** CustomHttpPattern kind. */
            public kind: string;

            /** CustomHttpPattern path. */
            public path: string;

            /**
             * Creates a new CustomHttpPattern instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CustomHttpPattern instance
             */
            public static create(properties?: google.api.ICustomHttpPattern): google.api.CustomHttpPattern;

            /**
             * Encodes the specified CustomHttpPattern message. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @param message CustomHttpPattern message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.ICustomHttpPattern, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CustomHttpPattern message, length delimited. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @param message CustomHttpPattern message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.ICustomHttpPattern, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CustomHttpPattern message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.CustomHttpPattern;

            /**
             * Decodes a CustomHttpPattern message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.CustomHttpPattern;

            /**
             * Verifies a CustomHttpPattern message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CustomHttpPattern message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CustomHttpPattern
             */
            public static fromObject(object: { [k: string]: any }): google.api.CustomHttpPattern;

            /**
             * Creates a plain object from a CustomHttpPattern message. Also converts values to other types if specified.
             * @param message CustomHttpPattern
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.CustomHttpPattern, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CustomHttpPattern to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** FieldBehavior enum. */
        enum FieldBehavior {
            FIELD_BEHAVIOR_UNSPECIFIED = 0,
            OPTIONAL = 1,
            REQUIRED = 2,
            OUTPUT_ONLY = 3,
            INPUT_ONLY = 4,
            IMMUTABLE = 5,
            UNORDERED_LIST = 6,
            NON_EMPTY_DEFAULT = 7
        }
    }

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a FileDescriptorSet. */
        interface IFileDescriptorSet {

            /** FileDescriptorSet file */
            file?: (google.protobuf.IFileDescriptorProto[]|null);
        }

        /** Represents a FileDescriptorSet. */
        class FileDescriptorSet implements IFileDescriptorSet {

            /**
             * Constructs a new FileDescriptorSet.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorSet);

            /** FileDescriptorSet file. */
            public file: google.protobuf.IFileDescriptorProto[];

            /**
             * Creates a new FileDescriptorSet instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileDescriptorSet instance
             */
            public static create(properties?: google.protobuf.IFileDescriptorSet): google.protobuf.FileDescriptorSet;

            /**
             * Encodes the specified FileDescriptorSet message. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @param message FileDescriptorSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileDescriptorSet message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @param message FileDescriptorSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet;

            /**
             * Verifies a FileDescriptorSet message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileDescriptorSet message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorSet
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;

            /**
             * Creates a plain object from a FileDescriptorSet message. Also converts values to other types if specified.
             * @param message FileDescriptorSet
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorSet to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileDescriptorProto. */
        interface IFileDescriptorProto {

            /** FileDescriptorProto name */
            name?: (string|null);

            /** FileDescriptorProto package */
            "package"?: (string|null);

            /** FileDescriptorProto dependency */
            dependency?: (string[]|null);

            /** FileDescriptorProto publicDependency */
            publicDependency?: (number[]|null);

            /** FileDescriptorProto weakDependency */
            weakDependency?: (number[]|null);

            /** FileDescriptorProto messageType */
            messageType?: (google.protobuf.IDescriptorProto[]|null);

            /** FileDescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** FileDescriptorProto service */
            service?: (google.protobuf.IServiceDescriptorProto[]|null);

            /** FileDescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** FileDescriptorProto options */
            options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo */
            sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax */
            syntax?: (string|null);
        }

        /** Represents a FileDescriptorProto. */
        class FileDescriptorProto implements IFileDescriptorProto {

            /**
             * Constructs a new FileDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorProto);

            /** FileDescriptorProto name. */
            public name: string;

            /** FileDescriptorProto package. */
            public package: string;

            /** FileDescriptorProto dependency. */
            public dependency: string[];

            /** FileDescriptorProto publicDependency. */
            public publicDependency: number[];

            /** FileDescriptorProto weakDependency. */
            public weakDependency: number[];

            /** FileDescriptorProto messageType. */
            public messageType: google.protobuf.IDescriptorProto[];

            /** FileDescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** FileDescriptorProto service. */
            public service: google.protobuf.IServiceDescriptorProto[];

            /** FileDescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** FileDescriptorProto options. */
            public options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo. */
            public sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax. */
            public syntax: string;

            /**
             * Creates a new FileDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IFileDescriptorProto): google.protobuf.FileDescriptorProto;

            /**
             * Encodes the specified FileDescriptorProto message. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @param message FileDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @param message FileDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto;

            /**
             * Verifies a FileDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;

            /**
             * Creates a plain object from a FileDescriptorProto message. Also converts values to other types if specified.
             * @param message FileDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DescriptorProto. */
        interface IDescriptorProto {

            /** DescriptorProto name */
            name?: (string|null);

            /** DescriptorProto field */
            field?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto nestedType */
            nestedType?: (google.protobuf.IDescriptorProto[]|null);

            /** DescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** DescriptorProto extensionRange */
            extensionRange?: (google.protobuf.DescriptorProto.IExtensionRange[]|null);

            /** DescriptorProto oneofDecl */
            oneofDecl?: (google.protobuf.IOneofDescriptorProto[]|null);

            /** DescriptorProto options */
            options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange */
            reservedRange?: (google.protobuf.DescriptorProto.IReservedRange[]|null);

            /** DescriptorProto reservedName */
            reservedName?: (string[]|null);
        }

        /** Represents a DescriptorProto. */
        class DescriptorProto implements IDescriptorProto {

            /**
             * Constructs a new DescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDescriptorProto);

            /** DescriptorProto name. */
            public name: string;

            /** DescriptorProto field. */
            public field: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto nestedType. */
            public nestedType: google.protobuf.IDescriptorProto[];

            /** DescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** DescriptorProto extensionRange. */
            public extensionRange: google.protobuf.DescriptorProto.IExtensionRange[];

            /** DescriptorProto oneofDecl. */
            public oneofDecl: google.protobuf.IOneofDescriptorProto[];

            /** DescriptorProto options. */
            public options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange. */
            public reservedRange: google.protobuf.DescriptorProto.IReservedRange[];

            /** DescriptorProto reservedName. */
            public reservedName: string[];

            /**
             * Creates a new DescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DescriptorProto instance
             */
            public static create(properties?: google.protobuf.IDescriptorProto): google.protobuf.DescriptorProto;

            /**
             * Encodes the specified DescriptorProto message. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @param message DescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @param message DescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto;

            /**
             * Verifies a DescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;

            /**
             * Creates a plain object from a DescriptorProto message. Also converts values to other types if specified.
             * @param message DescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace DescriptorProto {

            /** Properties of an ExtensionRange. */
            interface IExtensionRange {

                /** ExtensionRange start */
                start?: (number|null);

                /** ExtensionRange end */
                end?: (number|null);

                /** ExtensionRange options */
                options?: (google.protobuf.IExtensionRangeOptions|null);
            }

            /** Represents an ExtensionRange. */
            class ExtensionRange implements IExtensionRange {

                /**
                 * Constructs a new ExtensionRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IExtensionRange);

                /** ExtensionRange start. */
                public start: number;

                /** ExtensionRange end. */
                public end: number;

                /** ExtensionRange options. */
                public options?: (google.protobuf.IExtensionRangeOptions|null);

                /**
                 * Creates a new ExtensionRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ExtensionRange instance
                 */
                public static create(properties?: google.protobuf.DescriptorProto.IExtensionRange): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Encodes the specified ExtensionRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @param message ExtensionRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ExtensionRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @param message ExtensionRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Verifies an ExtensionRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ExtensionRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ExtensionRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Creates a plain object from an ExtensionRange message. Also converts values to other types if specified.
                 * @param message ExtensionRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ExtensionRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReservedRange. */
            interface IReservedRange {

                /** ReservedRange start */
                start?: (number|null);

                /** ReservedRange end */
                end?: (number|null);
            }

            /** Represents a ReservedRange. */
            class ReservedRange implements IReservedRange {

                /**
                 * Constructs a new ReservedRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IReservedRange);

                /** ReservedRange start. */
                public start: number;

                /** ReservedRange end. */
                public end: number;

                /**
                 * Creates a new ReservedRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReservedRange instance
                 */
                public static create(properties?: google.protobuf.DescriptorProto.IReservedRange): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Encodes the specified ReservedRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @param message ReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReservedRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @param message ReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Verifies a ReservedRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReservedRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReservedRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Creates a plain object from a ReservedRange message. Also converts values to other types if specified.
                 * @param message ReservedRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReservedRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of an ExtensionRangeOptions. */
        interface IExtensionRangeOptions {

            /** ExtensionRangeOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an ExtensionRangeOptions. */
        class ExtensionRangeOptions implements IExtensionRangeOptions {

            /**
             * Constructs a new ExtensionRangeOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IExtensionRangeOptions);

            /** ExtensionRangeOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new ExtensionRangeOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExtensionRangeOptions instance
             */
            public static create(properties?: google.protobuf.IExtensionRangeOptions): google.protobuf.ExtensionRangeOptions;

            /**
             * Encodes the specified ExtensionRangeOptions message. Does not implicitly {@link google.protobuf.ExtensionRangeOptions.verify|verify} messages.
             * @param message ExtensionRangeOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IExtensionRangeOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExtensionRangeOptions message, length delimited. Does not implicitly {@link google.protobuf.ExtensionRangeOptions.verify|verify} messages.
             * @param message ExtensionRangeOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IExtensionRangeOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExtensionRangeOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExtensionRangeOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ExtensionRangeOptions;

            /**
             * Decodes an ExtensionRangeOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExtensionRangeOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ExtensionRangeOptions;

            /**
             * Verifies an ExtensionRangeOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExtensionRangeOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExtensionRangeOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ExtensionRangeOptions;

            /**
             * Creates a plain object from an ExtensionRangeOptions message. Also converts values to other types if specified.
             * @param message ExtensionRangeOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ExtensionRangeOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExtensionRangeOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FieldDescriptorProto. */
        interface IFieldDescriptorProto {

            /** FieldDescriptorProto name */
            name?: (string|null);

            /** FieldDescriptorProto number */
            number?: (number|null);

            /** FieldDescriptorProto label */
            label?: (google.protobuf.FieldDescriptorProto.Label|keyof typeof google.protobuf.FieldDescriptorProto.Label|null);

            /** FieldDescriptorProto type */
            type?: (google.protobuf.FieldDescriptorProto.Type|keyof typeof google.protobuf.FieldDescriptorProto.Type|null);

            /** FieldDescriptorProto typeName */
            typeName?: (string|null);

            /** FieldDescriptorProto extendee */
            extendee?: (string|null);

            /** FieldDescriptorProto defaultValue */
            defaultValue?: (string|null);

            /** FieldDescriptorProto oneofIndex */
            oneofIndex?: (number|null);

            /** FieldDescriptorProto jsonName */
            jsonName?: (string|null);

            /** FieldDescriptorProto options */
            options?: (google.protobuf.IFieldOptions|null);

            /** FieldDescriptorProto proto3Optional */
            proto3Optional?: (boolean|null);
        }

        /** Represents a FieldDescriptorProto. */
        class FieldDescriptorProto implements IFieldDescriptorProto {

            /**
             * Constructs a new FieldDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldDescriptorProto);

            /** FieldDescriptorProto name. */
            public name: string;

            /** FieldDescriptorProto number. */
            public number: number;

            /** FieldDescriptorProto label. */
            public label: (google.protobuf.FieldDescriptorProto.Label|keyof typeof google.protobuf.FieldDescriptorProto.Label);

            /** FieldDescriptorProto type. */
            public type: (google.protobuf.FieldDescriptorProto.Type|keyof typeof google.protobuf.FieldDescriptorProto.Type);

            /** FieldDescriptorProto typeName. */
            public typeName: string;

            /** FieldDescriptorProto extendee. */
            public extendee: string;

            /** FieldDescriptorProto defaultValue. */
            public defaultValue: string;

            /** FieldDescriptorProto oneofIndex. */
            public oneofIndex: number;

            /** FieldDescriptorProto jsonName. */
            public jsonName: string;

            /** FieldDescriptorProto options. */
            public options?: (google.protobuf.IFieldOptions|null);

            /** FieldDescriptorProto proto3Optional. */
            public proto3Optional: boolean;

            /**
             * Creates a new FieldDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FieldDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IFieldDescriptorProto): google.protobuf.FieldDescriptorProto;

            /**
             * Encodes the specified FieldDescriptorProto message. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @param message FieldDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FieldDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @param message FieldDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;

            /**
             * Verifies a FieldDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FieldDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;

            /**
             * Creates a plain object from a FieldDescriptorProto message. Also converts values to other types if specified.
             * @param message FieldDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldDescriptorProto {

            /** Type enum. */
            enum Type {
                TYPE_DOUBLE = 1,
                TYPE_FLOAT = 2,
                TYPE_INT64 = 3,
                TYPE_UINT64 = 4,
                TYPE_INT32 = 5,
                TYPE_FIXED64 = 6,
                TYPE_FIXED32 = 7,
                TYPE_BOOL = 8,
                TYPE_STRING = 9,
                TYPE_GROUP = 10,
                TYPE_MESSAGE = 11,
                TYPE_BYTES = 12,
                TYPE_UINT32 = 13,
                TYPE_ENUM = 14,
                TYPE_SFIXED32 = 15,
                TYPE_SFIXED64 = 16,
                TYPE_SINT32 = 17,
                TYPE_SINT64 = 18
            }

            /** Label enum. */
            enum Label {
                LABEL_OPTIONAL = 1,
                LABEL_REQUIRED = 2,
                LABEL_REPEATED = 3
            }
        }

        /** Properties of an OneofDescriptorProto. */
        interface IOneofDescriptorProto {

            /** OneofDescriptorProto name */
            name?: (string|null);

            /** OneofDescriptorProto options */
            options?: (google.protobuf.IOneofOptions|null);
        }

        /** Represents an OneofDescriptorProto. */
        class OneofDescriptorProto implements IOneofDescriptorProto {

            /**
             * Constructs a new OneofDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofDescriptorProto);

            /** OneofDescriptorProto name. */
            public name: string;

            /** OneofDescriptorProto options. */
            public options?: (google.protobuf.IOneofOptions|null);

            /**
             * Creates a new OneofDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OneofDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IOneofDescriptorProto): google.protobuf.OneofDescriptorProto;

            /**
             * Encodes the specified OneofDescriptorProto message. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @param message OneofDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OneofDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @param message OneofDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;

            /**
             * Verifies an OneofDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OneofDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;

            /**
             * Creates a plain object from an OneofDescriptorProto message. Also converts values to other types if specified.
             * @param message OneofDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumDescriptorProto. */
        interface IEnumDescriptorProto {

            /** EnumDescriptorProto name */
            name?: (string|null);

            /** EnumDescriptorProto value */
            value?: (google.protobuf.IEnumValueDescriptorProto[]|null);

            /** EnumDescriptorProto options */
            options?: (google.protobuf.IEnumOptions|null);

            /** EnumDescriptorProto reservedRange */
            reservedRange?: (google.protobuf.EnumDescriptorProto.IEnumReservedRange[]|null);

            /** EnumDescriptorProto reservedName */
            reservedName?: (string[]|null);
        }

        /** Represents an EnumDescriptorProto. */
        class EnumDescriptorProto implements IEnumDescriptorProto {

            /**
             * Constructs a new EnumDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumDescriptorProto);

            /** EnumDescriptorProto name. */
            public name: string;

            /** EnumDescriptorProto value. */
            public value: google.protobuf.IEnumValueDescriptorProto[];

            /** EnumDescriptorProto options. */
            public options?: (google.protobuf.IEnumOptions|null);

            /** EnumDescriptorProto reservedRange. */
            public reservedRange: google.protobuf.EnumDescriptorProto.IEnumReservedRange[];

            /** EnumDescriptorProto reservedName. */
            public reservedName: string[];

            /**
             * Creates a new EnumDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IEnumDescriptorProto): google.protobuf.EnumDescriptorProto;

            /**
             * Encodes the specified EnumDescriptorProto message. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @param message EnumDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @param message EnumDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;

            /**
             * Verifies an EnumDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;

            /**
             * Creates a plain object from an EnumDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace EnumDescriptorProto {

            /** Properties of an EnumReservedRange. */
            interface IEnumReservedRange {

                /** EnumReservedRange start */
                start?: (number|null);

                /** EnumReservedRange end */
                end?: (number|null);
            }

            /** Represents an EnumReservedRange. */
            class EnumReservedRange implements IEnumReservedRange {

                /**
                 * Constructs a new EnumReservedRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.EnumDescriptorProto.IEnumReservedRange);

                /** EnumReservedRange start. */
                public start: number;

                /** EnumReservedRange end. */
                public end: number;

                /**
                 * Creates a new EnumReservedRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EnumReservedRange instance
                 */
                public static create(properties?: google.protobuf.EnumDescriptorProto.IEnumReservedRange): google.protobuf.EnumDescriptorProto.EnumReservedRange;

                /**
                 * Encodes the specified EnumReservedRange message. Does not implicitly {@link google.protobuf.EnumDescriptorProto.EnumReservedRange.verify|verify} messages.
                 * @param message EnumReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.EnumDescriptorProto.IEnumReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified EnumReservedRange message, length delimited. Does not implicitly {@link google.protobuf.EnumDescriptorProto.EnumReservedRange.verify|verify} messages.
                 * @param message EnumReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.EnumDescriptorProto.IEnumReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EnumReservedRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns EnumReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto.EnumReservedRange;

                /**
                 * Decodes an EnumReservedRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns EnumReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto.EnumReservedRange;

                /**
                 * Verifies an EnumReservedRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an EnumReservedRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns EnumReservedRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto.EnumReservedRange;

                /**
                 * Creates a plain object from an EnumReservedRange message. Also converts values to other types if specified.
                 * @param message EnumReservedRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.EnumDescriptorProto.EnumReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this EnumReservedRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of an EnumValueDescriptorProto. */
        interface IEnumValueDescriptorProto {

            /** EnumValueDescriptorProto name */
            name?: (string|null);

            /** EnumValueDescriptorProto number */
            number?: (number|null);

            /** EnumValueDescriptorProto options */
            options?: (google.protobuf.IEnumValueOptions|null);
        }

        /** Represents an EnumValueDescriptorProto. */
        class EnumValueDescriptorProto implements IEnumValueDescriptorProto {

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueDescriptorProto);

            /** EnumValueDescriptorProto name. */
            public name: string;

            /** EnumValueDescriptorProto number. */
            public number: number;

            /** EnumValueDescriptorProto options. */
            public options?: (google.protobuf.IEnumValueOptions|null);

            /**
             * Creates a new EnumValueDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumValueDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IEnumValueDescriptorProto): google.protobuf.EnumValueDescriptorProto;

            /**
             * Encodes the specified EnumValueDescriptorProto message. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @param message EnumValueDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumValueDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @param message EnumValueDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;

            /**
             * Verifies an EnumValueDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumValueDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;

            /**
             * Creates a plain object from an EnumValueDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumValueDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceDescriptorProto. */
        interface IServiceDescriptorProto {

            /** ServiceDescriptorProto name */
            name?: (string|null);

            /** ServiceDescriptorProto method */
            method?: (google.protobuf.IMethodDescriptorProto[]|null);

            /** ServiceDescriptorProto options */
            options?: (google.protobuf.IServiceOptions|null);
        }

        /** Represents a ServiceDescriptorProto. */
        class ServiceDescriptorProto implements IServiceDescriptorProto {

            /**
             * Constructs a new ServiceDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceDescriptorProto);

            /** ServiceDescriptorProto name. */
            public name: string;

            /** ServiceDescriptorProto method. */
            public method: google.protobuf.IMethodDescriptorProto[];

            /** ServiceDescriptorProto options. */
            public options?: (google.protobuf.IServiceOptions|null);

            /**
             * Creates a new ServiceDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServiceDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IServiceDescriptorProto): google.protobuf.ServiceDescriptorProto;

            /**
             * Encodes the specified ServiceDescriptorProto message. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @param message ServiceDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @param message ServiceDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;

            /**
             * Verifies a ServiceDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;

            /**
             * Creates a plain object from a ServiceDescriptorProto message. Also converts values to other types if specified.
             * @param message ServiceDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodDescriptorProto. */
        interface IMethodDescriptorProto {

            /** MethodDescriptorProto name */
            name?: (string|null);

            /** MethodDescriptorProto inputType */
            inputType?: (string|null);

            /** MethodDescriptorProto outputType */
            outputType?: (string|null);

            /** MethodDescriptorProto options */
            options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming */
            clientStreaming?: (boolean|null);

            /** MethodDescriptorProto serverStreaming */
            serverStreaming?: (boolean|null);
        }

        /** Represents a MethodDescriptorProto. */
        class MethodDescriptorProto implements IMethodDescriptorProto {

            /**
             * Constructs a new MethodDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodDescriptorProto);

            /** MethodDescriptorProto name. */
            public name: string;

            /** MethodDescriptorProto inputType. */
            public inputType: string;

            /** MethodDescriptorProto outputType. */
            public outputType: string;

            /** MethodDescriptorProto options. */
            public options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming. */
            public clientStreaming: boolean;

            /** MethodDescriptorProto serverStreaming. */
            public serverStreaming: boolean;

            /**
             * Creates a new MethodDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MethodDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IMethodDescriptorProto): google.protobuf.MethodDescriptorProto;

            /**
             * Encodes the specified MethodDescriptorProto message. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @param message MethodDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @param message MethodDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;

            /**
             * Verifies a MethodDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;

            /**
             * Creates a plain object from a MethodDescriptorProto message. Also converts values to other types if specified.
             * @param message MethodDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileOptions. */
        interface IFileOptions {

            /** FileOptions javaPackage */
            javaPackage?: (string|null);

            /** FileOptions javaOuterClassname */
            javaOuterClassname?: (string|null);

            /** FileOptions javaMultipleFiles */
            javaMultipleFiles?: (boolean|null);

            /** FileOptions javaGenerateEqualsAndHash */
            javaGenerateEqualsAndHash?: (boolean|null);

            /** FileOptions javaStringCheckUtf8 */
            javaStringCheckUtf8?: (boolean|null);

            /** FileOptions optimizeFor */
            optimizeFor?: (google.protobuf.FileOptions.OptimizeMode|keyof typeof google.protobuf.FileOptions.OptimizeMode|null);

            /** FileOptions goPackage */
            goPackage?: (string|null);

            /** FileOptions ccGenericServices */
            ccGenericServices?: (boolean|null);

            /** FileOptions javaGenericServices */
            javaGenericServices?: (boolean|null);

            /** FileOptions pyGenericServices */
            pyGenericServices?: (boolean|null);

            /** FileOptions phpGenericServices */
            phpGenericServices?: (boolean|null);

            /** FileOptions deprecated */
            deprecated?: (boolean|null);

            /** FileOptions ccEnableArenas */
            ccEnableArenas?: (boolean|null);

            /** FileOptions objcClassPrefix */
            objcClassPrefix?: (string|null);

            /** FileOptions csharpNamespace */
            csharpNamespace?: (string|null);

            /** FileOptions swiftPrefix */
            swiftPrefix?: (string|null);

            /** FileOptions phpClassPrefix */
            phpClassPrefix?: (string|null);

            /** FileOptions phpNamespace */
            phpNamespace?: (string|null);

            /** FileOptions phpMetadataNamespace */
            phpMetadataNamespace?: (string|null);

            /** FileOptions rubyPackage */
            rubyPackage?: (string|null);

            /** FileOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a FileOptions. */
        class FileOptions implements IFileOptions {

            /**
             * Constructs a new FileOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileOptions);

            /** FileOptions javaPackage. */
            public javaPackage: string;

            /** FileOptions javaOuterClassname. */
            public javaOuterClassname: string;

            /** FileOptions javaMultipleFiles. */
            public javaMultipleFiles: boolean;

            /** FileOptions javaGenerateEqualsAndHash. */
            public javaGenerateEqualsAndHash: boolean;

            /** FileOptions javaStringCheckUtf8. */
            public javaStringCheckUtf8: boolean;

            /** FileOptions optimizeFor. */
            public optimizeFor: (google.protobuf.FileOptions.OptimizeMode|keyof typeof google.protobuf.FileOptions.OptimizeMode);

            /** FileOptions goPackage. */
            public goPackage: string;

            /** FileOptions ccGenericServices. */
            public ccGenericServices: boolean;

            /** FileOptions javaGenericServices. */
            public javaGenericServices: boolean;

            /** FileOptions pyGenericServices. */
            public pyGenericServices: boolean;

            /** FileOptions phpGenericServices. */
            public phpGenericServices: boolean;

            /** FileOptions deprecated. */
            public deprecated: boolean;

            /** FileOptions ccEnableArenas. */
            public ccEnableArenas: boolean;

            /** FileOptions objcClassPrefix. */
            public objcClassPrefix: string;

            /** FileOptions csharpNamespace. */
            public csharpNamespace: string;

            /** FileOptions swiftPrefix. */
            public swiftPrefix: string;

            /** FileOptions phpClassPrefix. */
            public phpClassPrefix: string;

            /** FileOptions phpNamespace. */
            public phpNamespace: string;

            /** FileOptions phpMetadataNamespace. */
            public phpMetadataNamespace: string;

            /** FileOptions rubyPackage. */
            public rubyPackage: string;

            /** FileOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new FileOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileOptions instance
             */
            public static create(properties?: google.protobuf.IFileOptions): google.protobuf.FileOptions;

            /**
             * Encodes the specified FileOptions message. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @param message FileOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileOptions message, length delimited. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @param message FileOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions;

            /**
             * Decodes a FileOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions;

            /**
             * Verifies a FileOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileOptions;

            /**
             * Creates a plain object from a FileOptions message. Also converts values to other types if specified.
             * @param message FileOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FileOptions {

            /** OptimizeMode enum. */
            enum OptimizeMode {
                SPEED = 1,
                CODE_SIZE = 2,
                LITE_RUNTIME = 3
            }
        }

        /** Properties of a MessageOptions. */
        interface IMessageOptions {

            /** MessageOptions messageSetWireFormat */
            messageSetWireFormat?: (boolean|null);

            /** MessageOptions noStandardDescriptorAccessor */
            noStandardDescriptorAccessor?: (boolean|null);

            /** MessageOptions deprecated */
            deprecated?: (boolean|null);

            /** MessageOptions mapEntry */
            mapEntry?: (boolean|null);

            /** MessageOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a MessageOptions. */
        class MessageOptions implements IMessageOptions {

            /**
             * Constructs a new MessageOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMessageOptions);

            /** MessageOptions messageSetWireFormat. */
            public messageSetWireFormat: boolean;

            /** MessageOptions noStandardDescriptorAccessor. */
            public noStandardDescriptorAccessor: boolean;

            /** MessageOptions deprecated. */
            public deprecated: boolean;

            /** MessageOptions mapEntry. */
            public mapEntry: boolean;

            /** MessageOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new MessageOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MessageOptions instance
             */
            public static create(properties?: google.protobuf.IMessageOptions): google.protobuf.MessageOptions;

            /**
             * Encodes the specified MessageOptions message. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @param message MessageOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MessageOptions message, length delimited. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @param message MessageOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MessageOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;

            /**
             * Decodes a MessageOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions;

            /**
             * Verifies a MessageOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MessageOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MessageOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;

            /**
             * Creates a plain object from a MessageOptions message. Also converts values to other types if specified.
             * @param message MessageOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MessageOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FieldOptions. */
        interface IFieldOptions {

            /** FieldOptions ctype */
            ctype?: (google.protobuf.FieldOptions.CType|keyof typeof google.protobuf.FieldOptions.CType|null);

            /** FieldOptions packed */
            packed?: (boolean|null);

            /** FieldOptions jstype */
            jstype?: (google.protobuf.FieldOptions.JSType|keyof typeof google.protobuf.FieldOptions.JSType|null);

            /** FieldOptions lazy */
            lazy?: (boolean|null);

            /** FieldOptions deprecated */
            deprecated?: (boolean|null);

            /** FieldOptions weak */
            weak?: (boolean|null);

            /** FieldOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** FieldOptions .google.api.fieldBehavior */
            ".google.api.fieldBehavior"?: (google.api.FieldBehavior[]|null);
        }

        /** Represents a FieldOptions. */
        class FieldOptions implements IFieldOptions {

            /**
             * Constructs a new FieldOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldOptions);

            /** FieldOptions ctype. */
            public ctype: (google.protobuf.FieldOptions.CType|keyof typeof google.protobuf.FieldOptions.CType);

            /** FieldOptions packed. */
            public packed: boolean;

            /** FieldOptions jstype. */
            public jstype: (google.protobuf.FieldOptions.JSType|keyof typeof google.protobuf.FieldOptions.JSType);

            /** FieldOptions lazy. */
            public lazy: boolean;

            /** FieldOptions deprecated. */
            public deprecated: boolean;

            /** FieldOptions weak. */
            public weak: boolean;

            /** FieldOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new FieldOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FieldOptions instance
             */
            public static create(properties?: google.protobuf.IFieldOptions): google.protobuf.FieldOptions;

            /**
             * Encodes the specified FieldOptions message. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @param message FieldOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FieldOptions message, length delimited. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @param message FieldOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FieldOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;

            /**
             * Decodes a FieldOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions;

            /**
             * Verifies a FieldOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FieldOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions;

            /**
             * Creates a plain object from a FieldOptions message. Also converts values to other types if specified.
             * @param message FieldOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldOptions {

            /** CType enum. */
            enum CType {
                STRING = 0,
                CORD = 1,
                STRING_PIECE = 2
            }

            /** JSType enum. */
            enum JSType {
                JS_NORMAL = 0,
                JS_STRING = 1,
                JS_NUMBER = 2
            }
        }

        /** Properties of an OneofOptions. */
        interface IOneofOptions {

            /** OneofOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an OneofOptions. */
        class OneofOptions implements IOneofOptions {

            /**
             * Constructs a new OneofOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofOptions);

            /** OneofOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new OneofOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OneofOptions instance
             */
            public static create(properties?: google.protobuf.IOneofOptions): google.protobuf.OneofOptions;

            /**
             * Encodes the specified OneofOptions message. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @param message OneofOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OneofOptions message, length delimited. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @param message OneofOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OneofOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;

            /**
             * Decodes an OneofOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions;

            /**
             * Verifies an OneofOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OneofOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;

            /**
             * Creates a plain object from an OneofOptions message. Also converts values to other types if specified.
             * @param message OneofOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumOptions. */
        interface IEnumOptions {

            /** EnumOptions allowAlias */
            allowAlias?: (boolean|null);

            /** EnumOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an EnumOptions. */
        class EnumOptions implements IEnumOptions {

            /**
             * Constructs a new EnumOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumOptions);

            /** EnumOptions allowAlias. */
            public allowAlias: boolean;

            /** EnumOptions deprecated. */
            public deprecated: boolean;

            /** EnumOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new EnumOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumOptions instance
             */
            public static create(properties?: google.protobuf.IEnumOptions): google.protobuf.EnumOptions;

            /**
             * Encodes the specified EnumOptions message. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @param message EnumOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @param message EnumOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;

            /**
             * Decodes an EnumOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions;

            /**
             * Verifies an EnumOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;

            /**
             * Creates a plain object from an EnumOptions message. Also converts values to other types if specified.
             * @param message EnumOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumValueOptions. */
        interface IEnumValueOptions {

            /** EnumValueOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumValueOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an EnumValueOptions. */
        class EnumValueOptions implements IEnumValueOptions {

            /**
             * Constructs a new EnumValueOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueOptions);

            /** EnumValueOptions deprecated. */
            public deprecated: boolean;

            /** EnumValueOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new EnumValueOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumValueOptions instance
             */
            public static create(properties?: google.protobuf.IEnumValueOptions): google.protobuf.EnumValueOptions;

            /**
             * Encodes the specified EnumValueOptions message. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @param message EnumValueOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumValueOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @param message EnumValueOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions;

            /**
             * Verifies an EnumValueOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumValueOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;

            /**
             * Creates a plain object from an EnumValueOptions message. Also converts values to other types if specified.
             * @param message EnumValueOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceOptions. */
        interface IServiceOptions {

            /** ServiceOptions deprecated */
            deprecated?: (boolean|null);

            /** ServiceOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** ServiceOptions .google.api.defaultHost */
            ".google.api.defaultHost"?: (string|null);

            /** ServiceOptions .google.api.oauthScopes */
            ".google.api.oauthScopes"?: (string|null);
        }

        /** Represents a ServiceOptions. */
        class ServiceOptions implements IServiceOptions {

            /**
             * Constructs a new ServiceOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceOptions);

            /** ServiceOptions deprecated. */
            public deprecated: boolean;

            /** ServiceOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new ServiceOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServiceOptions instance
             */
            public static create(properties?: google.protobuf.IServiceOptions): google.protobuf.ServiceOptions;

            /**
             * Encodes the specified ServiceOptions message. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @param message ServiceOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceOptions message, length delimited. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @param message ServiceOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions;

            /**
             * Verifies a ServiceOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;

            /**
             * Creates a plain object from a ServiceOptions message. Also converts values to other types if specified.
             * @param message ServiceOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodOptions. */
        interface IMethodOptions {

            /** MethodOptions deprecated */
            deprecated?: (boolean|null);

            /** MethodOptions idempotencyLevel */
            idempotencyLevel?: (google.protobuf.MethodOptions.IdempotencyLevel|keyof typeof google.protobuf.MethodOptions.IdempotencyLevel|null);

            /** MethodOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** MethodOptions .google.api.http */
            ".google.api.http"?: (google.api.IHttpRule|null);

            /** MethodOptions .google.api.methodSignature */
            ".google.api.methodSignature"?: (string[]|null);

            /** MethodOptions .google.longrunning.operationInfo */
            ".google.longrunning.operationInfo"?: (google.longrunning.IOperationInfo|null);
        }

        /** Represents a MethodOptions. */
        class MethodOptions implements IMethodOptions {

            /**
             * Constructs a new MethodOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodOptions);

            /** MethodOptions deprecated. */
            public deprecated: boolean;

            /** MethodOptions idempotencyLevel. */
            public idempotencyLevel: (google.protobuf.MethodOptions.IdempotencyLevel|keyof typeof google.protobuf.MethodOptions.IdempotencyLevel);

            /** MethodOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new MethodOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MethodOptions instance
             */
            public static create(properties?: google.protobuf.IMethodOptions): google.protobuf.MethodOptions;

            /**
             * Encodes the specified MethodOptions message. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @param message MethodOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodOptions message, length delimited. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @param message MethodOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;

            /**
             * Decodes a MethodOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions;

            /**
             * Verifies a MethodOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodOptions;

            /**
             * Creates a plain object from a MethodOptions message. Also converts values to other types if specified.
             * @param message MethodOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace MethodOptions {

            /** IdempotencyLevel enum. */
            enum IdempotencyLevel {
                IDEMPOTENCY_UNKNOWN = 0,
                NO_SIDE_EFFECTS = 1,
                IDEMPOTENT = 2
            }
        }

        /** Properties of an UninterpretedOption. */
        interface IUninterpretedOption {

            /** UninterpretedOption name */
            name?: (google.protobuf.UninterpretedOption.INamePart[]|null);

            /** UninterpretedOption identifierValue */
            identifierValue?: (string|null);

            /** UninterpretedOption positiveIntValue */
            positiveIntValue?: (number|Long|string|null);

            /** UninterpretedOption negativeIntValue */
            negativeIntValue?: (number|Long|string|null);

            /** UninterpretedOption doubleValue */
            doubleValue?: (number|null);

            /** UninterpretedOption stringValue */
            stringValue?: (Uint8Array|string|null);

            /** UninterpretedOption aggregateValue */
            aggregateValue?: (string|null);
        }

        /** Represents an UninterpretedOption. */
        class UninterpretedOption implements IUninterpretedOption {

            /**
             * Constructs a new UninterpretedOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUninterpretedOption);

            /** UninterpretedOption name. */
            public name: google.protobuf.UninterpretedOption.INamePart[];

            /** UninterpretedOption identifierValue. */
            public identifierValue: string;

            /** UninterpretedOption positiveIntValue. */
            public positiveIntValue: (number|Long|string);

            /** UninterpretedOption negativeIntValue. */
            public negativeIntValue: (number|Long|string);

            /** UninterpretedOption doubleValue. */
            public doubleValue: number;

            /** UninterpretedOption stringValue. */
            public stringValue: (Uint8Array|string);

            /** UninterpretedOption aggregateValue. */
            public aggregateValue: string;

            /**
             * Creates a new UninterpretedOption instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UninterpretedOption instance
             */
            public static create(properties?: google.protobuf.IUninterpretedOption): google.protobuf.UninterpretedOption;

            /**
             * Encodes the specified UninterpretedOption message. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @param message UninterpretedOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UninterpretedOption message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @param message UninterpretedOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption;

            /**
             * Verifies an UninterpretedOption message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UninterpretedOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UninterpretedOption
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;

            /**
             * Creates a plain object from an UninterpretedOption message. Also converts values to other types if specified.
             * @param message UninterpretedOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UninterpretedOption to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace UninterpretedOption {

            /** Properties of a NamePart. */
            interface INamePart {

                /** NamePart namePart */
                namePart: string;

                /** NamePart isExtension */
                isExtension: boolean;
            }

            /** Represents a NamePart. */
            class NamePart implements INamePart {

                /**
                 * Constructs a new NamePart.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.UninterpretedOption.INamePart);

                /** NamePart namePart. */
                public namePart: string;

                /** NamePart isExtension. */
                public isExtension: boolean;

                /**
                 * Creates a new NamePart instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NamePart instance
                 */
                public static create(properties?: google.protobuf.UninterpretedOption.INamePart): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Encodes the specified NamePart message. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @param message NamePart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NamePart message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @param message NamePart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NamePart message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Decodes a NamePart message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Verifies a NamePart message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NamePart message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NamePart
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Creates a plain object from a NamePart message. Also converts values to other types if specified.
                 * @param message NamePart
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NamePart to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a SourceCodeInfo. */
        interface ISourceCodeInfo {

            /** SourceCodeInfo location */
            location?: (google.protobuf.SourceCodeInfo.ILocation[]|null);
        }

        /** Represents a SourceCodeInfo. */
        class SourceCodeInfo implements ISourceCodeInfo {

            /**
             * Constructs a new SourceCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ISourceCodeInfo);

            /** SourceCodeInfo location. */
            public location: google.protobuf.SourceCodeInfo.ILocation[];

            /**
             * Creates a new SourceCodeInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SourceCodeInfo instance
             */
            public static create(properties?: google.protobuf.ISourceCodeInfo): google.protobuf.SourceCodeInfo;

            /**
             * Encodes the specified SourceCodeInfo message. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @param message SourceCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SourceCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @param message SourceCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo;

            /**
             * Verifies a SourceCodeInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SourceCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SourceCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;

            /**
             * Creates a plain object from a SourceCodeInfo message. Also converts values to other types if specified.
             * @param message SourceCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SourceCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace SourceCodeInfo {

            /** Properties of a Location. */
            interface ILocation {

                /** Location path */
                path?: (number[]|null);

                /** Location span */
                span?: (number[]|null);

                /** Location leadingComments */
                leadingComments?: (string|null);

                /** Location trailingComments */
                trailingComments?: (string|null);

                /** Location leadingDetachedComments */
                leadingDetachedComments?: (string[]|null);
            }

            /** Represents a Location. */
            class Location implements ILocation {

                /**
                 * Constructs a new Location.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);

                /** Location path. */
                public path: number[];

                /** Location span. */
                public span: number[];

                /** Location leadingComments. */
                public leadingComments: string;

                /** Location trailingComments. */
                public trailingComments: string;

                /** Location leadingDetachedComments. */
                public leadingDetachedComments: string[];

                /**
                 * Creates a new Location instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Location instance
                 */
                public static create(properties?: google.protobuf.SourceCodeInfo.ILocation): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Encodes the specified Location message. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Location message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Location message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Decodes a Location message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Verifies a Location message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Location message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Location
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Creates a plain object from a Location message. Also converts values to other types if specified.
                 * @param message Location
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Location to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a GeneratedCodeInfo. */
        interface IGeneratedCodeInfo {

            /** GeneratedCodeInfo annotation */
            annotation?: (google.protobuf.GeneratedCodeInfo.IAnnotation[]|null);
        }

        /** Represents a GeneratedCodeInfo. */
        class GeneratedCodeInfo implements IGeneratedCodeInfo {

            /**
             * Constructs a new GeneratedCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IGeneratedCodeInfo);

            /** GeneratedCodeInfo annotation. */
            public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];

            /**
             * Creates a new GeneratedCodeInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GeneratedCodeInfo instance
             */
            public static create(properties?: google.protobuf.IGeneratedCodeInfo): google.protobuf.GeneratedCodeInfo;

            /**
             * Encodes the specified GeneratedCodeInfo message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @param message GeneratedCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GeneratedCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @param message GeneratedCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;

            /**
             * Verifies a GeneratedCodeInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GeneratedCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GeneratedCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;

            /**
             * Creates a plain object from a GeneratedCodeInfo message. Also converts values to other types if specified.
             * @param message GeneratedCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GeneratedCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace GeneratedCodeInfo {

            /** Properties of an Annotation. */
            interface IAnnotation {

                /** Annotation path */
                path?: (number[]|null);

                /** Annotation sourceFile */
                sourceFile?: (string|null);

                /** Annotation begin */
                begin?: (number|null);

                /** Annotation end */
                end?: (number|null);
            }

            /** Represents an Annotation. */
            class Annotation implements IAnnotation {

                /**
                 * Constructs a new Annotation.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);

                /** Annotation path. */
                public path: number[];

                /** Annotation sourceFile. */
                public sourceFile: string;

                /** Annotation begin. */
                public begin: number;

                /** Annotation end. */
                public end: number;

                /**
                 * Creates a new Annotation instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Annotation instance
                 */
                public static create(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Encodes the specified Annotation message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @param message Annotation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Annotation message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @param message Annotation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Annotation message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Decodes an Annotation message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Verifies an Annotation message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Annotation message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Annotation
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Creates a plain object from an Annotation message. Also converts values to other types if specified.
                 * @param message Annotation
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Annotation to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|string|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: (Uint8Array|string);

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Duration. */
        interface IDuration {

            /** Duration seconds */
            seconds?: (number|Long|string|null);

            /** Duration nanos */
            nanos?: (number|null);
        }

        /** Represents a Duration. */
        class Duration implements IDuration {

            /**
             * Constructs a new Duration.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDuration);

            /** Duration seconds. */
            public seconds: (number|Long|string);

            /** Duration nanos. */
            public nanos: number;

            /**
             * Creates a new Duration instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Duration instance
             */
            public static create(properties?: google.protobuf.IDuration): google.protobuf.Duration;

            /**
             * Encodes the specified Duration message. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @param message Duration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Duration message, length delimited. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @param message Duration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Duration message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Duration;

            /**
             * Decodes a Duration message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Duration;

            /**
             * Verifies a Duration message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Duration message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Duration
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Duration;

            /**
             * Creates a plain object from a Duration message. Also converts values to other types if specified.
             * @param message Duration
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Duration, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Duration to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Empty instance
             */
            public static create(properties?: google.protobuf.IEmpty): google.protobuf.Empty;

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Empty;

            /**
             * Verifies an Empty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Empty
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Empty;

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @param message Empty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Empty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|string|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long|string);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Struct. */
        interface IStruct {

            /** Struct fields */
            fields?: ({ [k: string]: google.protobuf.IValue }|null);
        }

        /** Represents a Struct. */
        class Struct implements IStruct {

            /**
             * Constructs a new Struct.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IStruct);

            /** Struct fields. */
            public fields: { [k: string]: google.protobuf.IValue };

            /**
             * Creates a new Struct instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Struct instance
             */
            public static create(properties?: google.protobuf.IStruct): google.protobuf.Struct;

            /**
             * Encodes the specified Struct message. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @param message Struct message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IStruct, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Struct message, length delimited. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @param message Struct message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IStruct, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Struct message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Struct;

            /**
             * Decodes a Struct message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Struct;

            /**
             * Verifies a Struct message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Struct message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Struct
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Struct;

            /**
             * Creates a plain object from a Struct message. Also converts values to other types if specified.
             * @param message Struct
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Struct, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Struct to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Value. */
        interface IValue {

            /** Value nullValue */
            nullValue?: (google.protobuf.NullValue|keyof typeof google.protobuf.NullValue|null);

            /** Value numberValue */
            numberValue?: (number|null);

            /** Value stringValue */
            stringValue?: (string|null);

            /** Value boolValue */
            boolValue?: (boolean|null);

            /** Value structValue */
            structValue?: (google.protobuf.IStruct|null);

            /** Value listValue */
            listValue?: (google.protobuf.IListValue|null);
        }

        /** Represents a Value. */
        class Value implements IValue {

            /**
             * Constructs a new Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IValue);

            /** Value nullValue. */
            public nullValue?: (google.protobuf.NullValue|keyof typeof google.protobuf.NullValue|null);

            /** Value numberValue. */
            public numberValue?: (number|null);

            /** Value stringValue. */
            public stringValue?: (string|null);

            /** Value boolValue. */
            public boolValue?: (boolean|null);

            /** Value structValue. */
            public structValue?: (google.protobuf.IStruct|null);

            /** Value listValue. */
            public listValue?: (google.protobuf.IListValue|null);

            /** Value kind. */
            public kind?: ("nullValue"|"numberValue"|"stringValue"|"boolValue"|"structValue"|"listValue");

            /**
             * Creates a new Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Value instance
             */
            public static create(properties?: google.protobuf.IValue): google.protobuf.Value;

            /**
             * Encodes the specified Value message. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @param message Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Value message, length delimited. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @param message Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Value;

            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Value;

            /**
             * Verifies a Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Value;

            /**
             * Creates a plain object from a Value message. Also converts values to other types if specified.
             * @param message Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** NullValue enum. */
        enum NullValue {
            NULL_VALUE = 0
        }

        /** Properties of a ListValue. */
        interface IListValue {

            /** ListValue values */
            values?: (google.protobuf.IValue[]|null);
        }

        /** Represents a ListValue. */
        class ListValue implements IListValue {

            /**
             * Constructs a new ListValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IListValue);

            /** ListValue values. */
            public values: google.protobuf.IValue[];

            /**
             * Creates a new ListValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ListValue instance
             */
            public static create(properties?: google.protobuf.IListValue): google.protobuf.ListValue;

            /**
             * Encodes the specified ListValue message. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @param message ListValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IListValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ListValue message, length delimited. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @param message ListValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IListValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ListValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ListValue;

            /**
             * Decodes a ListValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ListValue;

            /**
             * Verifies a ListValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ListValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ListValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ListValue;

            /**
             * Creates a plain object from a ListValue message. Also converts values to other types if specified.
             * @param message ListValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ListValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ListValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DoubleValue. */
        interface IDoubleValue {

            /** DoubleValue value */
            value?: (number|null);
        }

        /** Represents a DoubleValue. */
        class DoubleValue implements IDoubleValue {

            /**
             * Constructs a new DoubleValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDoubleValue);

            /** DoubleValue value. */
            public value: number;

            /**
             * Creates a new DoubleValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DoubleValue instance
             */
            public static create(properties?: google.protobuf.IDoubleValue): google.protobuf.DoubleValue;

            /**
             * Encodes the specified DoubleValue message. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @param message DoubleValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DoubleValue message, length delimited. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @param message DoubleValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DoubleValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DoubleValue;

            /**
             * Decodes a DoubleValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DoubleValue;

            /**
             * Verifies a DoubleValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DoubleValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DoubleValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.DoubleValue;

            /**
             * Creates a plain object from a DoubleValue message. Also converts values to other types if specified.
             * @param message DoubleValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.DoubleValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DoubleValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FloatValue. */
        interface IFloatValue {

            /** FloatValue value */
            value?: (number|null);
        }

        /** Represents a FloatValue. */
        class FloatValue implements IFloatValue {

            /**
             * Constructs a new FloatValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFloatValue);

            /** FloatValue value. */
            public value: number;

            /**
             * Creates a new FloatValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FloatValue instance
             */
            public static create(properties?: google.protobuf.IFloatValue): google.protobuf.FloatValue;

            /**
             * Encodes the specified FloatValue message. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @param message FloatValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFloatValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FloatValue message, length delimited. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @param message FloatValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFloatValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FloatValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FloatValue;

            /**
             * Decodes a FloatValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FloatValue;

            /**
             * Verifies a FloatValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FloatValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FloatValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FloatValue;

            /**
             * Creates a plain object from a FloatValue message. Also converts values to other types if specified.
             * @param message FloatValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FloatValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FloatValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Int64Value. */
        interface IInt64Value {

            /** Int64Value value */
            value?: (number|Long|string|null);
        }

        /** Represents an Int64Value. */
        class Int64Value implements IInt64Value {

            /**
             * Constructs a new Int64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt64Value);

            /** Int64Value value. */
            public value: (number|Long|string);

            /**
             * Creates a new Int64Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Int64Value instance
             */
            public static create(properties?: google.protobuf.IInt64Value): google.protobuf.Int64Value;

            /**
             * Encodes the specified Int64Value message. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @param message Int64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Int64Value message, length delimited. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @param message Int64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Int64Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int64Value;

            /**
             * Decodes an Int64Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int64Value;

            /**
             * Verifies an Int64Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Int64Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Int64Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int64Value;

            /**
             * Creates a plain object from an Int64Value message. Also converts values to other types if specified.
             * @param message Int64Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Int64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Int64Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a UInt64Value. */
        interface IUInt64Value {

            /** UInt64Value value */
            value?: (number|Long|string|null);
        }

        /** Represents a UInt64Value. */
        class UInt64Value implements IUInt64Value {

            /**
             * Constructs a new UInt64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt64Value);

            /** UInt64Value value. */
            public value: (number|Long|string);

            /**
             * Creates a new UInt64Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UInt64Value instance
             */
            public static create(properties?: google.protobuf.IUInt64Value): google.protobuf.UInt64Value;

            /**
             * Encodes the specified UInt64Value message. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @param message UInt64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UInt64Value message, length delimited. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @param message UInt64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UInt64Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt64Value;

            /**
             * Decodes a UInt64Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt64Value;

            /**
             * Verifies a UInt64Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UInt64Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UInt64Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt64Value;

            /**
             * Creates a plain object from a UInt64Value message. Also converts values to other types if specified.
             * @param message UInt64Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UInt64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UInt64Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Int32Value. */
        interface IInt32Value {

            /** Int32Value value */
            value?: (number|null);
        }

        /** Represents an Int32Value. */
        class Int32Value implements IInt32Value {

            /**
             * Constructs a new Int32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt32Value);

            /** Int32Value value. */
            public value: number;

            /**
             * Creates a new Int32Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Int32Value instance
             */
            public static create(properties?: google.protobuf.IInt32Value): google.protobuf.Int32Value;

            /**
             * Encodes the specified Int32Value message. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @param message Int32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Int32Value message, length delimited. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @param message Int32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Int32Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int32Value;

            /**
             * Decodes an Int32Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int32Value;

            /**
             * Verifies an Int32Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Int32Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Int32Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int32Value;

            /**
             * Creates a plain object from an Int32Value message. Also converts values to other types if specified.
             * @param message Int32Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Int32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Int32Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a UInt32Value. */
        interface IUInt32Value {

            /** UInt32Value value */
            value?: (number|null);
        }

        /** Represents a UInt32Value. */
        class UInt32Value implements IUInt32Value {

            /**
             * Constructs a new UInt32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt32Value);

            /** UInt32Value value. */
            public value: number;

            /**
             * Creates a new UInt32Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UInt32Value instance
             */
            public static create(properties?: google.protobuf.IUInt32Value): google.protobuf.UInt32Value;

            /**
             * Encodes the specified UInt32Value message. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @param message UInt32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UInt32Value message, length delimited. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @param message UInt32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UInt32Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt32Value;

            /**
             * Decodes a UInt32Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt32Value;

            /**
             * Verifies a UInt32Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UInt32Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UInt32Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt32Value;

            /**
             * Creates a plain object from a UInt32Value message. Also converts values to other types if specified.
             * @param message UInt32Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UInt32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UInt32Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BoolValue. */
        interface IBoolValue {

            /** BoolValue value */
            value?: (boolean|null);
        }

        /** Represents a BoolValue. */
        class BoolValue implements IBoolValue {

            /**
             * Constructs a new BoolValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBoolValue);

            /** BoolValue value. */
            public value: boolean;

            /**
             * Creates a new BoolValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BoolValue instance
             */
            public static create(properties?: google.protobuf.IBoolValue): google.protobuf.BoolValue;

            /**
             * Encodes the specified BoolValue message. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @param message BoolValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IBoolValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BoolValue message, length delimited. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @param message BoolValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IBoolValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BoolValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BoolValue;

            /**
             * Decodes a BoolValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BoolValue;

            /**
             * Verifies a BoolValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BoolValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BoolValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.BoolValue;

            /**
             * Creates a plain object from a BoolValue message. Also converts values to other types if specified.
             * @param message BoolValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.BoolValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BoolValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a StringValue. */
        interface IStringValue {

            /** StringValue value */
            value?: (string|null);
        }

        /** Represents a StringValue. */
        class StringValue implements IStringValue {

            /**
             * Constructs a new StringValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IStringValue);

            /** StringValue value. */
            public value: string;

            /**
             * Creates a new StringValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StringValue instance
             */
            public static create(properties?: google.protobuf.IStringValue): google.protobuf.StringValue;

            /**
             * Encodes the specified StringValue message. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @param message StringValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StringValue message, length delimited. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @param message StringValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StringValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.StringValue;

            /**
             * Decodes a StringValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.StringValue;

            /**
             * Verifies a StringValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StringValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StringValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.StringValue;

            /**
             * Creates a plain object from a StringValue message. Also converts values to other types if specified.
             * @param message StringValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.StringValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StringValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BytesValue. */
        interface IBytesValue {

            /** BytesValue value */
            value?: (Uint8Array|string|null);
        }

        /** Represents a BytesValue. */
        class BytesValue implements IBytesValue {

            /**
             * Constructs a new BytesValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBytesValue);

            /** BytesValue value. */
            public value: (Uint8Array|string);

            /**
             * Creates a new BytesValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BytesValue instance
             */
            public static create(properties?: google.protobuf.IBytesValue): google.protobuf.BytesValue;

            /**
             * Encodes the specified BytesValue message. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @param message BytesValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IBytesValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BytesValue message, length delimited. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @param message BytesValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IBytesValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BytesValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BytesValue;

            /**
             * Decodes a BytesValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BytesValue;

            /**
             * Verifies a BytesValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BytesValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BytesValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.BytesValue;

            /**
             * Creates a plain object from a BytesValue message. Also converts values to other types if specified.
             * @param message BytesValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.BytesValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BytesValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace longrunning. */
    namespace longrunning {

        /** Represents an Operations */
        class Operations extends $protobuf.rpc.Service {

            /**
             * Constructs a new Operations service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Creates new Operations service using the specified rpc implementation.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             * @returns RPC service. Useful where requests and/or responses are streamed.
             */
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Operations;

            /**
             * Calls ListOperations.
             * @param request ListOperationsRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and ListOperationsResponse
             */
            public listOperations(request: google.longrunning.IListOperationsRequest, callback: google.longrunning.Operations.ListOperationsCallback): void;

            /**
             * Calls ListOperations.
             * @param request ListOperationsRequest message or plain object
             * @returns Promise
             */
            public listOperations(request: google.longrunning.IListOperationsRequest): Promise<google.longrunning.ListOperationsResponse>;

            /**
             * Calls GetOperation.
             * @param request GetOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Operation
             */
            public getOperation(request: google.longrunning.IGetOperationRequest, callback: google.longrunning.Operations.GetOperationCallback): void;

            /**
             * Calls GetOperation.
             * @param request GetOperationRequest message or plain object
             * @returns Promise
             */
            public getOperation(request: google.longrunning.IGetOperationRequest): Promise<google.longrunning.Operation>;

            /**
             * Calls DeleteOperation.
             * @param request DeleteOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Empty
             */
            public deleteOperation(request: google.longrunning.IDeleteOperationRequest, callback: google.longrunning.Operations.DeleteOperationCallback): void;

            /**
             * Calls DeleteOperation.
             * @param request DeleteOperationRequest message or plain object
             * @returns Promise
             */
            public deleteOperation(request: google.longrunning.IDeleteOperationRequest): Promise<google.protobuf.Empty>;

            /**
             * Calls CancelOperation.
             * @param request CancelOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Empty
             */
            public cancelOperation(request: google.longrunning.ICancelOperationRequest, callback: google.longrunning.Operations.CancelOperationCallback): void;

            /**
             * Calls CancelOperation.
             * @param request CancelOperationRequest message or plain object
             * @returns Promise
             */
            public cancelOperation(request: google.longrunning.ICancelOperationRequest): Promise<google.protobuf.Empty>;

            /**
             * Calls WaitOperation.
             * @param request WaitOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Operation
             */
            public waitOperation(request: google.longrunning.IWaitOperationRequest, callback: google.longrunning.Operations.WaitOperationCallback): void;

            /**
             * Calls WaitOperation.
             * @param request WaitOperationRequest message or plain object
             * @returns Promise
             */
            public waitOperation(request: google.longrunning.IWaitOperationRequest): Promise<google.longrunning.Operation>;
        }

        namespace Operations {

            /**
             * Callback as used by {@link google.longrunning.Operations#listOperations}.
             * @param error Error, if any
             * @param [response] ListOperationsResponse
             */
            type ListOperationsCallback = (error: (Error|null), response?: google.longrunning.ListOperationsResponse) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#getOperation}.
             * @param error Error, if any
             * @param [response] Operation
             */
            type GetOperationCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#deleteOperation}.
             * @param error Error, if any
             * @param [response] Empty
             */
            type DeleteOperationCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#cancelOperation}.
             * @param error Error, if any
             * @param [response] Empty
             */
            type CancelOperationCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#waitOperation}.
             * @param error Error, if any
             * @param [response] Operation
             */
            type WaitOperationCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;
        }

        /** Properties of an Operation. */
        interface IOperation {

            /** Operation name */
            name?: (string|null);

            /** Operation metadata */
            metadata?: (google.protobuf.IAny|null);

            /** Operation done */
            done?: (boolean|null);

            /** Operation error */
            error?: (google.rpc.IStatus|null);

            /** Operation response */
            response?: (google.protobuf.IAny|null);
        }

        /** Represents an Operation. */
        class Operation implements IOperation {

            /**
             * Constructs a new Operation.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IOperation);

            /** Operation name. */
            public name: string;

            /** Operation metadata. */
            public metadata?: (google.protobuf.IAny|null);

            /** Operation done. */
            public done: boolean;

            /** Operation error. */
            public error?: (google.rpc.IStatus|null);

            /** Operation response. */
            public response?: (google.protobuf.IAny|null);

            /** Operation result. */
            public result?: ("error"|"response");

            /**
             * Creates a new Operation instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Operation instance
             */
            public static create(properties?: google.longrunning.IOperation): google.longrunning.Operation;

            /**
             * Encodes the specified Operation message. Does not implicitly {@link google.longrunning.Operation.verify|verify} messages.
             * @param message Operation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Operation message, length delimited. Does not implicitly {@link google.longrunning.Operation.verify|verify} messages.
             * @param message Operation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Operation message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Operation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.Operation;

            /**
             * Decodes an Operation message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Operation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.Operation;

            /**
             * Verifies an Operation message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Operation message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Operation
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.Operation;

            /**
             * Creates a plain object from an Operation message. Also converts values to other types if specified.
             * @param message Operation
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.Operation, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Operation to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetOperationRequest. */
        interface IGetOperationRequest {

            /** GetOperationRequest name */
            name?: (string|null);
        }

        /** Represents a GetOperationRequest. */
        class GetOperationRequest implements IGetOperationRequest {

            /**
             * Constructs a new GetOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IGetOperationRequest);

            /** GetOperationRequest name. */
            public name: string;

            /**
             * Creates a new GetOperationRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetOperationRequest instance
             */
            public static create(properties?: google.longrunning.IGetOperationRequest): google.longrunning.GetOperationRequest;

            /**
             * Encodes the specified GetOperationRequest message. Does not implicitly {@link google.longrunning.GetOperationRequest.verify|verify} messages.
             * @param message GetOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IGetOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetOperationRequest message, length delimited. Does not implicitly {@link google.longrunning.GetOperationRequest.verify|verify} messages.
             * @param message GetOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IGetOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetOperationRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.GetOperationRequest;

            /**
             * Decodes a GetOperationRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.GetOperationRequest;

            /**
             * Verifies a GetOperationRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetOperationRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetOperationRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.GetOperationRequest;

            /**
             * Creates a plain object from a GetOperationRequest message. Also converts values to other types if specified.
             * @param message GetOperationRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.GetOperationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetOperationRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ListOperationsRequest. */
        interface IListOperationsRequest {

            /** ListOperationsRequest name */
            name?: (string|null);

            /** ListOperationsRequest filter */
            filter?: (string|null);

            /** ListOperationsRequest pageSize */
            pageSize?: (number|null);

            /** ListOperationsRequest pageToken */
            pageToken?: (string|null);
        }

        /** Represents a ListOperationsRequest. */
        class ListOperationsRequest implements IListOperationsRequest {

            /**
             * Constructs a new ListOperationsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IListOperationsRequest);

            /** ListOperationsRequest name. */
            public name: string;

            /** ListOperationsRequest filter. */
            public filter: string;

            /** ListOperationsRequest pageSize. */
            public pageSize: number;

            /** ListOperationsRequest pageToken. */
            public pageToken: string;

            /**
             * Creates a new ListOperationsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ListOperationsRequest instance
             */
            public static create(properties?: google.longrunning.IListOperationsRequest): google.longrunning.ListOperationsRequest;

            /**
             * Encodes the specified ListOperationsRequest message. Does not implicitly {@link google.longrunning.ListOperationsRequest.verify|verify} messages.
             * @param message ListOperationsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IListOperationsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ListOperationsRequest message, length delimited. Does not implicitly {@link google.longrunning.ListOperationsRequest.verify|verify} messages.
             * @param message ListOperationsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IListOperationsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ListOperationsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ListOperationsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.ListOperationsRequest;

            /**
             * Decodes a ListOperationsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ListOperationsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.ListOperationsRequest;

            /**
             * Verifies a ListOperationsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ListOperationsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ListOperationsRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.ListOperationsRequest;

            /**
             * Creates a plain object from a ListOperationsRequest message. Also converts values to other types if specified.
             * @param message ListOperationsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.ListOperationsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ListOperationsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ListOperationsResponse. */
        interface IListOperationsResponse {

            /** ListOperationsResponse operations */
            operations?: (google.longrunning.IOperation[]|null);

            /** ListOperationsResponse nextPageToken */
            nextPageToken?: (string|null);
        }

        /** Represents a ListOperationsResponse. */
        class ListOperationsResponse implements IListOperationsResponse {

            /**
             * Constructs a new ListOperationsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IListOperationsResponse);

            /** ListOperationsResponse operations. */
            public operations: google.longrunning.IOperation[];

            /** ListOperationsResponse nextPageToken. */
            public nextPageToken: string;

            /**
             * Creates a new ListOperationsResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ListOperationsResponse instance
             */
            public static create(properties?: google.longrunning.IListOperationsResponse): google.longrunning.ListOperationsResponse;

            /**
             * Encodes the specified ListOperationsResponse message. Does not implicitly {@link google.longrunning.ListOperationsResponse.verify|verify} messages.
             * @param message ListOperationsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IListOperationsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ListOperationsResponse message, length delimited. Does not implicitly {@link google.longrunning.ListOperationsResponse.verify|verify} messages.
             * @param message ListOperationsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IListOperationsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ListOperationsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ListOperationsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.ListOperationsResponse;

            /**
             * Decodes a ListOperationsResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ListOperationsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.ListOperationsResponse;

            /**
             * Verifies a ListOperationsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ListOperationsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ListOperationsResponse
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.ListOperationsResponse;

            /**
             * Creates a plain object from a ListOperationsResponse message. Also converts values to other types if specified.
             * @param message ListOperationsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.ListOperationsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ListOperationsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CancelOperationRequest. */
        interface ICancelOperationRequest {

            /** CancelOperationRequest name */
            name?: (string|null);
        }

        /** Represents a CancelOperationRequest. */
        class CancelOperationRequest implements ICancelOperationRequest {

            /**
             * Constructs a new CancelOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.ICancelOperationRequest);

            /** CancelOperationRequest name. */
            public name: string;

            /**
             * Creates a new CancelOperationRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CancelOperationRequest instance
             */
            public static create(properties?: google.longrunning.ICancelOperationRequest): google.longrunning.CancelOperationRequest;

            /**
             * Encodes the specified CancelOperationRequest message. Does not implicitly {@link google.longrunning.CancelOperationRequest.verify|verify} messages.
             * @param message CancelOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.ICancelOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CancelOperationRequest message, length delimited. Does not implicitly {@link google.longrunning.CancelOperationRequest.verify|verify} messages.
             * @param message CancelOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.ICancelOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CancelOperationRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CancelOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.CancelOperationRequest;

            /**
             * Decodes a CancelOperationRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CancelOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.CancelOperationRequest;

            /**
             * Verifies a CancelOperationRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CancelOperationRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CancelOperationRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.CancelOperationRequest;

            /**
             * Creates a plain object from a CancelOperationRequest message. Also converts values to other types if specified.
             * @param message CancelOperationRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.CancelOperationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CancelOperationRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DeleteOperationRequest. */
        interface IDeleteOperationRequest {

            /** DeleteOperationRequest name */
            name?: (string|null);
        }

        /** Represents a DeleteOperationRequest. */
        class DeleteOperationRequest implements IDeleteOperationRequest {

            /**
             * Constructs a new DeleteOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IDeleteOperationRequest);

            /** DeleteOperationRequest name. */
            public name: string;

            /**
             * Creates a new DeleteOperationRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeleteOperationRequest instance
             */
            public static create(properties?: google.longrunning.IDeleteOperationRequest): google.longrunning.DeleteOperationRequest;

            /**
             * Encodes the specified DeleteOperationRequest message. Does not implicitly {@link google.longrunning.DeleteOperationRequest.verify|verify} messages.
             * @param message DeleteOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IDeleteOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeleteOperationRequest message, length delimited. Does not implicitly {@link google.longrunning.DeleteOperationRequest.verify|verify} messages.
             * @param message DeleteOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IDeleteOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeleteOperationRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeleteOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.DeleteOperationRequest;

            /**
             * Decodes a DeleteOperationRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeleteOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.DeleteOperationRequest;

            /**
             * Verifies a DeleteOperationRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeleteOperationRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeleteOperationRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.DeleteOperationRequest;

            /**
             * Creates a plain object from a DeleteOperationRequest message. Also converts values to other types if specified.
             * @param message DeleteOperationRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.DeleteOperationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeleteOperationRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a WaitOperationRequest. */
        interface IWaitOperationRequest {

            /** WaitOperationRequest name */
            name?: (string|null);

            /** WaitOperationRequest timeout */
            timeout?: (google.protobuf.IDuration|null);
        }

        /** Represents a WaitOperationRequest. */
        class WaitOperationRequest implements IWaitOperationRequest {

            /**
             * Constructs a new WaitOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IWaitOperationRequest);

            /** WaitOperationRequest name. */
            public name: string;

            /** WaitOperationRequest timeout. */
            public timeout?: (google.protobuf.IDuration|null);

            /**
             * Creates a new WaitOperationRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WaitOperationRequest instance
             */
            public static create(properties?: google.longrunning.IWaitOperationRequest): google.longrunning.WaitOperationRequest;

            /**
             * Encodes the specified WaitOperationRequest message. Does not implicitly {@link google.longrunning.WaitOperationRequest.verify|verify} messages.
             * @param message WaitOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IWaitOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WaitOperationRequest message, length delimited. Does not implicitly {@link google.longrunning.WaitOperationRequest.verify|verify} messages.
             * @param message WaitOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IWaitOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WaitOperationRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WaitOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.WaitOperationRequest;

            /**
             * Decodes a WaitOperationRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WaitOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.WaitOperationRequest;

            /**
             * Verifies a WaitOperationRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WaitOperationRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WaitOperationRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.WaitOperationRequest;

            /**
             * Creates a plain object from a WaitOperationRequest message. Also converts values to other types if specified.
             * @param message WaitOperationRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.WaitOperationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WaitOperationRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an OperationInfo. */
        interface IOperationInfo {

            /** OperationInfo responseType */
            responseType?: (string|null);

            /** OperationInfo metadataType */
            metadataType?: (string|null);
        }

        /** Represents an OperationInfo. */
        class OperationInfo implements IOperationInfo {

            /**
             * Constructs a new OperationInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IOperationInfo);

            /** OperationInfo responseType. */
            public responseType: string;

            /** OperationInfo metadataType. */
            public metadataType: string;

            /**
             * Creates a new OperationInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OperationInfo instance
             */
            public static create(properties?: google.longrunning.IOperationInfo): google.longrunning.OperationInfo;

            /**
             * Encodes the specified OperationInfo message. Does not implicitly {@link google.longrunning.OperationInfo.verify|verify} messages.
             * @param message OperationInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IOperationInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OperationInfo message, length delimited. Does not implicitly {@link google.longrunning.OperationInfo.verify|verify} messages.
             * @param message OperationInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IOperationInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OperationInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OperationInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.OperationInfo;

            /**
             * Decodes an OperationInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OperationInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.OperationInfo;

            /**
             * Verifies an OperationInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OperationInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OperationInfo
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.OperationInfo;

            /**
             * Creates a plain object from an OperationInfo message. Also converts values to other types if specified.
             * @param message OperationInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.OperationInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OperationInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace rpc. */
    namespace rpc {

        /** Properties of a Status. */
        interface IStatus {

            /** Status code */
            code?: (number|null);

            /** Status message */
            message?: (string|null);

            /** Status details */
            details?: (google.protobuf.IAny[]|null);
        }

        /** Represents a Status. */
        class Status implements IStatus {

            /**
             * Constructs a new Status.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.rpc.IStatus);

            /** Status code. */
            public code: number;

            /** Status message. */
            public message: string;

            /** Status details. */
            public details: google.protobuf.IAny[];

            /**
             * Creates a new Status instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Status instance
             */
            public static create(properties?: google.rpc.IStatus): google.rpc.Status;

            /**
             * Encodes the specified Status message. Does not implicitly {@link google.rpc.Status.verify|verify} messages.
             * @param message Status message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.rpc.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Status message, length delimited. Does not implicitly {@link google.rpc.Status.verify|verify} messages.
             * @param message Status message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.rpc.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Status message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.rpc.Status;

            /**
             * Decodes a Status message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.rpc.Status;

            /**
             * Verifies a Status message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Status message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Status
             */
            public static fromObject(object: { [k: string]: any }): google.rpc.Status;

            /**
             * Creates a plain object from a Status message. Also converts values to other types if specified.
             * @param message Status
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.rpc.Status, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Status to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace type. */
    namespace type {

        /** Properties of a LatLng. */
        interface ILatLng {

            /** LatLng latitude */
            latitude?: (number|null);

            /** LatLng longitude */
            longitude?: (number|null);
        }

        /** Represents a LatLng. */
        class LatLng implements ILatLng {

            /**
             * Constructs a new LatLng.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.type.ILatLng);

            /** LatLng latitude. */
            public latitude: number;

            /** LatLng longitude. */
            public longitude: number;

            /**
             * Creates a new LatLng instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LatLng instance
             */
            public static create(properties?: google.type.ILatLng): google.type.LatLng;

            /**
             * Encodes the specified LatLng message. Does not implicitly {@link google.type.LatLng.verify|verify} messages.
             * @param message LatLng message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.type.ILatLng, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LatLng message, length delimited. Does not implicitly {@link google.type.LatLng.verify|verify} messages.
             * @param message LatLng message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.type.ILatLng, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LatLng message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LatLng
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.type.LatLng;

            /**
             * Decodes a LatLng message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LatLng
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.type.LatLng;

            /**
             * Verifies a LatLng message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LatLng message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LatLng
             */
            public static fromObject(object: { [k: string]: any }): google.type.LatLng;

            /**
             * Creates a plain object from a LatLng message. Also converts values to other types if specified.
             * @param message LatLng
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.type.LatLng, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LatLng to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
