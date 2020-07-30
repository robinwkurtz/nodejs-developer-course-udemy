const pkg = require('../package');

module.exports = {
    PORT: process.env.PORT || 3000,
    AUTHOR_NAME: pkg.author,
    WEATHER_STACK_SECRET: 'e0e09c23a68dda1f9f0a8cfda79611c3',
    MAP_BOX_SECRET:
        'pk.eyJ1Ijoicm9iaW5rdXJ0em9zIiwiYSI6ImNrZDZla3VrZTJnaWwyc215MjYwYm1kaWgifQ.8GmR3COVCVfocIvf8e7SRA',
};
