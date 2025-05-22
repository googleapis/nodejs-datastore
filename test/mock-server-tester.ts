// Copyright 2025 Google LLC
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

import {
  CallType,
  GrpcErrorType,
  SuccessType,
} from '../mock-server/datastore-server';

import grpc = require('@grpc/grpc-js');
import {ServiceError} from 'google-gax';

/**
 * Simulates a non-retryable error response from a gRPC service.
 *
 * This function is designed for use in mock server setups during testing.
 * When invoked as a gRPC endpoint handler, it responds with a pre-configured
 * error object representing a non-retryable error. The error includes a
 * NOT_FOUND code (5), a fixed details message, and some metadata.
 *
 * @param {any} call - The gRPC call object, representing the incoming request.
 * @param {function} callback - The callback function to be invoked with the
 *   simulated error response. It expects two arguments: an error object and an
 *   empty object (representing no response data).
 */
export function sendNonRetryableError<ResponseType>(
  call: CallType,
  callback: (arg1: GrpcErrorType, arg2: ResponseType) => {},
) {
  const metadata = new grpc.Metadata();
  metadata.set(
    'grpc-server-stats-bin',
    Buffer.from([0, 0, 116, 73, 159, 3, 0, 0, 0, 0]),
  );
  const error = new Error('error message') as ServiceError;
  error.code = 5;
  error.details = 'error details';
  error.metadata = metadata;
  callback(error, {} as ResponseType);
}

export class ErrorGenerator {
  private errorSeriesCount = 0;

  /**
   * Generates an error object for testing purposes.
   *
   * This method creates a `ServiceError` object, simulating an error
   * that might be returned by a gRPC service. The error includes a
   * `DEADLINE_EXCEEDED` code (4), a details message indicating the number of
   * errors generated so far by this instance, and some metadata.
   *
   * @returns {ServiceError} A `ServiceError` object representing a simulated
   *   gRPC error.
   */
  generateError(code: number) {
    // SET A BREAKPOINT HERE AND EXPLORE `call` TO SEE THE REQUEST.
    this.errorSeriesCount++;
    const metadata = new grpc.Metadata();
    metadata.set(
      'grpc-server-stats-bin',
      Buffer.from([0, 0, 116, 73, 159, 3, 0, 0, 0, 0]),
    );
    const error = new Error('error message') as ServiceError;
    error.code = code;
    error.details = `error details: error count: ${this.errorSeriesCount}`;
    error.metadata = metadata;
    return error;
  }

  /**
   * Returns a function that simulates an error response from a gRPC service.
   *
   * This method is designed to be used in mock server setups for testing purposes.
   * It returns a function that, when called, will invoke a callback with a
   * pre-configured error object, simulating a gRPC service responding with an error.
   * The error includes a DEADLINE_EXCEEDED code (4), a details message indicating the
   * number of errors generated so far by this instance, and some metadata.
   *
   * @param {number} code The grpc error code for the error sent back
   * @returns {function} A function that takes a `call` object (representing the
   *   gRPC call) and a `callback` function, and responds to the call with a
   *   simulated error.
   */
  sendErrorSeries<ResponseType>(code: number) {
    return (
      call: CallType,
      callback: (arg1: GrpcErrorType, arg2: ResponseType) => {},
    ) => {
      const error = this.generateError(code);
      callback(error, {} as ResponseType);
    };
  }
}

export function shutdownServer(server: grpc.Server) {
  return new Promise((resolve, reject) => {
    // Assuming 'server.tryShutdown' is a function that takes a callback.
    // The callback is expected to be called when the shutdown attempt is complete.
    // If 'tryShutdown' itself can throw an error or indicate an immediate failure
    // (without calling the callback), you might need to wrap this call in a try...catch block.

    server.tryShutdown((error: Error | undefined) => {
      if (error) {
        // If the callback is called with an error, reject the promise.
        console.error('Server shutdown failed:', error);
        reject(error);
      } else {
        // If the callback is called without an error, resolve the promise.
        console.log('Server has been shut down successfully.');
        resolve('done');
      }
    });
  });
}
