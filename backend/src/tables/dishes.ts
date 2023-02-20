import type { MysqlError } from 'mysql';
import connection, { query } from '../database';
import { writeLog } from '../logger';
import type { IDishIngredient, IDish, IDialogDish } from '../types';

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

  socket.on('get_dish_categories', () => {
    writeLog(socket.handshake.address, 'get_dish_categories');
    connection.query('SELECT id, name FROM dish_categories', (err: MysqlError, result: { id: number; name: string }[]) => {
      if (err) throw err;
      socket.emit('dish_categories', result);
    });
  });

  const preset = 'dishes';
  socket.on(`add_${preset}`, async (data: IDialogDish) => {
    writeLog(socket.handshake.address, `add_${preset} \n ${JSON.stringify(data)}`);
    try {
      //insert into categories if not exists
      await query(`INSERT IGNORE INTO dish_categories (name) VALUES ('${data.category}')`);
      //get category id
      const category_id = (await query(`SELECT id FROM dish_categories WHERE name = '${data.category}'`))[0].id;
      //insert dish
      await query(`INSERT INTO dishes (name, cost, category_id) VALUES ('${data.name}', ${data.cost}, ${category_id})`);
      //get dish id
      const dish_id = (await query(`SELECT id FROM dishes WHERE name = '${data.name}'`))[0].id;
      //insert ingredients
      data.ingredients.forEach((x, i) => {
        x.forEach((y) => {
          query(`INSERT INTO dish$ingredients (dish_id, ingredient_id, count, line) VALUES (${dish_id}, ${y}, 1, ${i})`);
        });
      });
      socket.emit('admin_status', 'was_added');
    } catch (e) {
      socket.emit('admin_status', 'not_added');
      console.error(e);
    }
  });
};

export default processDishes;
