const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ3NpbW9zIiwiYSI6ImNqczNiNW1hOTI1dGY0YWx4Ymg5cG0xOWsifQ.gxue-oHNEdxPfMvIK9VKMg`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location try another search.')
        } else {
            const { center, place_name: location } = body.features[0]
            const [longitute, latitude] = center
            callback(undefined, { longitute, latitude, location })
        }
    })
}

module.exports = geocode;