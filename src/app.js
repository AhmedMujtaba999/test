// const fs = require('fs')
// const axios = require('axios');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geolocation = require('./utils/geolocation');
const weather = require('./utils/weather');
const app = express();

console.log(__dirname);


//define paths for express config
const publicFileDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static derectory for express to serve
app.use(express.static(publicFileDirectory));


//listening to home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'WELCOME',
        name: 'Ahmed Mujtaba Ali'
    });

})


//listening to home page
app.get('/weather', (req, res) => {

    console.log(req.query.address);

    if (!req.query.address) {
        return res.send({
            error: 'no address'
        });
    }


    geolocation(req.query.address, (lat, lng) => {

        console.log(lat, lng);
        weather(lat, lng, (placeName, temp) => {
            console.log('from app.js:   ====   ', placeName, temp);

            res.send({
                temperature: temp,
                location: placeName
            })
        })
    });




})


//listening to help page and directing to views page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'need help?',
        name: 'Ahmed Mujtaba Ali'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Ahmed Mujtaba Ali'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'help article not found',
        name: 'Ahmed Mujtaba Ali'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'page not found',
        name: 'Ahmed Mujtaba Ali'
    })

})








app.listen(3000, () => { console.log('server is up'); })
