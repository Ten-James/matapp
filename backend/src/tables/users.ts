import type { MysqlError } from 'mysql';
import type { Socket } from 'socket.io';
import connection from '../database';
import { writeLog } from '../logger';
import type { IDialogUser, ILoginProps, IUser } from '../types';
import { noResponseQueryCallback } from '../misc';

const processUsers = (socket: Socket) => {
  socket.on('get_users', () => {
    writeLog(socket.handshake.address, 'get_users');
    connection.query("SELECT u.id, u.name, u.access, b.name as 'branchName' FROM users u LEFT JOIN branches b on u.branch_id = b.id", (err: MysqlError, result: IUser[]) => {
      if (err) throw err;
      socket.emit(
        'users',
        result.map((x) => ({
          id: x.id,
          name: x.name,
          password: '******',
          access: x.access === 1 ? 'User' : 'Admin',
          branchName: x.branchName,
        })),
      );
    });
  });

  socket.on('login', ({ name, pass }: ILoginProps): void => {
    writeLog(socket.handshake.address, 'login attempt');
    connection.query(`SELECT name, id, branch_id, access FROM users WHERE name = '${name}' AND password = md5('${pass}')`, (err: MysqlError, result: IUser[]): void => {
      if (err) throw err;
      if (result.length === 0) {
        socket.emit('login', { status: false });
        return;
      }
      socket.emit('login', { status: true, user: result[0] });
    });
  });

  const preset = 'users';
  socket.on(`add_${preset}`, (data: IDialogUser) => {
    writeLog(socket.handshake.address, `add_${preset} \n ${JSON.stringify(data)}`);
    connection.query(`INSERT INTO users (name, password, access, branch_id) VALUES ('${data.name}', md5('${data.password}'), ${data.access}, ${data.branch})`, noResponseQueryCallback);
  });

  socket.on(`delete_${preset}`, (data: IDialogUser) => {
    writeLog(socket.handshake.address, `delete_${preset} \n ${JSON.stringify(data)}`);
    connection.query(`DELETE FROM users WHERE id IN (${data.id.join(',')})`, noResponseQueryCallback);
  });

  socket.on(`edit_${preset}`, (data: IDialogUser) => {
    writeLog(socket.handshake.address, `edit_${preset} \n ${JSON.stringify(data)}`);
    console.log(JSON.stringify(data));
    if (data.password !== '') connection.query(`UPDATE users SET name = '${data.name}', password = md5('${data.password}'), branch_id = '${data.branch}' where id = ${data.id}`, noResponseQueryCallback);
    else connection.query(`UPDATE users SET name = '${data.name}', branch_id = '${data.branch}' where id = ${data.id}`, noResponseQueryCallback);
  });
};

export default processUsers;
