import connection from "./database";
import * as express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
const md5 = require("md5");
import { GetLog, Log } from "./logger";
import { MysqlError } from "mysql";
const app: any = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const sendInfo = (socket: Socket) => {
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
    data: GetLog(),
  });
};

interface LoginProps {
  name: string;
  pass: string;
}

interface User {
  name: string;
  id: number;
  branchId: number;
  access: number;
}

io.on("connection", (socket: Socket) => {
  socket.on("login", ({ name, pass }: LoginProps): void => {
    Log(socket.handshake.address, "login attempt");
    connection.query(
      `SELECT name, id, branchId, access FROM users WHERE name = '${name}' AND password = '${md5(pass)}'`,
      (err: MysqlError, result: User[]): void => {
        if (err) throw err;
        if (result.length === 0) {
          socket.emit("login", { status: false });
          return;
        }
        socket.emit("login", { status: true, user: result[0] });
      }
    );
  });

  socket.on("get_branches", () => {
    Log(socket.handshake.address, "get_branches");
    connection.query("SELECT * FROM branches", (err, result) => {
      if (err) throw err;
      socket.emit("branches", result);
    });
  });

  socket.on("get_ingredients", () => {
    Log(socket.handshake.address, "get_ingredients");
    connection.query(
      "SELECT i.id, i.name, i.cost, t.name as 'category' FROM ingredients i LEFT JOIN ingredients_types t ON i.ingredient_type_id = t.id",
      (err, result) => {
        if (err) throw err;
        socket.emit("ingredients", result);
      }
    );
  });

  socket.on("sql", ({ sql }: { sql: string }) => {
    Log(socket.handshake.address, sql);
    connection.query(sql, (err, result) => {
      if (err) Log(socket.handshake.address, `${err}`);
      else Log(socket.handshake.address, JSON.stringify(result));
      sendInfo(socket);
    });
  });

  socket.on("get_info", () => {
    sendInfo(socket);
  });
});

httpServer.listen(2238, () => {});
