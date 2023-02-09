import * as fs from 'fs';
import { ILogType } from './types';
const stack: ILogType[] = [];

const initTimeLog = (): { [key: string]: number } => {
  if (fs.existsSync('logs/time.log')) {
    const data = fs.readFileSync('logs/time.log', 'utf8');
    if (data) {
      return JSON.parse(data);
    }
  }
  return {};
};

const timeLog: { [key: string]: number } = initTimeLog();

const writeLog = (ip: string, message: string): void => {
  writeTimeLog();
  const log: ILogType = {
    ip: ip,
    message: message,
    time: new Date().toLocaleTimeString(),
  } as const;
  stack.push(log);
  // append to file

  fs.appendFile(`logs/${new Date().toLocaleDateString('cs-CZ')}.log`, `[${log.time}][${log.ip}] ${log.message}\r`, (err) => {
    if (err) throw err;
  });
  if (stack.length > 1) {
    if (stack[stack.length - 2].time === log.time && stack[stack.length - 2].ip === log.ip && stack[stack.length - 2].message === log.message) stack.pop();
    if (stack.length > 20) {
      stack.shift();
    }
  }
};

const getLogsAsString = (): string[] => {
  return stack.map((log) => `[${log.time}][${log.ip}] ${log.message}`);
};

const writeTimeLog = () => {
  const time = new Date().toLocaleDateString('cs-CZ');
  if (timeLog[time]) {
    timeLog[time]++;
  } else {
    timeLog[time] = 1;
  }
  if (timeLog.length > 50) {
    delete timeLog[Object.keys(timeLog)[0]];
  }
  fs.writeFileSync('logs/time.log', JSON.stringify(timeLog));
};

const getTimeLog = (): { [key: string]: number } => {
  return timeLog;
};

export { writeLog, getLogsAsString, writeTimeLog, getTimeLog };
