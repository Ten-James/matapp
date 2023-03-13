import type { MysqlError } from 'mysql';
import connection, { query } from '../database';
import { writeLog } from '../logger';
import type { IBranchStorageItem, IBranch, IBranchData, IIngredient, IDialogBranch, IDialogStorage } from '../types';
import { noResponseQuery, noResponseQueryCallback } from '../misc';

const processBranches = (socket) => {
  socket.on('get_branches', () => {
    writeLog(socket.handshake.address, 'get_branches');
    connection.query('SELECT * FROM branches', (err: MysqlError, result: IBranch[]) => {
      if (err) throw err;
      socket.emit('branches', result as IBranch[]);
    });
  });

  socket.on('get_branches_storage', () => {
    writeLog(socket.handshake.address, 'get_branches_storage');
    connection.query('SELECT * FROM branches', (err: MysqlError, result: IBranch[]) => {
      if (err) throw err;
      let tmp: IBranchData<IIngredient>[] = [];
      result.forEach((x) => {
        // TODO: make this async and wait for it to finish
        connection.query(
          `SELECT i.id, i.name, t.name as 'category', bi.count, i.recommended_count as 'recommendedCount' FROM branch$ingredients bi LEFT JOIN ingredients i on bi.ingredient_id = i.id LEFT JOIN ingredient_types t ON i.ingredient_type_id = t.id WHERE branch_id = ${x.id}`,
          (err2: MysqlError, result2: IBranchStorageItem[]) => {
            if (err2) throw err2;
            result2 = result2.map((d) => {
              return {
                id: d.id,
                name: d.name,
                category: d.category,
                count: d.count,
                recommendedCount: d.recommendedCount * x.size,
              };
            });
            tmp = tmp.concat([
              {
                id: x.id,
                name: x.name,
                location: x.location,
                size: x.size,
                //@ts-ignore TODO fix this
                data: [...result2],
              },
            ]);
            socket.emit('branches_storage', tmp);
          },
        );
      });
    });
  });

  socket.on('get_branch_storage', (id: number) => {
    writeLog(socket.handshake.address, `get_branch_storage \n ${JSON.stringify(id)}`);
    connection.query('SELECT * FROM branches WHERE id = ?', [id], (err: MysqlError, result: IBranch[]) => {
      if (err) throw err;
      const data = { ...result[0], data: [] } as IBranchData<IIngredient>;
      connection.query(
        "SELECT i.id, i.name, t.name as 'category', bi.count, i.recommended_count as 'recommendedCount' FROM branch$ingredients bi LEFT JOIN ingredients i on bi.ingredient_id = i.id LEFT JOIN ingredient_types t ON i.ingredient_type_id = t.id WHERE branch_id = ?",
        [id],
        (err2: MysqlError, result2: IBranchStorageItem[]) => {
          if (err2) throw err2;
          result2 = result2.map((d) => {
            return {
              id: d.id,
              name: d.name,
              category: d.category,
              count: d.count,
              recommendedCount: d.recommendedCount * data.size,
            };
          });
          data.data = [...result2] as IIngredient[];
          socket.emit('branch_storage', [data]);
        },
      );
    });
  });

  const preset = 'branches';
  socket.on(`add_${preset}`, (data: IDialogBranch) => {
    writeLog(socket.handshake.address, `add_${preset} \n ${JSON.stringify(data)}`);
    try {
      connection.query(`INSERT INTO branches (name, location,size) VALUES ('${data.name}', '${data.location}', '${data.size}')`, noResponseQuery);
      socket.emit('status', 'was_added');
    } catch (err) {
      socket.emit('status', 'not_added');
    }
  });

  socket.on(`edit_${preset}`, (data: IDialogBranch) => {
    writeLog(socket.handshake.address, `edit_${preset} \n ${JSON.stringify(data)}`);
    try {
      connection.query(`UPDATE branches SET name = '${data.name}', location = '${data.location}', size = '${data.size}' WHERE id = ${data.id}`, noResponseQuery);
      socket.emit('status', 'was_edited');
    } catch (error) {
      socket.emit('status', 'not_edited');
    }
  });

  socket.on(`delete_${preset}`, (data: IDialogBranch) => {
    writeLog(socket.handshake.address, `delete_${preset} \n ${JSON.stringify(data.id)}`);
    try {
      connection.query(`DELETE FROM branches WHERE id IN (${data.id.join(',')})`, noResponseQuery);
      socket.emit('status', 'was_deleted');
    } catch (error) {
      socket.emit('status', 'not_deleted');
    }
  });

  socket.on('edit_storage', async (data: IDialogStorage) => {
    writeLog(socket.handshake.address, `edit_storage \n ${JSON.stringify(data)}`);
    try {
      await Promise.all(
        Object.entries(data.data).map(async ([id, count]) => {
          const entry = await query(`SELECT id FROM branch$ingredients WHERE ingredient_id = ${id} AND branch_id = ${data.id[0]}`);
          if (entry.length === 0) {
            await query(`INSERT INTO branch$ingredients (ingredient_id, branch_id, count) VALUES (${id}, ${data.id[0]}, ${count})`);
          } else {
            await query(`UPDATE branch$ingredients SET count = ${count} WHERE id = ${entry[0].id}`);
          }
        }),
      );
      socket.emit('status', 'was_edited');
    } catch (e) {
      socket.emit('status', 'not_edited');
      console.error(e);
    }
  });
};

export default processBranches;
