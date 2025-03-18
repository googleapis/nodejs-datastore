import {entity, PropertyTransform} from '../../entity';
import {google} from '../../../protos/protos';
import IValue = google.datastore.v1.IValue;
import ServerValue = google.datastore.v1.PropertyTransform.ServerValue;

export function buildPropertyTransforms(transforms: PropertyTransform[]) {
  const propertyTransforms: google.datastore.v1.IPropertyTransform[] = [];
  transforms.forEach((transform: PropertyTransform) => {
    if (transform.setToServerValue) {
      propertyTransforms?.push({
        property: transform.property,
        setToServerValue: ServerValue.REQUEST_TIME,
      });
    }
    if (transform.increment) {
      propertyTransforms?.push({
        property: transform.property,
        increment: entity.encodeValue(
          transform.increment,
          transform.property
        ) as IValue,
      });
    }
    if (transform.maximum) {
      propertyTransforms?.push({
        property: transform.property,
        maximum: entity.encodeValue(
          transform.maximum,
          transform.property
        ) as IValue,
      });
    }
    if (transform.increment) {
      propertyTransforms?.push({
        property: transform.property,
        increment: entity.encodeValue(
          transform.maximum,
          transform.property
        ) as IValue,
      });
    }
  });
  return propertyTransforms;
}
