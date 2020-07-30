const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Constants
const { PORT, AUTHOR_NAME } = require('./constants');

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: AUTHOR_NAME,
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: AUTHOR_NAME,
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: AUTHOR_NAME,
        message: 'What can I help you with?',
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: AUTHOR_NAME,
        message: 'Help article not found.',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address',
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecast) => {
                if (error) {
                    return res.send({ error });
                }

                return res.send({
                    forecast,
                    location,
                    address: req.query.address
                });
            });
        }
    );
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: AUTHOR_NAME,
        message: 'Page not found.',
    });
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`);
});
