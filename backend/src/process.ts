import { Socket } from 'socket.io';
import { io } from '../index';
import connection from './database';
import { getLogsAsString, getTimeLog, writeLog } from './logger';
import ProcessTables from './tables';
import Realtime from './realtime';

const sendInfo = (socket: Socket) => {
  // send server uptime, io connected clients
  // memory usage and current time
  // TODO: make this right. This is a hack
  let sec = process.uptime();
  const days = Math.floor(sec / (3600 * 24));
  sec -= days * 3600 * 24;
  const hrs = Math.floor(sec / 3600);
  sec -= hrs * 3600;
  const min = Math.floor(sec / 60);
  sec -= min * 60;
  const uptime = `${days.toString().padStart(2, '0')}:${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${Math.floor(sec).toString().padStart(2, '0')}`;

  connection.query(
    `SELECT SUM(data_length + index_length) / 1024 / 1024 AS \"size\", SUM(TABLE_ROWS) AS \"rows\"
	FROM information_schema.TABLES 
	WHERE table_schema = "matapp" 
	GROUP BY table_schema;
	`,
    (err, result) => {
      if (err) throw err;
      const databaseData = result[0];
      socket.emit('info', {
        uptime: uptime,
        clients: io.engine.clientsCount,
        memory: Math.floor(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
        time: new Date().toLocaleTimeString(),
        data: getLogsAsString(),
        database: [databaseData.size, databaseData.rows] as const,
        timeLog: getTimeLog(),
      });
    },
  );
};

const processConnection = (socket: Socket) => {
  Realtime(socket);
  ProcessTables(socket);
  socket.on('get_info', () => {
    sendInfo(socket);
  });
};

export default processConnection;
