const request = require('request');

const { MAP_BOX_SECRET } = require('../constants');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${MAP_BOX_SECRET}&limit=1`;

    request({ url, json: true }, (error, response) => {
        let err;
        let data;

        if (error) {
            err = 'Unable to connect to location service';
        } else if (response.message) {
            err = `Location service responded with: ${response.message}`;
        } else if (response.body.features.length === 0) {
            err = 'Unable to find location, try again with new search term';
        } else {
            const body = response.body;
            const result = body.features[0];
            data = {
                latitude: result.center[1],
                longitude: result.center[0],
                location: result.place_name,
            };
        }

        callback(err, data);
    });
};

module.exports = geocode;
