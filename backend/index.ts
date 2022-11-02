import connection from "./database";
import * as express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { GetLog, Log } from "./logger";
import ProcessTables from "./tables";

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

	connection.query(
		`SELECT SUM(data_length + index_length) / 1024 / 1024 AS \"size\", SUM(TABLE_ROWS) AS \"rows\"
	FROM information_schema.TABLES 
	WHERE table_schema = "matapp" 
	GROUP BY table_schema;
	`,
		(err, result) => {
			if (err) throw err;
			const databaseData = result[0];
			socket.emit("info", {
				uptime: uptime,
				clients: io.engine.clientsCount,
				memory: Math.floor(process.memoryUsage().heapTotal / 1024 / 1024) + "MB",
				time: new Date().toLocaleTimeString(),
				data: GetLog(),
				database: [databaseData.size, databaseData.rows],
			});
		}
	);
};

io.on("connection", (socket: Socket) => {
	ProcessTables(socket);
	socket.on("get_info", () => {
		sendInfo(socket);
	});
});

httpServer.listen(2238, () => {});
