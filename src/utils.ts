import * as Protobuf from 'protobufjs';
import * as is from 'is';
import * as path from 'path';
import {PathType} from '.';
import {entity} from './entity';
import * as appengine from '../proto/app_engine_key';

/**
 * URL safe key encoding and decoding helper utility.
 *
 *  This is intended to work with the "legacy" representation of a
 * datastore "Key" used within Google App Engine (a so-called "Reference").
 *
 * @private
 * @class
 */
export class URLSafeKey {
  // tslint:disable-next-line no-any
  protos: any;

  constructor() {
    this.protos = this.loadProtos_();
  }

  /**
   *  Load AppEngine protobuf file.
   *
   *  @private
   */
  loadProtos_() {
    const root = new Protobuf.Root();
    const loadedRoot = root.loadSync(
      path.join(__dirname, '..', 'protos', 'app_engine_key.proto')
    );
    loadedRoot.resolveAll();
    return loadedRoot.nested;
  }

  /**
   * Convert key to url safe base64 encoded string.
   *
   * @private
   * @param {string} projectId Project Id.
   * @param {entity.Key} key Entity key object.
   * @param {string} locationPrefix Optional .
   *  The location prefix of an App Engine project ID.
   *  Often this value is 's~', but may also be 'e~', or other location prefixes
   *  currently unknown.
   * @returns {string} base64 endocded urlsafe key.
   */

  legacyEncode(
    projectId: string,
    key: entity.Key,
    locationPrefix?: string
  ): string {
    const elements: appengine.Path.IElement[] = [];
    let currentKey = key;

    do {
      // tslint:disable-next-line no-any
      const element: any = {
        type: currentKey.kind,
      };

      if (is.defined(currentKey.id)) {
        element.id = currentKey.id;
      }

      if (is.defined(currentKey.name)) {
        element.name = currentKey.name;
      }

      elements.unshift(element);
      currentKey = currentKey.parent!;
    } while (currentKey);

    if (locationPrefix) {
      projectId = `${locationPrefix}${projectId}`;
    }

    const reference: appengine.IReference = {
      app: projectId,
      namespace: key.namespace,
      path: {element: elements},
    };

    const buffer = this.protos.Reference.encode(reference).finish();
    return this.convertToBase64_(buffer);
  }

  /**
   * Helper to convert URL safe key string to entity key object
   *
   * This is intended to work with the "legacy" representation of a
   * datastore "Key" used within Google App Engine (a so-called "Reference").
   *
   * @private
   * @param {entity.Key} key Entity key object.
   * @param {string} locationPrefix Optional .
   *  The location prefix of an App Engine project ID.
   *  Often this value is 's~', but may also be 'e~', or other location prefixes
   *  currently unknown.
   * @returns {string} Created urlsafe key.
   */

  legacyDecode(key: string): entity.Key {
    const buffer = this.convertToBuffer_(key);
    const message = this.protos.Reference.decode(buffer);
    const reference = this.protos.Reference.toObject(message, {longs: String});
    const pathElements: PathType[] = [];

    reference.path.element.forEach((element: appengine.Path.Element) => {
      pathElements.push(element.type);

      if (is.defined(element.name)) {
        pathElements.push(element.name);
      } else if (is.defined(element.id)) {
        pathElements.push(new entity.Int(element.id as number));
      }
    });

    const keyOptions: entity.KeyOptions = {
      path: pathElements,
    };

    if (!is.empty(reference.namespace)) {
      keyOptions.namespace = reference.namespace;
    }

    return new entity.Key(keyOptions);
  }

  /**
   * Convert buffer to base64 encoding.
   *
   * @private
   * @param {Buffer} buffer
   * @returns {string} Base64 encoded string.
   */
  convertToBase64_(buffer: Buffer): string {
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  /**
   * Rebuild base64 from encoded url safe string and convert to buffer.
   *
   * @private
   * @param {string} val Encoded url safe string.
   * @returns {string} Base64 encoded string.
   */
  convertToBuffer_(val: string): Buffer {
    val = val.replace(/-/g, '+').replace(/_/g, '/');
    while (val.length % 4) {
      val += '=';
    }

    return Buffer.from(val, 'base64');
  }
}
