//connect to InnoDB database
// use env file to store database credentials
import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql";
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
export default connection;
