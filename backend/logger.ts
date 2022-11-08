const fs = require("fs");

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
	// append to file
	fs.appendFile(`logs/${new Date().toLocaleDateString()}.log`, `[${log.time}][${log.ip}] ${log.message}\r`, (err) => {
		if (err) throw err;
	});
	if (stack.length > 1) {
		if (
			stack[stack.length - 2].time === log.time &&
			stack[stack.length - 2].ip === log.ip &&
			stack[stack.length - 2].message === log.message
		)
			stack.pop();
		if (stack.length > 20) {
			stack.shift();
		}
	}
};

const GetLog = (): string[] => {
	return stack.map((log) => `[${log.time}][${log.ip}] ${log.message}`);
};

export { Log, GetLog };
