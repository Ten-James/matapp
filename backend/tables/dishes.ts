import { isTemplateExpression } from "typescript";
import connection from "../database";
import { Log } from "../logger";

//TODO add types

const processDishes = (socket) => {
	socket.on("get_dishes", () => {
		Log(socket.handshake.address, "get_dishes");
		connection.query(
			"SELECT d.id, d.name, d.cost, dc.name as 'category' FROM dishes d LEFT JOIN dish_categories dc ON d.category_id = dc.id",
			(err, result) => {
				if (err) throw err;
				let data = [];
				result.forEach((x) => {
					connection.query(
						"SELECT CONCAT(di.count,'x ', i.name) as 'name', di.line FROM dish$ingredients di LEFT JOIN ingredients i ON di.ingredient_id = i.id WHERE dish_id = " +
							x.id,
						(err2, result2) => {
							if (err2) throw err2;
							const lines = [...new Set(result2.map((x) => x.line))];
							const ingredients = lines.map((line) =>
								result2
									.filter((x) => x.line === line)
									.map((x) => x.name.replace("1x ", ""))
									.join(" nebo ")
							);

							data.push({
								...x,
								ingredients: ingredients,
							});
							socket.emit("dishes", data);
						}
					);
				});
			}
		);
	});
};

export default processDishes;
