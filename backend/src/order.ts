import type { Socket } from 'socket.io';
import { IOrder } from './types';
import { writeLog } from './logger';
import Sessions from './realtime/session';
import * as fs from 'fs';
import { query } from './database';

const processOrders = (socket: Socket) => {
  socket.on('order', async (branchID: number, data: IOrder) => {
    writeLog(socket.handshake.address, `order\n ${JSON.stringify(data)}`);
    const session = Sessions.find((s) => s.branchId === branchID);
    if (session) {
      if (session.currentOrders.length === 0) {
        data.displayId = 1;
      } else {
        data.displayId = session.currentOrders[session.currentOrders.length - 1].displayId + 1;
      }
      await query('INSERT INTO serves (serve_date, session_id, type_id, cost, display_id) VALUES (?, ?, 1, ?, ?)', [data.date, session.id, data.cost, data.displayId]);
      const id = (await query('SELECT id FROM serves WHERE serve_date = ? AND session_id = ? AND type_id = 1 AND cost = ? AND display_id = ?', [data.date, session.id, data.cost, data.displayId]))[0].id;
      await Promise.all(
        data.dishes.map(async (dish) => {
          await query('INSERT INTO serve$dishes (serve_id, dish_id, count) VALUES (?, ?, ?)', [id, dish.id, dish.count]);
        }),
      );

      data.id = id;
      session.currentOrders.push(data);
      socket.emit('session', session);
      socket.broadcast.emit('session', session);
      socket.emit('status', 'order_success', data.displayId);
      fs.writeFile('sessions.json', JSON.stringify(Sessions), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    } else {
      socket.emit('status', 'no_session');
    }
  });

  socket.on('order_done', async (id: number) => {
    writeLog(socket.handshake.address, `order_done\n ${JSON.stringify(id)}`);
    const session = Sessions.find((s) => s.currentOrders.find((o) => o.id === id));
    if (session) {
      const order = session.currentOrders.find((o) => o.id === id);
      if (order) {
        order.type = 'submitted';
        await query('UPDATE serves SET type_id = 2 WHERE id = ?', [id]);
        socket.emit('session', session);
        socket.broadcast.emit('session', session);
        socket.emit('status', 'order_done_success');
        fs.writeFile('sessions.json', JSON.stringify(Sessions), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      } else {
        socket.emit('status', 'no_order');
      }
    } else {
      socket.emit('status', 'no_session');
    }
  });
};

export default processOrders;
