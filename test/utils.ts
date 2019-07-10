import * as assert from 'assert';
import * as extend from 'extend';
import {Datastore} from '../src';
import {entity} from '../src/entity';
import {URLSafeKey as URlSafeKey} from '../src/utils';

describe('utils', () => {
  describe('UrlSafeKey', () => {
    const urlSafeKey = new URlSafeKey();
    const PROJECT_ID = 'grass-clump-479';
    const LOCATION_PREFIX = 's~';

    describe('convertToBase64_', () => {
      it('should convert buffer to base64 and cleanup', () => {
        const buffer = Buffer.from('Hello World');

        assert.strictEqual(
          urlSafeKey.convertToBase64_(buffer),
          'SGVsbG8gV29ybGQ'
        );
      });
    });

    describe('convertToBuffer_', () => {
      it('should convert encoded url safe key to buffer', () => {
        assert.deepStrictEqual(
          urlSafeKey.convertToBuffer_('aGVsbG8gd29ybGQgZnJvbSBkYXRhc3RvcmU'),
          Buffer.from('hello world from datastore')
        );
      });
    });

    describe('legacyEncode', () => {
      it('should encode with namespace', () => {
        const kind = 'Task';
        const name = 'sampletask1';
        const key = new entity.Key({
          namespace: 'NS',
          path: [kind, name],
        });

        const encodedKey =
          'ahFzfmdyYXNzLWNsdW1wLTQ3OXIVCxIEVGFzayILc2FtcGxldGFzazEMogECTlM';
        assert.strictEqual(
          urlSafeKey.legacyEncode(PROJECT_ID, key, LOCATION_PREFIX),
          encodedKey
        );
      });

      it('should encode key with single path element string string type', () => {
        const kind = 'Task';
        const name = 'sampletask1';
        const key = new entity.Key({
          path: [kind, name],
        });

        const encodedKey =
          'ag9ncmFzcy1jbHVtcC00NzlyFQsSBFRhc2siC3NhbXBsZXRhc2sxDA';
        assert.strictEqual(
          urlSafeKey.legacyEncode(PROJECT_ID, key),
          encodedKey
        );
      });

      it('should encode key with single path element long int type', () => {
        const kind = 'Task';
        const id = 5754248394440704;
        const key = new entity.Key({
          path: [kind, id],
        });

        const encodedKey = 'ag9ncmFzcy1jbHVtcC00NzlyEQsSBFRhc2sYgICA3NWunAoM';
        assert.strictEqual(
          urlSafeKey.legacyEncode(PROJECT_ID, key),
          encodedKey
        );
      });

      it('should encode key with parent', () => {
        const key = new entity.Key({
          path: ['Task', 'sampletask1', 'Task', 'sampletask2'],
        });

        const encodedKey =
          'ahFzfmdyYXNzLWNsdW1wLTQ3OXIqCxIEVGFzayILc2FtcGxldGFzazEMCxIEVGFzayILc2FtcGxldGFzazIM';
        assert.strictEqual(
          urlSafeKey.legacyEncode(PROJECT_ID, key, LOCATION_PREFIX),
          encodedKey
        );
      });
    });

    describe('legacyDecode', () => {
      it('should decode key with namespace', () => {
        const encodedKey =
          'ahFzfmdyYXNzLWNsdW1wLTQ3OXIVCxIEVGFzayILc2FtcGxldGFzazEMogECTlM';
        const key = urlSafeKey.legacyDecode(encodedKey);
        assert.strictEqual(key.namespace, 'NS');
        assert.deepStrictEqual(key.path, ['Task', 'sampletask1']);
      });

      it('should decode key with single path element string type', () => {
        const encodedKey =
          'ag9ncmFzcy1jbHVtcC00NzlyFQsSBFRhc2siC3NhbXBsZXRhc2sxDA';
        const key = urlSafeKey.legacyDecode(encodedKey);
        assert.strictEqual(key.namespace, undefined);
        assert.deepStrictEqual(key.path, ['Task', 'sampletask1']);
      });

      it('should decode key with single path element long int type', () => {
        const encodedKey =
          'ahFzfmdyYXNzLWNsdW1wLTQ3OXIRCxIEVGFzaxiAgIDc1a6cCgw';
        const key = urlSafeKey.legacyDecode(encodedKey);
        assert.strictEqual(key.namespace, undefined);
        assert.deepStrictEqual(key.path, ['Task', '5754248394440704']);
      });

      it('should decode key with parent path', () => {
        const encodedKey =
          'ahFzfmdyYXNzLWNsdW1wLTQ3OXIqCxIEVGFzayILc2FtcGxldGFzazEMCxIEVGFzayILc2FtcGxldGFzazIM';
        const key = urlSafeKey.legacyDecode(encodedKey);
        assert.strictEqual(key.namespace, undefined);
        assert.deepStrictEqual(key.path, [
          'Task',
          'sampletask1',
          'Task',
          'sampletask2',
        ]);
        assert.strictEqual(key.parent!.name, 'sampletask1');
        assert.deepStrictEqual(key.parent!.path, ['Task', 'sampletask1']);
      });
    });
  });
});
