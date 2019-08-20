/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// sample-metadata
//  title: error sample
//  description: sample show how to handle and process error
//  usage: node error.js

const { Datastore } = require('@google-cloud/datastore');

// [START error]
function main() {
  // Creates a client
  const datastore = new Datastore();

  const query = datastore.createQuery(['Company']).start('badrequest');

  async function runQuery() {
    return await datastore
      .runQuery(query)
      .then(results => {
        const entities = results[0];
        console.log('Entities:');
        entities.forEach(entity => console.log(entity));
        return entities;
      })
      .catch(err => {
        // Get the error information
        const code = err.code;
        const message = err.message;
        /**
         *  @see [For more information on error codes refer] https://cloud.google.com/datastore/docs/concepts/errors#error_codes
         */

        // Process error

        // For example, return a custom message to user
        // based on the error code and or error message
        // eslint-disable-next-line no-constant-condition
        if (code === 4 && message === 'some message') {
          err.message = 'Oops, something went wrong';
        }

        //Forward the error to caller
        throw err;
      });
  }

  runQuery().catch(err => {
    console.log(err.code); // 3
    console.log(err.message); // "Error parsing protocol message"
  });
  // [END error]
}

main(...process.argv.slice(2));
