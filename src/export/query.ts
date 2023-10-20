import * as QueryImplModule from '../query';
import {Datastore, Transaction} from '../index';

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

export {Operator} from '../query';
export {OrderOptions} from '../query';
export {Order} from '../query';
export {Filter} from '../query';
export {QueryProto} from '../query';
export {Query};
export {IntegerTypeCastOptions} from '../query';
export {RunQueryOptions} from '../query';
export {RunQueryCallback} from '../query';
export {RunQueryResponse} from '../query';
export {RunAggregateQueryResponse} from '../query';
export {RunQueryInfo} from '../query';
