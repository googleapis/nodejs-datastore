export function addDatabaseIdToRequest(datastore: any, reqOpts: any) {
  if (datastore.options && datastore.options.databaseId) {
    reqOpts.databaseId = datastore.options.databaseId;
  }
}
