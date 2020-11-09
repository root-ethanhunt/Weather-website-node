const request = require('request')

const forcast = (lon,lat,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=f4daa18efcf7204fe400dea95168deef&units=metric'

    request({url,json:true},(error,{body}) => {
   if(error){
        callback('Unable to connect to weather service',undefined)
    }
    else if(body.cod===401){
        callback('Unable to find location',undefined)
    }
    else{
     callback(undefined,'It is currently '+ body.main.temp +' degress out.' )
     //  callback(undefined,body.main)
    }
    })
}

module.exports=forcast
