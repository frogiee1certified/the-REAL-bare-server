/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('node:http');
const { createBareServer } = require('@tomphttp/bare-server-node');

const httpServer = http.createServer();

const bareServer = createBareServer('/');

httpServer.on('request', (req, res) => {
if (bareServer.shouldRoute(req)) {
bareServer.routeRequest(req, res);
} else {
res.writeHead(400);
res.end('Not found.');
}
});

httpServer.on('upgrade', (req, socket, head) => {
if (bareServer.shouldRoute(req)) {
bareServer.routeUpgrade(req, socket, head);
} else {
socket.end();
}
});

httpServer.on('listening', () => {
console.log('HTTP server listening');
});

httpServer.listen({
port: 80, // if you are using sillydev make sure that this port is the port of your sillydev sever
});
