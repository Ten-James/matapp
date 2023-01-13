import type { MysqlError } from 'mysql';
import connection from '../database';
import { writeLog } from '../logger';
import type { IBranchStorageItem, IBranch, IBranchData, IIngredient, IDialogBranch } from '../types';
import { noResponseQuery, noResponseQueryCallback } from '../misc';

const processBranches = (socket) => {
  socket.on('get_branches', () => {
    writeLog(socket.handshake.address, 'get_branches');
    connection.query('SELECT * FROM branches', (err: MysqlError, result: IBranch[]) => {
      if (err) throw err;
      socket.emit('branches', result);
    });
  });

  socket.on('get_branches_storage', () => {
    writeLog(socket.handshake.address, 'get_branches_storage');
    connection.query('SELECT * FROM branches', (err: MysqlError, result: IBranch[]) => {
      if (err) throw err;
      let tmp: IBranchData<IIngredient>[] = [];
      result.forEach((x) => {
        // TODO: make this async and wait for it to finish
        connection.query(`SELECT i.id, i.name, t.name as 'category', bi.count FROM branch$ingredients bi LEFT JOIN ingredients i on bi.ingredient_id = i.id LEFT JOIN ingredient_types t ON i.ingredient_type_id = t.id WHERE branch_id = ${x.id}`, (err2: MysqlError, result2: IBranchStorageItem) => {
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
          socket.emit('branches_storage', tmp);
        });
      });
    });
  });

  const preset = 'branches';
  socket.on(`add_${preset}`, (data: IDialogBranch) => {
    writeLog(socket.handshake.address, `add_${preset} \n ${JSON.stringify(data)}`);
    try {
      connection.query(`INSERT INTO branches (name, location) VALUES ('${data.name}', '${data.location}')`, noResponseQuery);
      socket.emit('admin_status', 'was_added');
    } catch (err) {
      socket.emit('admin_status', 'not_added');
    }
  });

  socket.on(`edit_${preset}`, (data: IDialogBranch) => {
    writeLog(socket.handshake.address, `edit_${preset} \n ${JSON.stringify(data)}`);
    try {
      connection.query(`UPDATE branches SET name = '${data.name}', location = '${data.location}' WHERE id = ${data.id}`, noResponseQuery);
      socket.emit('admin_status', 'was_edited');
    } catch (error) {
      socket.emit('admin_status', 'not_edited');
    }
  });

  socket.on(`delete_${preset}`, (data: IDialogBranch) => {
    writeLog(socket.handshake.address, `delete_${preset} \n ${JSON.stringify(data.id)}`);
    try {
      connection.query(`DELETE FROM branches WHERE id IN (${data.id.join(',')})`, noResponseQuery);
      socket.emit('admin_status', 'was_deleted');
    } catch (error) {
      socket.emit('admin_status', 'not_deleted');
    }
  });
};

export default processBranches;
