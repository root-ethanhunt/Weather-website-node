const request = require('request')

const geourl = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXRoYW5odW50MjIxMiIsImEiOiJja2dtZmEwNWExMnNmMnRuYXh3aWU4dzN6In0.T_wiBfXtaO85VJrGA0xsjw&limit=1'

    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to find location services!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1]
            })
        }
    })
}

// geourl('New York', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

module.exports=geourl