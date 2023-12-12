const {dirname, resolve} = require('node:path');

const PROTO_PATH = __dirname + '/../protos/google/datastore/v1/datastore.proto';
const DATASTORE_PROTOS = __dirname + '/../protos';
const GAX_PROTOS_DIR = resolve(
  // eslint-disable-next-line node/no-extraneous-require
  dirname(require.resolve('google-gax')),
  '../protos'
);

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [DATASTORE_PROTOS, GAX_PROTOS_DIR],
});
const descriptor = grpc.loadPackageDefinition(packageDefinition);

/**
 * Implements the runQuery RPC method.
 */
function runQuery(call: any, callback: any) {
  callback(null, {message: 'Hello ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for datastore
 */
export function startServer(cb: any) {
  const server = new grpc.Server();
  const service = descriptor.google.datastore.v1.Datastore.service;
  server.addService(service, {runQuery: runQuery});
  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log('server started');
      cb();
    }
  );
}
