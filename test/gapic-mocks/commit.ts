import {before, describe} from 'mocha';
import * as ds from '../../src';

describe('Commit', () => {
  let Datastore: typeof ds.Datastore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let datastore: any;

  const PROJECT_ID = 'project-id';
  const NAMESPACE = 'namespace';

  before(() => {
    const clientName = 'DatastoreClient';
    const options = {
      projectId: PROJECT_ID,
      namespace: NAMESPACE,
    };
    datastore = new Datastore(options);
    // By default, datastore.clients_ is an empty map.
    // To mock out commit we need the map to contain the Gapic data client.
    // Normally a call to the data client through the datastore object would initialize it.
    // We don't want to make this call because it would make a grpc request.
    // So we just add the data client to the map.
    const gapic = Object.freeze({
      v1: require('../src/v1'),
    });
    datastore.clients_.set(clientName, new gapic.v1[clientName](options));
    // Mock out commit and just have it pass back the information passed into it through the callback.
    // This way we can easily use assertion checks to see what reached the gapic layer.
  });
});