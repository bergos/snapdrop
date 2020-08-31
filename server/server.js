const http = require('http')
const express = require('express');
const SnapdropServer = require('.');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('../client'));

const server = http.createServer(app);
const snapdrop = new SnapdropServer()

server.on('upgrade', function (request, socket, head) {
  snapdrop._wss.handleUpgrade(request, socket, head, function (ws) {
    snapdrop._wss.emit('connection', ws, request);
  });
});

server.listen(port, function () {
  console.log('Snapdrop standalone is running on port', port);
});
