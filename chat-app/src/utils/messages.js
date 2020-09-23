const generateMessage = (username, text) => ({
    username,
    text,
    createdAt: new Date().getTime()
})

const generateLocationMessage = (username, lat, long) => ({
    username,
    url: `https://google.com/maps?q=${lat},${long}`,
    createdAt: new Date().getTime(),
});

module.exports = {
    generateMessage,
    generateLocationMessage
};
