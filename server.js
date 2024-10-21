const express = require('express');
const net = require('net');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/ping', (req, res) => {
  const { ip, port } = req.query;
  const socket = new net.Socket();

  socket.setTimeout(2000); // 2 seconds timeout

  socket.on('connect', () => {
    res.send({ status: 'up' });
    socket.destroy();
  });

  socket.on('timeout', () => {
    res.send({ status: 'down' });
    socket.destroy();
  });

  socket.on('error', () => {
    res.send({ status: 'down' });
    socket.destroy();
  });

  socket.connect(port, ip);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});