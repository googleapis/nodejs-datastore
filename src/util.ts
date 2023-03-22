export function getRequestWithDatabaseId(datastore: any, reqOpts: any) {
  if (datastore.options && datastore.options.databaseId) {
    reqOpts.databaseId = datastore.options.databaseId;
  }
}
