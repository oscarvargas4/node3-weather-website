const request = require('request')
/*
const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0314907959fb78d3b1125f5fbdaf24e&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true}, (error, response) => { // 'url:url' is the same code as 'url', this is because the object property shorthand
        if (error) {
            callback('Unable to connect to sevices', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' out. It feels like ' + (response.body.current.feelslike) + ' degrees out.' )
        }
    })
}
*/

//Object "response" destructuring as  Destructuring function arguments
const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0314907959fb78d3b1125f5fbdaf24e&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true}, (error, {body}) => { // 'url:url' is the same code as 'url', this is because the object property shorthand
        if (error) {
            callback('Unable to connect to sevices', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' out. It feels like ' + (body.current.feelslike) + ' degrees out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast