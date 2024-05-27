// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable */

'use strict';

const {assert} = require('chai');
const {describe, it} = require('mocha');

const cp = require('child_process');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

describe('Query Profiling', () => {
  require('./helpers/populate-data');

  it('should run query profiling for a query', async () => {
    assert.strictEqual(execSync(`node ./runQueryProfiling.js`), 'Entity found: Buy milk\nEntity found: Feed cats\ninfo: planSummary,executionStats\n');
  });

  it('should run query profiling for an aggregation query', async () => {
    assert.strictEqual(execSync(`node ./runQueryProfiling.js`), 'Entity found: Buy milk\nEntity found: Feed cats\n[planSummary,executionStats]\n');
  });
});
