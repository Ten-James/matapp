import connection from "./database";
import { Socket } from "socket.io";
import { writeLog, getLogsAsString } from "./logger";
import ProcessTables from "./tables";
import { io } from "../index";

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
				data: getLogsAsString(),
				database: [databaseData.size, databaseData.rows],
			});
		}
	);
};

const processConnection = (socket: Socket) => {
	ProcessTables(socket);
	socket.on("get_info", () => {
		writeLog(socket.handshake.address, "get_info");
		sendInfo(socket);
	});
};

export default processConnection;
