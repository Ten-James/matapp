import type { MysqlError } from 'mysql';
import connection, { query } from '../database';
import { writeLog } from '../logger';
import type { IDishIngredient, IDish, IDialogDish, IDialogDishCategory } from '../types';
import { noResponseQueryCallback } from '../misc';

const processDishes = (socket) => {
  socket.on('get_dishes', () => {
    writeLog(socket.handshake.address, 'get_dishes');
    connection.query("SELECT d.id, d.name, d.cost, dc.name as 'category' FROM dishes d LEFT JOIN dish_categories dc ON d.category_id = dc.id", (err: MysqlError, result: IDish[]) => {
      if (err) throw err;
      let data: IDish[] = [];
      result.forEach((x) => {
        // TODO: make this async and wait for it to finish
        connection.query("SELECT CONCAT(di.count,'x ', i.name) as 'name' FROM dish$ingredients di LEFT JOIN ingredients i ON di.ingredient_id = i.id WHERE dish_id = " + x.id, (err2: MysqlError, result2: IDishIngredient[]) => {
          if (err2) throw err2;
          const lines = [...new Set(result2.map((x) => x.line))];
          const ingredients = result2.map((x) => x.name.replace('1x ', ''));

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
    connection.query('SELECT id, name, icon FROM dish_categories', (err: MysqlError, result: { id: number; name: string }[]) => {
      if (err) throw err;
      socket.emit('dish_categories', result);
    });
  });

  socket.on(`edit_dish_categories`, (data: IDialogDishCategory) => {
    writeLog(socket.handshake.address, `edit_dish_categories \n ${JSON.stringify(data)}`);
    for (const [id, name] of Object.entries(data.data)) {
      connection.query(`UPDATE dish_categories SET icon = '${name}' WHERE id = ${id}`, (err: MysqlError) => {
        if (err) throw err;
      });
    }
  });

  const preset = 'dishes';
  socket.on(`add_${preset}`, async (data: IDialogDish) => {
    writeLog(socket.handshake.address, `add_${preset} \n ${JSON.stringify(data)}`);
    try {
      //insert into categories if not exists
      await query(`INSERT IGNORE INTO dish_categories (name, icon) VALUES ('${data.category}', 'restaurant')`);
      //get category id
      const category_id = (await query(`SELECT id FROM dish_categories WHERE name = '${data.category}'`))[0].id;
      //insert dish
      await query(`INSERT INTO dishes (name, cost, category_id) VALUES ('${data.name}', ${data.cost}, ${category_id})`);
      //get dish id
      const dish_id = (await query(`SELECT id FROM dishes WHERE name = '${data.name}'`))[0].id;
      //insert ingredients
      console.log(data.ingredients);
      await Promise.all(data.ingredients.map((item) => query(`INSERT INTO dish$ingredients (dish_id, ingredient_id, count) VALUES (${dish_id}, ${item[0]}, 1)`)));
      socket.emit('admin_status', 'was_added');
    } catch (e) {
      socket.emit('admin_status', 'not_added');
      console.error(e);
    }
  });

  socket.on(`delete_${preset}`, async (data: any) => {
    writeLog(socket.handshake.address, `delete_${preset} \n ${JSON.stringify(data)}`);

    try {
      await query(`DELETE FROM dish$ingredients WHERE dish_id IN (${data.id.join(',')})`);
      query(`DELETE FROM dishes WHERE id IN (${data.id.join(',')})`, (err: MysqlError, result: any) => noResponseQueryCallback(() => socket.emit('admin_status', 'not_deleted'), err, result));
      socket.emit('admin_status', 'was_deleted');
    } catch (error) {
      socket.emit('admin_status', 'not_deleted');
    }
  });

  socket.on(`edit_${preset}`, async (data: IDialogDish) => {
    writeLog(socket.handshake.address, `edit_${preset} \n ${JSON.stringify(data)}`);

    try {
      //insert into categories if not exists
      await query(`INSERT IGNORE INTO dish_categories (name, icon) VALUES ('${data.category}', 'restaurant')`);
      //get category id
      const category_id = (await query(`SELECT id FROM dish_categories WHERE name = '${data.category}'`))[0].id;
      //update dish
      await query(`UPDATE dishes SET name = '${data.name}', cost = ${data.cost}, category_id = ${category_id} WHERE id = ${data.id}`);
      //delete ingredients
      await query(`DELETE FROM dish$ingredients WHERE dish_id = ${data.id}`);
      //insert ingredients
      await Promise.all(data.ingredients.map((item) => query(`INSERT INTO dish$ingredients (dish_id, ingredient_id, count) VALUES (${data.id}, ${item[0]}, 1)`)));
      socket.emit('admin_status', 'was_edited');
    } catch (e) {
      socket.emit('admin_status', 'not_edited');
      console.error(e);
    }
  });
};

export default processDishes;
