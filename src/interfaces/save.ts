import {entity} from '../entity';
import {google} from '../../protos/protos';

interface SaveEntityWithKeySymbol {
  [entity.KEY_SYMBOL]: entity.Key;
  data: SaveArrayData[] | SaveNonArrayData;
}

type SaveNonArrayData = google.datastore.v1.IEntity;

interface SaveArrayData {
  name: string;
  value: google.datastore.v1.IValue;
  excludeFromIndexes: boolean;
}

interface SaveEntityWithoutKeySymbol {
  key: entity.Key;
  data: SaveArrayData[] | SaveNonArrayData;
}

export type SaveEntity = SaveEntityWithoutKeySymbol | SaveEntityWithKeySymbol;

type SaveEntities = SaveEntity | SaveEntity[];
