import * as QueryImplModule from './impl/query';
import {Datastore, Transaction} from './index';

class Query extends QueryImplModule.Query {
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

export {Operator} from './impl/query';
export {OrderOptions} from './impl/query';
export {Order} from './impl/query';
export {Filter} from './impl/query';
export {QueryProto} from './impl/query';
export {Query};
export {IntegerTypeCastOptions} from './impl/query';
export {RunQueryOptions} from './impl/query';
export {RunQueryCallback} from './impl/query';
export {RunQueryResponse} from './impl/query';
export {RunAggregateQueryResponse} from './impl/query';
export {RunQueryInfo} from './impl/query';
