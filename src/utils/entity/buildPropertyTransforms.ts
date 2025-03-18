import {entity, PropertyTransform} from '../../entity';
import {google} from '../../../protos/protos';
import IValue = google.datastore.v1.IValue;
import ServerValue = google.datastore.v1.PropertyTransform.ServerValue;

export function buildPropertyTransforms(transforms: PropertyTransform[]) {
  const propertyTransforms: google.datastore.v1.IPropertyTransform[] = [];
  transforms.forEach((transform: PropertyTransform) => {
    const property = transform.property;
    if (transform.setToServerValue) {
      propertyTransforms.push({
        property,
        setToServerValue: ServerValue.REQUEST_TIME,
      });
    }
    ['increment', 'maximum', 'minimum'].forEach(type => {
      const castedType = type as 'increment' | 'maximum' | 'minimum';
      if (transform[castedType]) {
        propertyTransforms.push({
          property,
          increment: entity.encodeValue(
            transform[castedType],
            property
          ) as IValue,
        });
      }
    });
    if (transform.appendMissingElements) {
      propertyTransforms.push({
        property,
        appendMissingElements: {
          values: transform.appendMissingElements.map(element => {
            return entity.encodeValue(element, property) as IValue;
          }),
        },
      });
    }
    if (transform.removeAllFromArray) {
      propertyTransforms.push({
        property,
        removeAllFromArray: {
          values: transform.removeAllFromArray.map(element => {
            return entity.encodeValue(element, property) as IValue;
          }),
        },
      });
    }
  });
  return propertyTransforms;
}
