const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origins: '*'
    }
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

  });
  
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

server.listen(5700, () => {
  console.log('listening on *:5700');
});