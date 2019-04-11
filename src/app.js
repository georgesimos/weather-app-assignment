const path = require('path')
const express = require('express')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
publicDirectoryPath = path.join(__dirname, '../public')
viewPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)

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
        message: 'This is my message'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: 'Koufonisia',
        forecast: '14c'
    })
})

app.listen(3000, () => {
    console.log('app is running...')
})