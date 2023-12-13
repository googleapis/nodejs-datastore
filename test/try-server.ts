import {describe, it} from 'mocha';
import {Datastore} from '../src';

import {startServer} from '../mock-server/datastore-server';
import {QueryMode} from '../src/query';

describe.only('Try server', () => {
  it('should try to connect to the running server', done => {
    startServer(async () => {
      const datastore = new Datastore({
        namespace: `${Date.now()}`,
        apiEndpoint: 'localhost:50051',
      });
      const postKey = datastore.key(['Post', 'post1']);
      const query = datastore.createQuery('Post').hasAncestor(postKey);
      const allResults = await datastore.runQuery(query, {
        mode: QueryMode.EXPLAIN,
      });
      done();
    });
  });
});
