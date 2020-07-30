const request = require('request');

const { WEATHER_STACK_SECRET } = require('../constants');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${WEATHER_STACK_SECRET}&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, response) => {
        let err;
        let data;

        if (error) {
            err = 'Unable to connect to weather service';
        } else if (response.body.error) {
            err = 'Unable to find location';
        } else {
            const { current } = response.body;
            data = `
                ${current.weather_descriptions[0]}.
                It is currently ${current.temperature} degrees out.
                It feels like ${current.feelslike} degrees out,
                with a ${current.precip}% chance of rain & ${current.humidity}% humidity.
            `;
        }

        callback(err, data);
    });
};

module.exports = forecast;
