import connection from "./database.js";
import Express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import md5 from "md5";
import { fileURLToPath } from "url";
import { GetLog, Log } from "./logger.js";
import ProcessTables from "./tables/index.js";

const app = Express();
const httpServer = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const sendInfo = (socket) => {
  console.log("get_info");
  // send server uptime, io connected clients
  // memory usage and current time
  let sec = process.uptime();
  let days = Math.floor(sec / (3600 * 24));
  sec -= days * 3600 * 24;
  let hrs = Math.floor(sec / 3600);
  sec -= hrs * 3600;
  let min = Math.floor(sec / 60);
  sec -= min * 60;
  let uptime = `${days} days, ${hrs} hours, ${min} minutes, ${Math.floor(sec)} seconds`;
  socket.emit("info", {
    uptime: uptime,
    clients: io.engine.clientsCount,
    memory: Math.floor(process.memoryUsage().heapTotal / 1024 / 1024) + "MB",
    time: new Date().toLocaleTimeString(),
    data: GetLog(),
  });
};

io.on("connection", (socket) => {
  console.log(`new Socket ${socket.id}`);

  ProcessTables(socket);

  socket.on("login", ({ name, pass }) => {
    Log(socket.request.socket.remoteAddress, "login attempt");
    connection.query(
      `SELECT name, id, branch_id, access FROM users WHERE name = '${name}' AND password = '${md5(pass)}'`,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          socket.emit("login", { status: false });
          return;
        }
        if (result[0].access === 2) socket.access = "admin";
        socket.emit("login", { status: true, user: result[0] });
      }
    );
  });

  socket.on("get_branches", () => {
    Log(socket.request.socket.remoteAddress, "get_branches");
    connection.query("SELECT * FROM branches", (err, result) => {
      if (err) throw err;
      socket.emit("branches", result);
    });
  });

  socket.on("sql", ({ sql }) => {
    Log(socket.request.socket.remoteAddress, sql);
    if (socket.access === "admin") {
      connection.query(sql, (err, result) => {
        if (err) Log(socket.request.socket.remoteAddress, `${err}`);
        else Log(socket.request.socket.remoteAddress, JSON.stringify(result));
        sendInfo(socket);
      });
    } else {
      Log(socket.request.socket.remoteAddress, "unauthorized sql attempt");
    }
  });

  socket.on("get_info", () => {
    sendInfo(socket);
  });
});

httpServer.listen(2238, () => {
  console.log("listening on *:2238");
});
