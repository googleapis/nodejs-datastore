import {Entity, entity} from '../entity';

/*
Entity data passed into save in non array form will be of type SaveNonArrayData
and does not require name and value properties.
 */
type SaveNonArrayData = Entity;

/*
Entity data passed into save in an array form will be of type SaveArrayData
so will have name and value defined because they are needed in these places:
https://github.com/googleapis/nodejs-datastore/blob/bf3dafd8267c447a52f7764505042a60b1a9fd28/src/index.ts#L1152
https://github.com/googleapis/nodejs-datastore/blob/bf3dafd8267c447a52f7764505042a60b1a9fd28/src/index.ts#L1134
 */
interface SaveArrayData {
  name: string;
  value: Entity;
  excludeFromIndexes?: boolean;
}

/*
When saving an entity, data in the data property of the entity is of type
SaveDataValue. The data can either be in array form in which case it will
match the SaveArrayData[] data type or it can be in non-array form where
it will match the SaveNonArrayData data type.
 */
export type SaveDataValue = SaveArrayData[] | SaveNonArrayData;

/*
An Entity passed into save will include a Key object contained either inside
a `key` property or inside a property indexed by the Key Symbol. If it is
the former then it will be of type SaveEntityWithoutKeySymbol.
 */
interface SaveEntityWithoutKeySymbol {
  key: entity.Key;
  data: SaveDataValue;
  excludeFromIndexes?: string[];
}

/*
An Entity passed into save will include a Key object contained either inside
a `key` property or inside a property indexed by the Key Symbol. If it is
the latter then it will be of type SaveEntityWithKeySymbol.
 */
interface SaveEntityWithKeySymbol {
  [entity.KEY_SYMBOL]: entity.Key;
  data: SaveDataValue;
}

/*
Entities passed into the first argument of the save function are expected to be
of type SaveEntity[] after being turned into an array. We could change the
signature of save later to enforce this, but doing so would be a breaking change
so we just cast this value to SaveEntity[] for now to enable strong type
enforcement throughout this function.
 */
export type SaveEntity = SaveEntityWithoutKeySymbol | SaveEntityWithKeySymbol;
