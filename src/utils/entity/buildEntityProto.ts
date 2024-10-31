import {entity, Entity, EntityProto, ValueProto} from '../../entity';
import {EntityProtoReduceAccumulator, EntityProtoReduceData} from '../../index';
import addExcludeFromIndexes = entity.addExcludeFromIndexes;

/**
 * This function builds the entity proto from the entity object. We cannot
 * rely on entity.entityToEntityProto for this because this function is only
 * designed to be used for non-array entities.
 *
 */
export function buildEntityProto(entityObject: Entity) {
  let entityProto: EntityProto = {};
  if (Array.isArray(entityObject.data)) {
    // This code builds the right entityProto from the entityObject
    entityProto.properties = entityObject.data.reduce(
      (acc: EntityProtoReduceAccumulator, data: EntityProtoReduceData) => {
        const value = entity.encodeValue(data.value, data.name.toString());

        if (typeof data.excludeFromIndexes === 'boolean') {
          const excluded = data.excludeFromIndexes;
          let values = value.arrayValue && value.arrayValue.values;

          if (values) {
            values = values.map((x: ValueProto) => {
              x.excludeFromIndexes = excluded;
              return x;
            });
          } else {
            value.excludeFromIndexes = data.excludeFromIndexes;
          }
        }

        acc[data.name] = value;

        return acc;
      },
      {}
    );
    // This code adds excludeFromIndexes in the right places
    addExcludeFromIndexes(entityObject.excludeFromIndexes, entityProto);
  } else {
    // This code builds the right entityProto from the entityObject
    entityProto = entity.entityToEntityProto(entityObject);
  }
  return entityProto;
}
