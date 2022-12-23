import type { MysqlError } from 'mysql';
import connection from '../database';
import { writeLog } from '../logger';
import type { IDishIngredient, IDish } from '../types';

const processDishes = (socket) => {
  socket.on('get_dishes', () => {
    writeLog(socket.handshake.address, 'get_dishes');
    connection.query("SELECT d.id, d.name, d.cost, dc.name as 'category' FROM dishes d LEFT JOIN dish_categories dc ON d.category_id = dc.id", (err: MysqlError, result: IDish[]) => {
      if (err) throw err;
      let data: IDish[] = [];
      result.forEach((x) => {
        // TODO: make this async and wait for it to finish
        connection.query("SELECT CONCAT(di.count,'x ', i.name) as 'name', di.line FROM dish$ingredients di LEFT JOIN ingredients i ON di.ingredient_id = i.id WHERE dish_id = " + x.id, (err2: MysqlError, result2: IDishIngredient[]) => {
          if (err2) throw err2;
          const lines = [...new Set(result2.map((x) => x.line))];
          const ingredients = lines.map((line) =>
            result2
              .filter((x) => x.line === line)
              .map((x) => x.name.replace('1x ', ''))
              .join(' nebo '),
          );

          data.push({
            ...x,
            ingredients: ingredients,
          } as IDish);
          socket.emit('dishes', data);
        });
      });
    });
  });
};

export default processDishes;
