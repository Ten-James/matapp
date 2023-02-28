import type mysql from 'mysql';
import ProcessMigrations, { DATABASE_VERSION } from './migrations';
const util = require('util');

export const checkForDatabaseVersion = async (connection: mysql.Connection): Promise<Boolean> => {
  const query = util.promisify(connection.query).bind(connection);
  try {
    console.log('Checking database version');
    await query('CREATE TABLE IF NOT EXISTS database_version (version INT NOT NULL)');

    const version = await query('SELECT version FROM database_version');
    if (version.length === 0) {
      await query('INSERT INTO database_version (version) VALUES (0)');
      await ProcessMigrations(connection, 0);
    } else if (version[0]?.version !== DATABASE_VERSION) {
      console.error(`Database version is ${version[0].version}, but should be ${DATABASE_VERSION}`);

      await ProcessMigrations(connection, version[0].version);
    }

    console.log('Database version is correct');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
