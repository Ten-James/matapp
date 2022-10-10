let stack = [];

const Log = (ip, message) => {
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

const GetLog = () => {
  return stack.map((log) => `[${log.time}][${log.ip}] ${log.message}`);
};

export { Log, GetLog };
