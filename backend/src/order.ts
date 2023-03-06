import type { Socket } from 'socket.io';
import { IOrder } from './types';
import { writeLog } from './logger';
import Sessions from './realtime/session';

const processOrders = (socket: Socket) => {
  socket.on('order', (branchID: number, data: IOrder) => {
    writeLog(socket.handshake.address, `order\n ${JSON.stringify(data)}`);
    const session = Sessions.find((s) => s.branchId === branchID);
    if (session) {
      if (session.currentOrders.length === 0) {
        data.id = 1;
      } else {
        data.id = session.currentOrders[session.currentOrders.length - 1].id + 1;
      }
      session.currentOrders.push(data);
      socket.broadcast.emit('session', session);
      socket.emit('admin_status', 'order_success');
    } else {
      socket.emit('admin_status', 'no_session');
    }
  });
};

export default processOrders;
