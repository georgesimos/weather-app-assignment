const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
// Register the partials
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'George Simos'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        author: 'George Simos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author: 'George Simos',
        message: 'This is my message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({ error: 'You must provide an address!' });
    geocode(req.query.address, (error, { longitute, latitude, location } = {}) => {
        if (error) return res.status(500).send({ error })
        forecast(longitute, latitude, (error, forecastData) => {
            if (error) return res.status(500).send({ error })
            const summary = `${forecastData.summary}.  It is currently ${forecastData.temperature} degress out. There is a ${forecastData.precipProbability}% change of rain.`
            res.status(200).send({ forecast: forecastData, summary, location, address: req.query.address })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'George Simos',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'George Simos',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('app is running...')
})