import { Socket } from "socket.io";
import processBranches from "./branches";
import processDishes from "./dishes";
import processIngredients from "./ingredients";
import processUsers from "./users";
const ProcessTables = (socket: Socket) => {
  processIngredients(socket);
  processUsers(socket);
  processBranches(socket);
  processDishes(socket);
};

export default ProcessTables;
