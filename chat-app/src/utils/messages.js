const generateMessage = (text) => ({
    text,
    createdAt: new Date().getTime()
})

const generateLocationMessage = (lat, long) => ({
    url: `https://google.com/maps?q=${lat},${long}`,
    createdAt: new Date().getTime()
});

module.exports = {
    generateMessage,
    generateLocationMessage
};
