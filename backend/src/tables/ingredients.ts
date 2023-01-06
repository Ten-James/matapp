import type { MysqlError } from 'mysql';
import type { Socket } from 'socket.io';
import type { IDialogIngredient, IIngredient } from '../types';
import connection from '../database';
import { writeLog } from '../logger';

const processIngredients = (socket: Socket) => {
  socket.on('get_ingredients', () => {
    writeLog(socket.handshake.address, 'get_ingredients');
    connection.query(
      `SELECT i.id, i.name, CONCAT(i.text," ", ie.text) as "text", i.cost, t.name as 'category', IFNULL(GROUP_CONCAT(ia.num SEPARATOR ' '),"-") as 'allergens' FROM ingredients i 
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
  socket.on(`add_${preset}`, (data: IDialogIngredient) => {
    writeLog(socket.handshake.address, `add_${preset} \n ${JSON.stringify(data)}`);

    // create ingredient type if not exists and get id
    connection.query(`INSERT IGNORE INTO ingredient_types (name) VALUES ('${data.category}')`, (err: MysqlError, result: any) => {
      if (err) throw err;
      connection.query(`SELECT id FROM ingredient_types WHERE name = '${data.category}'`, (err: MysqlError, result: any) => {
        if (err) throw err;
        const ingredientTypeId = result[0].id;
        connection.query(`SELECT id FROM ingredient_text_extensions WHERE text = '${data.text_combo}'`, (err: MysqlError, result: any) => {
          if (err) throw err;
          const ingredientTextExtensionId = result[0].id;
          connection.query(`INSERT INTO ingredients (name, cost, ingredient_type_id, text, ingredient_text_extension_id) VALUES ('${data.name}', '${data.cost}', '${ingredientTypeId}','${data.text}' , '${ingredientTextExtensionId}')`, (err: MysqlError, result: any) => {
            if (err) throw err;
            connection.query(`SELECT id FROM ingredients WHERE name = '${data.name}'`, (err: MysqlError, result: any) => {
              if (err) throw err;
              const ingredientId = result[0].id;
              (data.allergens || []).forEach((allergen: number) => {
                connection.query(`INSERT INTO ingredient_allergens (ingredient_id, num) VALUES ('${ingredientId}', '${allergen}')`, (err: MysqlError, result: any) => {
                  if (err) throw err;
                });
              });
            });
          });
        });
      });
    });
  });

  socket.on(`delete_${preset}`, (data: any) => {
    writeLog(socket.handshake.address, `delete_${preset} \n ${JSON.stringify(data)}`);

    connection.query(`DELETE FROM ingredients WHERE id IN (${data.id.join(',')})`, (err: MysqlError, result: any) => {
      if (err) throw err;
    });
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
