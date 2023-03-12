import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import processConnection from './src/process';

const app: any = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', processConnection);

httpServer.listen(process.env.PORT, () => {});
