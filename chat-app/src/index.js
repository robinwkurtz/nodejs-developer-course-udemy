const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocationMessage } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Constants
const { PORT } = require('./constants');

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');

// Setup static directory to serve
app.use(express.static(publicPath));

let count = 0;

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('message', generateMessage('Welcome!'));
    socket.broadcast.emit('message', generateMessage('A new user has joined'));

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        io.emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(location.latitude, location.longitude));
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'));
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`);
});
