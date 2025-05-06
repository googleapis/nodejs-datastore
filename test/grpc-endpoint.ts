const grpc = require('@grpc/grpc-js');
import {ServiceError} from 'google-gax';

export function sendNonRetryableError(call: any, callback: (arg1: any, arg2: {}) => {}) {
  // SET A BREAKPOINT HERE AND EXPLORE `call` TO SEE THE REQUEST.
  const metadata = new grpc.Metadata();
  metadata.set(
    'grpc-server-stats-bin',
    Buffer.from([0, 0, 116, 73, 159, 3, 0, 0, 0, 0]),
  );
  const error = new Error('error message') as ServiceError;
  error.code = 5;
  error.details = 'error details';
  error.metadata = metadata;
  callback(error, {});
}

export function shutdownServer(server: any) {
  return new Promise((resolve, reject) => {
    // Assuming 'server.tryShutdown' is a function that takes a callback.
    // The callback is expected to be called when the shutdown attempt is complete.
    // If 'tryShutdown' itself can throw an error or indicate an immediate failure
    // (without calling the callback), you might need to wrap this call in a try...catch block.

    server.tryShutdown((error: any) => {
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
