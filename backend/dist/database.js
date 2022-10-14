"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
require("dotenv").config();
// if (!mysql) throw "mysql module not found";
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "2238"),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
// if (!connection) throw "connection not found";
connection.connect((err) => {
    if (err)
        throw err;
});
exports.default = connection;
