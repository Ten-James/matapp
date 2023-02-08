import { Socket } from 'socket.io';
import Sessions from './session';
import { ISession } from '../types';

const Realtime = (socket: Socket) => {
  socket.on('get_session', (branchId: number) =>
    socket.emit(
      'session',
      Sessions.find((x) => x.branchId === branchId),
    ),
  );

  socket.on('set_session', (session: ISession) => {
    const index = Sessions.findIndex((x) => x.branchId === session.branchId);
    if (index === -1) {
      Sessions.push(session);
    } else {
      Sessions[index] = session;
    }
    socket.broadcast.emit('session', session);
    socket.emit('session', session);
  });
};

export default Realtime;