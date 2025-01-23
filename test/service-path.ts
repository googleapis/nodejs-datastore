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
import {DatastoreClient, DatastoreAdminClient} from '../src/v1';
import {getInitializedDatastoreClient} from './gapic-mocks/get-initialized-datastore-client';

describe('Service Path', () => {
  it('Setting universe domain should set the service path', async () => {
    // Set the environment variable
    process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN = 'otherDomain';

    const universeDomain = 'someUniverseDomain'; // or your universe domain if not using emulator
    const options = {
      universeDomain,
    };
    const datastore = getInitializedDatastoreClient(options);
    assert.strictEqual(
      (
        datastore.clients_.get(
          'DatastoreAdminClient'
        ) as unknown as DatastoreAdminClient
      )['_opts'].servicePath,
      `datastore.${universeDomain}`
    );
    assert.strictEqual(
      (datastore.clients_.get('DatastoreClient') as unknown as DatastoreClient)[
        '_opts'
      ].servicePath,
      `datastore.${universeDomain}`
    );

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
    const datastore = getInitializedDatastoreClient(options);
    assert.strictEqual(
      (
        datastore.clients_.get(
          'DatastoreAdminClient'
        ) as unknown as DatastoreAdminClient
      )['_opts'].servicePath,
      'someApiEndpoint'
    );
    assert.strictEqual(
      (datastore.clients_.get('DatastoreClient') as unknown as DatastoreClient)[
        '_opts'
      ].servicePath,
      'someApiEndpoint'
    );

    // Clean up the environment variable after the test
    delete process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN;
  });
  it('Setting GOOGLE_CLOUD_UNIVERSE_DOMAIN should set the service path', async () => {
    const universeDomain = 'someUniverseDomain'; // or your universe domain if not using emulator

    // Set the environment variable
    process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN = universeDomain;
    const datastore = getInitializedDatastoreClient(); // No options needed, it will pick up the env var

    assert.strictEqual(
      (
        datastore.clients_.get(
          'DatastoreAdminClient'
        ) as unknown as DatastoreAdminClient
      )['_opts'].servicePath,
      `datastore.${universeDomain}`
    );
    assert.strictEqual(
      (datastore.clients_.get('DatastoreClient') as unknown as DatastoreClient)[
        '_opts'
      ].servicePath,
      `datastore.${universeDomain}`
    );

    // Clean up the environment variable after the test
    delete process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN;
  });
});
