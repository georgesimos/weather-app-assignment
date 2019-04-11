const path = require('path')
const express = require('express')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


app.get('/weather', (req, res) => {
    res.send({
        location: 'Koufonisia',
        forecast: '14c'
    })
})

app.listen(3000, () => {
    console.log('app is running...')
})