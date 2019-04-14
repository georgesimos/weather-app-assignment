const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

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
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/api', (req, res) => {
    res.render('api')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({ error: 'You must provide an address!' });
    geocode(req.query.address, (error, { longitute, latitude, location } = {}) => {
        if (error) return res.status(400).send({ error })
        forecast(longitute, latitude, (error, forecastData) => {
            if (error) return res.status(400).send({ error })
            const summary = `${forecastData.summary}.  It is currently ${forecastData.temperature} degress out. There is a ${forecastData.precipProbability}% change of rain.`
            res.status(200).send({ forecast: forecastData, summary, location, address: req.query.address })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'George Simos',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('app is running...')
})