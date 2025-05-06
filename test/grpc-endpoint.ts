const grpc = require('@grpc/grpc-js');
import {ServiceError} from 'google-gax';

export function grpcEndpoint(call: any, callback: (arg1: any, arg2: {}) => {}) {
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
