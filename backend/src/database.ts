import * as mysql from 'mysql';
import { MysqlError } from 'mysql';
require('dotenv').config();
const util = require('util');

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
});

export const query = util.promisify(connection.query).bind(connection);

export default connection;
