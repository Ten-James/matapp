import * as mysql from 'mysql';
import * as fs from 'fs';

const process = async (connection: mysql.Connection, name: string) => {
  const data = fs
    .readFileSync(`version/${name}.sql`, 'utf8')
    .split(';')
    .filter((x) => x.trim() !== '');
  console.log(`Processing migration: ${name}`);
  await Promise.all(
    data.map(
      (query) =>
        new Promise((resolve, reject) => {
          console.log(
            query
              .trim()
              .replaceAll('\n', '')
              .split(' ')
              .filter((x) => x !== '')
              .slice(0, 3)
              .join(' ')
              .replaceAll('`', ''),
          );
          connection.query(query, (err: mysql.MysqlError) => {
            if (err) reject(err);
            else resolve(0);
          });
        }),
    ),
  );
};

export const DATABASE_VERSION = 3;

const ProcessMigrations = async (connection: mysql.Connection, currentVersion: number) => {
  while (currentVersion < DATABASE_VERSION) {
    currentVersion++;
    await process(connection, currentVersion.toString());
  }

  connection.query(`UPDATE database_version SET version = ${currentVersion}`, (err: mysql.MysqlError) => {
    if (err) throw err;
  });
};

export default ProcessMigrations;
