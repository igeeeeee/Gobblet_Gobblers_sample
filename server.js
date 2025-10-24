// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let board = Array(9).fill(null);
let currentPlayer = 'X';

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
  socket.emit('boardUpdate', board);

  socket.on('move', (index) => {
    if (board[index] === null) {
      board[index] = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      io.emit('boardUpdate', board);
    }
  });

  socket.on('reset', () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    io.emit('boardUpdate', board);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
