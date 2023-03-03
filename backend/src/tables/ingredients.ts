import type { MysqlError } from 'mysql';
import type { Socket } from 'socket.io';
import type { IDialogIngredient, IIngredient } from '../types';
import connection, { query } from '../database';
import { writeLog } from '../logger';
import { noResponseQueryCallback } from '../misc';

const processIngredients = (socket: Socket) => {
  socket.on('get_ingredients', () => {
    writeLog(socket.handshake.address, 'get_ingredients');
    connection.query(
      `SELECT i.id, i.name, CONCAT(i.text," ", ie.text) as "text", i.cost, t.name as 'category', IFNULL(GROUP_CONCAT(ia.num SEPARATOR ' '),"-") as 'allergens', i.recommended_count as 'recommendedCount' FROM ingredients i 
      LEFT JOIN ingredient_types t ON i.ingredient_type_id = t.id
      LEFT JOIN ingredient_allergens ia ON i.id = ia.ingredient_id
      LEFT JOIN ingredient_text_extensions ie ON i.ingredient_text_extension_id = ie.id
      GROUP BY i.id, i.name, i.cost, t.name ,i.text , ie.text`,
      (err: MysqlError, result: IIngredient[]) => {
        if (err) throw err;
        result = result.map((x: IIngredient) => {
          x.allergens = x.allergens !== 'unset' ? x.allergens.split(' ').sort().join(' ') : x.allergens;
          return x;
        });
        socket.emit('ingredients', result);
      },
    );
  });
  const preset = 'ingredients';
  socket.on(`add_${preset}`, async (data: IDialogIngredient) => {
    writeLog(socket.handshake.address, `add_${preset} \n ${JSON.stringify(data)}`);

    try {
      await query(`INSERT IGNORE INTO ingredient_types (name) VALUES ('${data.category}')`);
      const categoryId = (await query(`SELECT id FROM ingredient_types WHERE name = '${data.category}'`))[0].id;
      const extensionId = (await query(`SELECT id FROM ingredient_text_extensions WHERE text = '${data.text_combo}'`))[0].id;
      await query(`INSERT INTO ingredients (name, cost, ingredient_type_id, text, ingredient_text_extension_id, recommended_count) VALUES ('${data.name}', '${data.cost}', '${categoryId}','${data.text}' , '${extensionId}', '${data.recommendedCount}')`);
      const id = (await query(`SELECT id FROM ingredients WHERE name = '${data.name}'`))[0].id;
      (data.allergens || []).forEach((allergen: number) => query(`INSERT INTO ingredient_allergens (ingredient_id, num) VALUES ('${id}', '${allergen + 1}')`));
      socket.emit('admin_status', 'was_added');
    } catch (error) {
      console.log(error);
      socket.emit('admin_status', 'not_added');
    }
  });

  socket.on(`delete_${preset}`, (data: any) => {
    writeLog(socket.handshake.address, `delete_${preset} \n ${JSON.stringify(data)}`);

    try {
      query(`DELETE FROM ingredients WHERE id IN (${data.id.join(',')})`, (err: MysqlError, result: any) => noResponseQueryCallback(() => socket.emit('admin_status', 'not_deleted'), err, result));
      socket.emit('admin_status', 'was_deleted');
    } catch (error) {
      socket.emit('admin_status', 'not_deleted');
    }
  });

  socket.on(`edit_${preset}`, async (data: IDialogIngredient) => {
    writeLog(socket.handshake.address, `edit_${preset} \n ${JSON.stringify(data)}`);

    try {
      await query(`INSERT IGNORE INTO ingredient_types (name) VALUES ('${data.category}')`);
      const id = data.id[0];
      const categoryId = (await query(`SELECT id FROM ingredient_types WHERE name = '${data.category}'`))[0].id;
      const extensionId = (await query(`SELECT id FROM ingredient_text_extensions WHERE text = '${data.text_combo}'`))[0].id;

      //update
      await query(`UPDATE ingredients SET name = '${data.name}', cost = '${data.cost}', ingredient_type_id = '${categoryId}', text = '${data.text}', ingredient_text_extension_id = '${extensionId}', recommended_count = '${data.recommendedCount}' WHERE id = '${id}'`);
      await query(`DELETE FROM ingredient_allergens WHERE ingredient_id = '${id}'`);

      (data.allergens || []).forEach((allergen: number) => query(`INSERT INTO ingredient_allergens (ingredient_id, num) VALUES ('${id}', '${allergen + 1}')`));
      socket.emit('admin_status', 'was_eddited');
    } catch (error) {
      console.log(error);
      socket.emit('admin_status', 'not_edited');
    }
  });

  socket.on('get_ingredient_types', () => {
    writeLog(socket.handshake.address, 'get_ingredient_types');
    connection.query(`SELECT * FROM ingredient_types`, (err: MysqlError, result: any) => {
      if (err) throw err;
      socket.emit(
        'ingredient_types',
        result.map((x: any) => x.name),
      );
    });
  });
};

export default processIngredients;
