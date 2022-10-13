import connection from "./database.js";

const processIngredients = (socket) => {
  socket.on("get_ingredients", () => {
    Log(socket.request.socket.remoteAddress, "get_ingredients");
    connection.query(
      `SELECT i.id, i.name, t.name as 'Category' 
      FROM ingredients i 
      LEFT JOIN ingredients_types t ON i.ingredient_type_id = t.id`,
      (err, result) => {
        if (err) throw err;
        socket.emit("ingredients", result);
      }
    );
  });
};

export default processIngredients;
