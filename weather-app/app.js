const request = require("request");

const WEATHERSTACK_ACCESS_KEY = 'e0e09c23a68dda1f9f0a8cfda79611c3';
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoicm9iaW5rdXJ0em9zIiwiYSI6ImNrZDZla3VrZTJnaWwyc215MjYwYm1kaWgifQ.8GmR3COVCVfocIvf8e7SRA';

const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1`;

const getWeatherAPIUrl = (lat, long) => `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_ACCESS_KEY}&query=${lat},${long}`;

request(
  {
    url: getWeatherAPIUrl(),
    json: true,
  },
  (error, response) => {
    const current = response.body.current;
    if (!response.body.current) {
        console.log('No current data provided');
    } else {
        console.log(
            `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
        );
    }
  }
);

request(
    {
      url: geoCodingUrl,
      json: true,
    },
    (error, response) => {
      const current = response.body;
      console.log(current.features[0].center[1], current.features[0].center[0]);
      console.log(getWeatherAPIUrl(
        current.features[0].center[1],
        current.features[0].center[0]
      ))
    }
  );