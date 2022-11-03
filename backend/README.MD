# MatAPP server

Server for Restaurant system. It is an application that allows users to order food and drinks from a restaurant. Also, it allows the restaurant to manage the orders and the menu. Connects to the client using socket.io. Using mysql as database.
Also use process memory to store data.

## JS libraries

- [express](https://expressjs.com/)
- [socket.io](https://socket.io/)
- [mysql](https://www.mysql.com/)
- [md5](https://www.npmjs.com/package/md5)
- [nodemon](https://nodemon.io/)

## Installation

Install [Node.js](https://nodejs.org/en/)
Then run the following commands:

```bash
npm install
```

## Usage

Development version: (uses nodemon and ts-node)

```bash
npm run dev
```

Production version: (better performance)

```bash
npm run build
node dist/index.js
```
