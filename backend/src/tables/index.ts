import { Socket } from "socket.io";
import processIngredients from "./ingredients";
import processUsers from "./users";
import processBranches from "./branches";
import processDishes from "./dishes";
const ProcessTables = (socket: Socket) => {
	processIngredients(socket);
	processUsers(socket);
	processBranches(socket);
	processDishes(socket);
};

export default ProcessTables;
