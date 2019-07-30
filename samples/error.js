/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @see [Cloud Datastore Concepts errors] {@link https://cloud.google.com/datastore/docs/concepts/errors}
 * for more information on errors
 */	

'use strict';	

const {Datastore} = require('@google-cloud/datastore');	

// [START error]	
function runQuery() {	
  // Creates a client	
  const datastore = new Datastore();	

  const query = datastore.createQuery(['Company']).start('badrequest');	

  return datastore	
    .runQuery(query)	
    .then(results => {	
      const entities = results[0];	
      console.log('Entities:');	
      entities.forEach(entity => console.log(entity));	
      return entities;	
    })	
    .catch(err => {
      console.log(err.code); //400
      console.log(err.message); //"Key path is incomplete: [Person: null]"
      console.log(err.status); //"INVALID_ARGUMENT"
      /**
      *  @see [For more information on error codes refer] https://cloud.google.com/datastore/docs/concepts/errors#error_codes
      */ 

      // Process error

      // For example, treat permission error like no entities were found	
      // eslint-disable-next-line no-constant-condition
      if (/* some condition */ false) {	
        return [];	
      }  
         
      //Forward the error to caller
      return Promise.reject(err);
    });	
}	
// [END error]	

exports.runQuery = runQuery;	

if (module === require.main) {	
  exports.runQuery();	
}	
