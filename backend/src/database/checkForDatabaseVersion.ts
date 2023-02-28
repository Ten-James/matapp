import type mysql from 'mysql';
import ProcessMigrations from './migrations';
const util = require('util');
const DATABASE_VERSION = 1;

export const checkForDatabaseVersion = async (connection: mysql.Connection): Promise<Boolean> => {
  const query = util.promisify(connection.query).bind(connection);
  try {
    await query('CREATE TABLE IF NOT EXISTS database_version (version INT NOT NULL)');

    const version = await query('SELECT version FROM database_version');
    if (version.length === 0) {
      await query('INSERT INTO database_version (version) VALUES (0)');
      await ProcessMigrations(connection, 0);
    }
    if (version[0].version !== DATABASE_VERSION) {
      console.error(`Database version is ${version[0].version}, but should be ${DATABASE_VERSION}`);

      await ProcessMigrations(connection, version[0].version);
      return false;
    }

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
