import {entity} from '../entity';
import {google} from '../../protos/protos';

type SaveNonArrayData = google.datastore.v1.IEntity;

interface SaveArrayData {
  name: string;
  value: google.datastore.v1.IValue;
  excludeFromIndexes: boolean;
}

export type SaveDataValue = SaveArrayData[] | SaveNonArrayData;

interface SaveEntityWithoutKeySymbol {
  key: entity.Key;
  data: SaveDataValue;
  excludeFromIndexes?: string[];
}

interface SaveEntityWithKeySymbol {
  [entity.KEY_SYMBOL]: entity.Key;
  data: SaveDataValue;
}

export type SaveEntity = SaveEntityWithoutKeySymbol | SaveEntityWithKeySymbol;
