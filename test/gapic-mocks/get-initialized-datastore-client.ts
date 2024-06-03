import {Datastore} from '../../src';

/**
 * This function gets a datastore client that has already been initialized
 * meaning that its gapic data client has been created and is ready to be mocked
 * out with whatever behavior is needed in a test. Mocking out the gapic client
 * is common for testing handwritten layer behaviour because it is a way to
 * evaluate data that reaches the handwritten layer thereby testing the
 * handwritten layer in isolation.
 */
export function getInitializedDatastoreClient(): Datastore {
  const clientName = 'DatastoreClient';
  const PROJECT_ID = 'project-id';
  const NAMESPACE = 'namespace';
  const options = {
    projectId: PROJECT_ID,
    namespace: NAMESPACE,
  };
  const datastore = new Datastore(options);
  // By default, datastore.clients_ is an empty map.
  // To mock out commit we need the map to contain the Gapic data client.
  // Normally a call to the data client through the datastore object would initialize it.
  // We don't want to make this call because it would make a grpc request.
  // So we just add the data client to the map.
  const gapic = Object.freeze({
    v1: require('../../src/v1'),
  });
  datastore.clients_.set(clientName, new gapic.v1[clientName](options));
  return datastore;
}
