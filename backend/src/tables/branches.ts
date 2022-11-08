import { MysqlError } from "mysql";
import connection from "../database";
import { writeLog } from "../logger";
import { TypeBranch, TypeBranchStorageItem } from "../types";

const processBranches = (socket) => {
  socket.on("get_branches", () => {
    writeLog(socket.handshake.address, "get_branches");
    connection.query(
      "SELECT * FROM branches",
      (err: MysqlError, result: TypeBranch[]) => {
        if (err) throw err;
        socket.emit("branches", result);
      }
    );
  });

  socket.on("get_branches_storage", () => {
    writeLog(socket.handshake.address, "get_branches_storage");
    connection.query(
      "SELECT * FROM branches",
      (err: MysqlError, result: TypeBranch[]) => {
        if (err) throw err;
        let tmp = [];
        result.forEach((x) => {
          connection.query(
            `SELECT i.id, i.name, t.name as 'category', bi.count FROM branch$ingredients bi LEFT JOIN ingredients i on bi.ingredient_id = i.id LEFT JOIN ingredient_types t ON i.ingredient_type_id = t.id WHERE branch_id = ${x.id}`,
            (err2: MysqlError, result2: TypeBranchStorageItem) => {
              if (err2) throw err2;
              tmp = tmp.concat([
                {
                  id: x.id,
                  name: x.name,
                  location: x.location,
                  //@ts-ignore TODO fix this
                  data: [...result2],
                },
              ]);
              socket.emit("branches_storage", tmp);
            }
          );
        });
      }
    );
  });
};

export default processBranches;
