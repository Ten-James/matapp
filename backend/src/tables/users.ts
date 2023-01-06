import md5 from 'md5';
import type { MysqlError } from 'mysql';
import type { Socket } from 'socket.io';
import connection from '../database';
import { writeLog } from '../logger';
import type { IDialogUser, ILoginProps, IUser } from '../types';

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
    connection.query(`SELECT name, id, branchId, access FROM users WHERE name = '${name}' AND password = '${md5(pass)}'`, (err: MysqlError, result: IUser[]): void => {
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
  });

  socket.on(`delete_${preset}`, (data: IDialogUser) => {
    writeLog(socket.handshake.address, `delete_${preset} \n ${JSON.stringify(data)}`);
    connection.query(`DELETE FROM users WHERE id IN (${data.id.join(',')})`, (err: MysqlError, result: any) => {
      if (err) throw err;
    });
  });
};

export default processUsers;
