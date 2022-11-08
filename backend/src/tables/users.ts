import connection from "../database";
import { writeLog } from "../logger";
import { TypeUser, TypeLoginProps } from "../types";
import { MysqlError } from "mysql";
import md5 from "md5";
import { Socket } from "socket.io";

const processUsers = (socket: Socket) => {
	socket.on("get_users", () => {
		writeLog(socket.handshake.address, "get_users");
		connection.query(
			"SELECT u.id, u.name, u.access, b.name as 'branchName' FROM users u LEFT JOIN branches b on u.branch_id = b.id",
			(err: MysqlError, result: TypeUser[]) => {
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

	socket.on("login", ({ name, pass }: TypeLoginProps): void => {
		writeLog(socket.handshake.address, "login attempt");
		connection.query(
			`SELECT name, id, branchId, access FROM users WHERE name = '${name}' AND password = '${md5(pass)}'`,
			(err: MysqlError, result: TypeUser[]): void => {
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
