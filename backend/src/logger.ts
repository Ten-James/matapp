const fs = require('fs');
import { ILogType } from './types';
let stack: ILogType[] = [];

const writeLog = (ip: string, message: string): void => {
  const log: ILogType = {
    ip: ip,
    message: message,
    time: new Date().toLocaleTimeString(),
  } as const;
  stack.push(log);
  // append to file
  fs.appendFile(`logs/${new Date().toLocaleDateString()}.log`, `[${log.time}][${log.ip}] ${log.message}\r`, (err) => {
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

export { writeLog, getLogsAsString };
