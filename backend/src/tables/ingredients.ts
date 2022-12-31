import type { MysqlError } from 'mysql';
import type { Socket } from 'socket.io';
import type { IDialogBranch, IIngredient } from '../types';
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
  socket.on(`add_${preset}`, (data: IDialogBranch) => {
    writeLog(socket.handshake.address, `add_${preset} \n ${JSON.stringify(data)}`);
  });
};

export default processIngredients;
