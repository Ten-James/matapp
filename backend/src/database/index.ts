import * as mysql from 'mysql';
import { MysqlError } from 'mysql';
import { checkForDatabaseVersion } from './checkForDatabaseVersion';
require('dotenv').config();
const util = require('util');

var testConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '2238'),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});
testConnection.connect((err: MysqlError) => {
  if (err) throw err;
});

testConnection.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME, (err: MysqlError) => {
  if (err) throw err;
});

// if (!mysql) throw "mysql module not found";
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '2238'),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// if (!connection) throw "connection not found";
connection.connect((err: MysqlError) => {
  if (err) throw err;
  checkForDatabaseVersion(connection).then((result) => {
    if (!result) {
      console.error('Database version mismatch');
      process.exit(1);
    }
  });
});

export const query = util.promisify(connection.query).bind(connection);

export default connection;
