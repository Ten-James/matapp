import processIngredients from "./ingredients";
import processUsers from "./users";
import processBranches from "./branches";
const ProcessTables = (socket) => {
	processIngredients(socket);
	processUsers(socket);
	processBranches(socket);
};

export default ProcessTables;
