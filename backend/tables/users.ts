import connection from "../database";
import { Log } from "../logger";
import { User, LoginProps } from "../types";
import { MysqlError } from "mysql";
import md5 from "md5";

const processUsers = (socket) => {
	socket.on("get_users", () => {
		Log(socket.handshake.address, "get_users");
		connection.query(
			"SELECT u.id, u.name, u.access, b.name as 'branchName' FROM users u LEFT JOIN branches b on u.branch_id = b.id",
			(err, result) => {
				if (err) throw err;
				socket.emit(
					"users",
					result.map((x: any) => ({
						id: x.id,
						name: x.name,
						password: "******",
						access: x.access === 1 ? "Admin" : "User",
						branchName: x.branchName,
					}))
				);
			}
		);
	});

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
};

export default processUsers;
