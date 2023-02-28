import * as mysql from 'mysql';
import * as fs from 'fs';

const processOne = async (connection: mysql.Connection) => {
  const data = fs
    .readFileSync('version/1.sql', 'utf8')
    .split(';')
    .filter((x) => x.trim() !== '');
  console.log('Processing migration 1');
  await Promise.all(
    data.map(
      (query) =>
        new Promise((resolve, reject) => {
          connection.query(query, (err: mysql.MysqlError) => {
            if (err) reject(err);
            else resolve(0);
          });
        }),
    ),
  );
};

const ProcessMigrations = async (connection: mysql.Connection, currentVersion: number) => {
  if (currentVersion === 0) {
    await processOne(connection);
    currentVersion++;
  }

  connection.query(`UPDATE database_version SET version = ${currentVersion}`, (err: mysql.MysqlError) => {
    if (err) throw err;
  });
};

export default ProcessMigrations;
