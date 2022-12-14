# MatAPP client

Client for Restaurant system. It is an application that allows users to order food and drinks from a restaurant. Also, it allows the
restaurant to manage the orders and the menu.

generated using vite

## JS libraries

- [vite](https://vitejs.dev/)
- [react](https://reactjs.org/)
- [react-router](https://reacttraining.com/react-router/)
- [styled-components](https://www.styled-components.com/)
- [socket.io-client](https://socket.io/)
- [react-transition-group](https://reactcommunity.org/react-transition-group/)
- [electron](https://www.electronjs.org/)

## Installation

Install [Node.js](https://nodejs.org/en/)

Then run the following commands:

```bash
npm install
```

## Usage

### Web

Development version: (uses vite)

```bash
npm run dev
```

Production version:

```bash
npm run build
```

### Electron

Development version: (need to run web version)

```bash
npm run dev
npm run electron:dev
```

Production version:

```bash
npm run build
npm run electron:build
```
