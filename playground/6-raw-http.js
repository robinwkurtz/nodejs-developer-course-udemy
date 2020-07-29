const http = require('http');

const { WEATHER_STACK_SECRET } = require('../weather-app/constants');

const url = `http://api.weatherstack.com/current?access_key=${WEATHER_STACK_SECRET}&query=40,-75`;

const request = http.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (error) => {
    console.log('error', error);
});

request.end();
