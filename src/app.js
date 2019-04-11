const express = require('express')

const app = express()

// app.com
// app.com/help
// app.com/about
app.get('', (req, res) => {
    res.send('Hello George Simos!')
})

app.get('/help', (req, res) => {
    res.send('Welcome to help section')
})

app.get('/about', (req, res) => {
    res.send('Welcome to about section')
})

app.get('/weather', (req, res) => {
    res.send('Welcome to weather page')
})

app.listen(3000, () => {
    console.log('app is running...')
})