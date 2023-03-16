import type { Socket } from 'socket.io';
import { IOrder, IReportData } from './types';
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
      //insane backend skills
      const allCost = (await query('SELECT dish_id, ingredient_id, SUM(count) as count FROM dish$ingredients WHERE dish_id IN (?) GROUP BY dish_id, ingredient_id', [data.dishes.map((d) => d.id).join(', ')])) as { dish_id: number; ingredient_id: number; count: number }[];
      const allCost2 = allCost
        .map((a) => {
          const dish = data.dishes.find((d) => d.id === a.dish_id);
          if (dish) {
            return { ingredient_id: a.ingredient_id, count: a.count * dish.count };
          }
          return { ingredient_id: a.ingredient_id, count: a.count };
        })
        .reduce((acc, cur) => {
          const index = acc.findIndex((a) => a.ingredient_id === cur.ingredient_id);
          if (index === -1) {
            acc.push(cur);
          } else {
            acc[index].count += cur.count;
          }
          return acc;
        }, [] as { ingredient_id: number; count: number }[]);

      console.log(allCost2.map((a) => [a.ingredient_id, a.count, branchID]));
      await Promise.all(allCost2.map((a) => query(`UPDATE branch$ingredients SET count = count - ${a.count} WHERE ingredient_id = ${a.ingredient_id} AND branch_id = ${branchID}`)));

      const negative = (await query('SELECT ingredient_id FROM branch$ingredients WHERE count < 0 AND branch_id = ?', [branchID])) as { ingredient_id: number; count: number }[];
      if (negative.length > 0) {
        const name = (await query('SELECT name FROM dishes WHERE id = ?', [allCost.find((a) => a.ingredient_id === negative[0].ingredient_id)?.dish_id]))[0].name;
        socket.emit('status', 'order_failed', name);
        await Promise.all(allCost2.map((a) => query(`UPDATE branch$ingredients SET count = count + ${a.count} WHERE ingredient_id = ${a.ingredient_id} AND branch_id = ${branchID}`)));
        return;
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

  socket.on('order_finish', async (id: number) => {
    writeLog(socket.handshake.address, `order_done\n ${JSON.stringify(id)}`);
    const session = Sessions.find((s) => s.currentOrders.find((o) => o.id === id));
    if (session) {
      const order = session.currentOrders.find((o) => o.id === id);
      if (order) {
        order.type = 'finished';
        await query('UPDATE serves SET type_id = 3 WHERE id = ?', [id]);
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
  socket.on('get_report_data', async (props: number[]) => {
    const [branchID, sessionId] = props;
    writeLog(socket.handshake.address, `get_report_data\n ${branchID + ' ' + sessionId}`);
    console.log(branchID, sessionId);
    if (branchID === 0 || branchID === null || branchID === undefined) return;
    const orders = [] as IOrder[];
    if (sessionId !== 0 && sessionId !== null) {
      const orderSelect = (await query("SELECT id, serve_date as 'date', cost FROM serves WHERE session_id = ?", [sessionId])) as IOrder[];
      const dishData = (await query(`SELECT serve_id, dish_id, count FROM serve$dishes WHERE serve_id in (${orderSelect.map((o) => o.id).join(',')})`)) as { serve_id: number; dish_id: number; count: number }[];
      orders.push(
        ...orderSelect.map((o) => {
          return {
            id: o.id,
            date: o.date,
            cost: o.cost,
            displayId: 0,
            dishes: dishData
              .filter((d) => d.serve_id === o.id)
              .map((d) => {
                return { id: d.dish_id, count: d.count };
              }),
          } as IOrder;
        }),
      );
    }

    const data: IReportData = {
      sessions: await query('SELECT id, s_date as "startTime", e_date as "endTime"  FROM serve_sessions WHERE branch_id = ?', [branchID]),
      orders: orders,
    };
    socket.emit('report_data', data);
  });
};

export default processOrders;
