const DESIRED_DB_NAME = "shortenx";

let resolvedDbNamePromise = null;

async function resolveShortenxDbName(client) {
  if (!resolvedDbNamePromise) {
    resolvedDbNamePromise = (async () => {
      const admin = client.db().admin();
      const dbs = await admin.listDatabases();
      const match = dbs.databases.find((db) => db.name.toLowerCase() === DESIRED_DB_NAME.toLowerCase());
      return match ? match.name : DESIRED_DB_NAME;
    })().catch((error) => {
      resolvedDbNamePromise = null;
      throw error;
    });
  }

  return resolvedDbNamePromise;
}

export async function getShortenxDb(client) {
  const dbName = await resolveShortenxDbName(client);
  return client.db(dbName);
}
