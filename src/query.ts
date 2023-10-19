import {Query as QueryImpl} from './impl/query';
import {Datastore, Transaction} from './index';

class Query extends QueryImpl {
  constructor(scope?: Datastore | Transaction, kinds?: string[] | null);
  constructor(
    scope?: Datastore | Transaction,
    namespace?: string | null,
    kinds?: string[]
  );
  constructor(
    scope?: Datastore | Transaction,
    namespaceOrKinds?: string | string[] | null,
    kinds?: string[]
  ) {
    super(scope, namespaceOrKinds, kinds);
  }
}
