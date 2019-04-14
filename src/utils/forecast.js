const request = require('request')

const forecast = (longitute, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/b2c72e927c163e00c36ddb5f455e0db9/${longitute},${latitude}`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to find location.')
        } else if (body.error) {
            callback(body.error)
        } else {
            const { currently } = body
            callback(undefined, currently)
        }
    })
}

module.exports = forecast