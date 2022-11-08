import connection from "../database";
import { Log } from "../logger";

//TODO add types

const processBranches = (socket) => {
	socket.on("get_branches", () => {
		Log(socket.handshake.address, "get_branches");
		connection.query("SELECT * FROM branches", (err, result) => {
			if (err) throw err;
			socket.emit("branches", result);
		});
	});

	socket.on("get_branches_storage", () => {
		Log(socket.handshake.address, "get_branches_storage");
		connection.query("SELECT * FROM branches", (err, result) => {
			if (err) throw err;
			let tmp = [];
			result.forEach((x) => {
				connection.query(
					`SELECT i.id, i.name, t.name as 'category', bi.count FROM branch$ingredients bi LEFT JOIN ingredients i on bi.ingredient_id = i.id LEFT JOIN ingredient_types t ON i.ingredient_type_id = t.id WHERE branch_id = ${x.id}`,
					(err2, result2) => {
						if (err2) throw err2;
						tmp = tmp.concat([{ id: x.id, name: x.name, location: x.location, data: [...result2] }]);
						socket.emit("branches_storage", tmp);
					}
				);
			});
		});
	});
};

export default processBranches;