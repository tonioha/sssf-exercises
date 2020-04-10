'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let rooms = ['home', 'room1', 'room2'];

io.on('connection', (socket) => {
  socket.emit('availablerooms', rooms, 'home');

  socket.room = 'home';
  socket.join('home');

  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  socket.on('chat message', (msg) => {
    console.log('message: ', msg);
    io.to(socket.room).emit('chat message', msg);
  });

  socket.on('switchroom', (newroom) => {
    socket.leave(socket.room);
    socket.join(newroom);
    socket.room = newroom;
    socket.emit('availablerooms', rooms, newroom);
  });
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
