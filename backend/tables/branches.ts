import connection from "../database";
import { Log } from "../logger";

const processBranches = (socket) => {
	socket.on("get_branches", () => {
		Log(socket.handshake.address, "get_branches");
		connection.query("SELECT * FROM branches", (err, result) => {
			if (err) throw err;
			socket.emit("branches", result);
		});
	});
};

export default processBranches;
