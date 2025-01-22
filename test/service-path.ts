// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {describe, it} from 'mocha';
import * as assert from 'assert';
import {ServiceError} from 'google-gax';
import {Datastore} from '../src';
import {DatastoreClient, DatastoreAdminClient} from '../src/v1';

describe.only('Service Path', () => {
  it('Setting universe domain should set the service path', async () => {
    // Set the environment variable
    process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN = 'otherDomain';

    const universeDomain = 'someUniverseDomain'; // or your universe domain if not using emulator
    const options = {
      universeDomain,
    };
    const datastore = new Datastore(options);
    // Need to mock getProjectId_ since it normally uses auth and auth isn't
    // available in unit tests.
    (datastore.auth.getProjectId as any) = (
      callback: (err?: Error | null, projectId?: string | null) => void
    ) => {
      callback(null, 'projectId');
    };
    try {
      // This is necessary to initialize the datastore admin client.
      await datastore.getIndexes({gaxOptions: {timeout: 1000}});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        'Total timeout of API google.datastore.admin.v1.DatastoreAdmin exceeded 1000 milliseconds retrying error Error: 14 UNAVAILABLE: Name resolution failed for target dns:datastore.someUniverseDomain:443  before any response was received.'
      );
    } finally {
      assert.strictEqual(
        (
          datastore.clients_.get(
            'DatastoreAdminClient'
          ) as unknown as DatastoreAdminClient
        )['_opts'].servicePath,
        `datastore.${universeDomain}`
      );
    }
    try {
      // This will fail in unit tests, but is necessary to initialize the
      // datastore client.
      await datastore.save([], {timeout: 1000});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        '14 UNAVAILABLE: Name resolution failed for target dns:datastore.someUniverseDomain:443'
      );
    } finally {
      assert.strictEqual(
        (
          datastore.clients_.get(
            'DatastoreClient'
          ) as unknown as DatastoreClient
        )['_opts'].servicePath,
        `datastore.${universeDomain}`
      );
    }

    // Clean up the environment variable after the test
    delete process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN;
  });
  it('Setting universe domain and custom endpoint should set the service path to custom endpoint', async () => {
    // Set the environment variable
    process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN = 'otherDomain';

    const universeDomain = 'someUniverseDomain'; // or your universe domain if not using emulator
    const apiEndpoint = 'someApiEndpoint';
    const options = {
      universeDomain,
      apiEndpoint,
    };
    const datastore = new Datastore(options);
    // Need to mock getProjectId_ since it normally uses auth and auth isn't
    // available in unit tests.
    (datastore.auth.getProjectId as any) = (
      callback: (err?: Error | null, projectId?: string | null) => void
    ) => {
      callback(null, 'projectId');
    };
    try {
      // This is necessary to initialize the bigtable instance admin client.
      await datastore.getIndexes({gaxOptions: {timeout: 1000}});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        'Total timeout of API google.datastore.admin.v1.DatastoreAdmin exceeded 1000 milliseconds retrying error Error: 14 UNAVAILABLE: Name resolution failed for target dns:someApiEndpoint:443  before any response was received.'
      );
    } finally {
      assert.strictEqual(
        (
          datastore.clients_.get(
            'DatastoreAdminClient'
          ) as unknown as DatastoreAdminClient
        )['_opts'].servicePath,
        'someApiEndpoint'
      );
    }
    try {
      // This will fail in unit tests, but is necessary to initialize the
      // datastore client.
      await datastore.save([], {timeout: 1000});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        '14 UNAVAILABLE: Name resolution failed for target dns:someApiEndpoint:443'
      );
    } finally {
      assert.strictEqual(
        (
          datastore.clients_.get(
            'DatastoreClient'
          ) as unknown as DatastoreClient
        )['_opts'].servicePath,
        'someApiEndpoint'
      );
    }

    // Clean up the environment variable after the test
    delete process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN;
  });
  it('Setting GOOGLE_CLOUD_UNIVERSE_DOMAIN should set the service path', async () => {
    const universeDomain = 'someUniverseDomain'; // or your universe domain if not using emulator

    // Set the environment variable
    process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN = universeDomain;
    const datastore = new Datastore(); // No options needed, it will pick up the env var

    // Need to mock getProjectId_ since it normally uses auth and auth isn't
    // available in unit tests.
    (datastore.auth.getProjectId as any) = (
      callback: (err?: Error | null, projectId?: string | null) => void
    ) => {
      callback(null, 'projectId');
    };
    try {
      // This is necessary to initialize the bigtable instance admin client.
      console.log('getIndexes');
      await datastore.getIndexes({gaxOptions: {timeout: 1000}});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        'Total timeout of API google.datastore.admin.v1.DatastoreAdmin exceeded 1000 milliseconds retrying error Error: 14 UNAVAILABLE: Name resolution failed for target dns:datastore.someUniverseDomain:443  before any response was received.'
      );
    } finally {
      assert.strictEqual(
        (
          datastore.clients_.get(
            'DatastoreAdminClient'
          ) as unknown as DatastoreAdminClient
        )['_opts'].servicePath,
        `datastore.${universeDomain}`
      );
    }
    try {
      // This will fail in unit tests, but is necessary to initialize the
      // datastore client.
      await datastore.save([], {timeout: 1000});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        '14 UNAVAILABLE: Name resolution failed for target dns:datastore.someUniverseDomain:443'
      );
    } finally {
      assert.strictEqual(
        (
          datastore.clients_.get(
            'DatastoreClient'
          ) as unknown as DatastoreClient
        )['_opts'].servicePath,
        `datastore.${universeDomain}`
      );
    }

    // Clean up the environment variable after the test
    delete process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN;
  });
});
