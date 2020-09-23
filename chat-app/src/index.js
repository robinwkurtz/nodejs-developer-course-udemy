const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocationMessage } = require('./utils/messages');
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
} = require('./utils/users');

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

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        // Welcome user who joined
        socket.emit('message', generateMessage(`Welcome ${user.username}!`));
        // Inform other users in joined room of new user
        socket.broadcast.to(user.room).emit('message', generateMessage('Chat Bot', `${user.username} has joined!`));
        // Log room data
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });

    socket.on('sendLocation', (location, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, location.latitude, location.longitude));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage('Chat Bot', `A ${user.username} has left!`));
            // Log room data
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`);
});
