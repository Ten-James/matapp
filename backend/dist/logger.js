"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLog = exports.Log = void 0;
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
exports.Log = Log;
const GetLog = () => {
    return stack.map((log) => `[${log.time}][${log.ip}] ${log.message}`);
};
exports.GetLog = GetLog;
