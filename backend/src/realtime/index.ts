import { Socket } from 'socket.io';
import Sessions from './session';
import { ISession } from '../types';
import * as fs from 'fs';
import { query } from '../database';

const Realtime = (socket: Socket) => {
  socket.on('get_session', (branchId: number) =>
    socket.emit(
      'session',
      Sessions.find((x) => x.branchId === branchId),
    ),
  );

  socket.on('set_session', async (session: ISession) => {
    const index = Sessions.findIndex((x) => x.branchId === session.branchId);
    if (index === -1) {
      await query('INSERT INTO serve_sessions (branch_id, s_date) VALUES (?, ?)', [session.branchId, session.startTime]);
      const id = await query('SELECT id FROM serve_sessions WHERE branch_id = ? AND s_date = ?', [session.branchId, session.startTime]);
      session.id = id[0].id;
      Sessions.push(session);
    } else {
      Sessions[index] = session;
    }
    socket.broadcast.emit('session', session);
    socket.emit('session', session);
    fs.writeFile('sessions.json', JSON.stringify(Sessions), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });

  socket.on('close_session', async (branchId: number) => {
    const index = Sessions.findIndex((x) => x.branchId === branchId);
    if (index !== -1) {
      await query('UPDATE serve_sessions SET e_date = ? WHERE id = ?', [new Date().toLocaleString(), Sessions[index].id]);
      Sessions.splice(index, 1);
    }
    socket.emit('closed_session', branchId);
    socket.broadcast.emit('closed_session', branchId);
    fs.writeFile('sessions.json', JSON.stringify(Sessions), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
};

export default Realtime;
