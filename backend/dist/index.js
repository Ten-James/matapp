"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express = require("express");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const md5 = require("md5");
const logger_1 = require("./logger");
const app = express();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const sendInfo = (socket) => {
    // send server uptime, io connected clients
    // memory usage and current time
    let sec = process.uptime();
    const days = Math.floor(sec / (3600 * 24));
    sec -= days * 3600 * 24;
    const hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    const min = Math.floor(sec / 60);
    sec -= min * 60;
    const uptime = `${days} days, ${hrs} hours, ${min} minutes, ${Math.floor(sec)} seconds`;
    socket.emit("info", {
        uptime: uptime,
        clients: io.engine.clientsCount,
        memory: Math.floor(process.memoryUsage().heapTotal / 1024 / 1024) + "MB",
        time: new Date().toLocaleTimeString(),
        data: (0, logger_1.GetLog)(),
    });
};
io.on("connection", (socket) => {
    socket.on("login", ({ name, pass }) => {
        (0, logger_1.Log)(socket.handshake.address, "login attempt");
        database_1.default.query(`SELECT name, id, branch_id, access FROM users WHERE name = '${name}' AND password = '${md5(pass)}'`, (err, result) => {
            if (err)
                throw err;
            if (result.length === 0) {
                socket.emit("login", { status: false });
                return;
            }
            socket.emit("login", { status: true, user: result[0] });
        });
    });
    socket.on("get_branches", () => {
        (0, logger_1.Log)(socket.handshake.address, "get_branches");
        database_1.default.query("SELECT * FROM branches", (err, result) => {
            if (err)
                throw err;
            socket.emit("branches", result);
        });
    });
    socket.on("get_ingredients", () => {
        (0, logger_1.Log)(socket.handshake.address, "get_ingredients");
        database_1.default.query("SELECT i.id, i.name, t.name as 'Category' FROM ingredients i LEFT JOIN ingredients_types t ON i.ingredient_type_id = t.id", (err, result) => {
            if (err)
                throw err;
            socket.emit("ingredients", result);
        });
    });
    socket.on("sql", ({ sql }) => {
        (0, logger_1.Log)(socket.handshake.address, sql);
        database_1.default.query(sql, (err, result) => {
            if (err)
                (0, logger_1.Log)(socket.handshake.address, `${err}`);
            else
                (0, logger_1.Log)(socket.handshake.address, JSON.stringify(result));
            sendInfo(socket);
        });
    });
    socket.on("get_info", () => {
        sendInfo(socket);
    });
});
httpServer.listen(2238, () => { });
