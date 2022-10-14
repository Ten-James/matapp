interface Log {
  time: string;
  ip: string;
  message: string;
}

let stack: Log[] = [];

const Log = (ip: string, message: string): void => {
  const log = {
    ip: ip,
    message: message,
    time: new Date().toLocaleTimeString(),
  };
  stack.push(log);
  if (stack.length > 20) {
    stack.shift();
  }
};

const GetLog = (): string[] => {
  return stack.map((log) => `[${log.time}][${log.ip}] ${log.message}`);
};

export { Log, GetLog };
