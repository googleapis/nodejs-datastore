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
    if (transform.increment) {
      propertyTransforms.push({
        property,
        increment: entity.encodeValue(transform.increment, property) as IValue,
      });
    }
    if (transform.maximum) {
      propertyTransforms.push({
        property,
        maximum: entity.encodeValue(transform.maximum, property) as IValue,
      });
    }
    if (transform.minimum) {
      propertyTransforms.push({
        property,
        increment: entity.encodeValue(transform.minimum, property) as IValue,
      });
    }
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
