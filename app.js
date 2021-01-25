const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

const app = express();

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(path.join(__dirname, '/public/')));

io.sockets.on('connection', (socket) => {
    console.log('A user Connected!');
    let id = socket.id;
    socket.on('mousemove', (data) => {
        data.id = id;
        socket.broadcast.emit('moving', data);
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('clientdisconnect', id);
    });
});

module.exports = server;
