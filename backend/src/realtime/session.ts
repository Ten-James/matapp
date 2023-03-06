import { ISession } from '../types';
import * as fs from 'fs';

const Sessions: ISession[] = [];

fs.readFile('sessions.json', 'utf8', (err, data) => {
  if (err) return;
  const sessions = JSON.parse(data);
  sessions.forEach((session: ISession) => {
    Sessions.push(session);
  });
});

export default Sessions;
