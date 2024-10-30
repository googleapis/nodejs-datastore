import {entity, Entity} from '../../entity';

/**
 * This function extends the excludeFromIndexes list when it finds
 * large properties in the entity object. The extended excludeFromIndexes
 * list is then used when building the entity proto.
 */
// TODO: Add params
export function extendExcludeFromIndexes(entityObject: Entity) {
  if (entityObject.excludeLargeProperties) {
    if (Array.isArray(entityObject.data)) {
      // This code populates the excludeFromIndexes list with the right values.
      if (entityObject.excludeLargeProperties) {
        entityObject.data.forEach(
          (data: {
            name: {
              toString(): string;
            };
            value: Entity;
            excludeFromIndexes?: boolean;
          }) => {
            entityObject.excludeFromIndexes = entity.findLargeProperties_(
              data.value,
              data.name.toString(),
              entityObject.excludeFromIndexes
            );
          }
        );
      }
    } else {
      entityObject.excludeFromIndexes = entity.findLargeProperties_(
        entityObject.data,
        '',
        entityObject.excludeFromIndexes
      );
    }
  }
}
