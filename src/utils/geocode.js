const request = require('request')
/*
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3NjYXI0IiwiYSI6ImNrcnlvMmszZjA1amYycHBqYzVsaXlnMTcifQ.ej4wrm-y85WPDaqkgXXpqg&limit=1' //encodeURIComponent() is a function used to avoid errors when the user puts special characters

    request({url, json: true}, (error, response) => { // 'url:url' is the same code as 'url', this is because the object property shorthand
        if(error) {
            callback('Unable to connect to sevices' , undefined) //If you do not write "undefined" will get the same result
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}
*/
//Object "response" destructuring as  Destructuring function arguments
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3NjYXI0IiwiYSI6ImNrcnlvMmszZjA1amYycHBqYzVsaXlnMTcifQ.ej4wrm-y85WPDaqkgXXpqg&limit=1' //encodeURIComponent() is a function used to avoid errors when the user puts special characters

    request({url, json: true}, (error, {body}) => { // 'url:url' is the same code as 'url', this is because the object property shorthand
        if(error) {
            callback('Unable to connect to sevices' , undefined) //If you do not write "undefined" will get the same result
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode