const users = [];

const sanitizeString = (string) => string.trim().toLowerCase();

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = sanitizeString(username);
    room = sanitizeString(room);

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => user.room === room && user.username === username);
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Add user to list of users
    const user = {
        id,
        username,
        room
    };
    users.push(user);

    return { user };
};

const removeUser = (id) => {
    // Get users index
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === sanitizeString(room));

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
};
