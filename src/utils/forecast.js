const request = require('request')

const forecast = (latitude, longitude, callback )=> {
const url = 'http://api.weatherstack.com/current?access_key=7c5ca28455f7c4ec3736f5afda1d4c45&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+''
   request({url , json : true } , (error , {body}) => {
    if(error ){
        callback('cannot connect to server',undefined)
    }else if (body.error)
    {
        callback('invalid location coordinate',undefined)
    }else{
        callback(undefined,{location : body.location.name,
                  temperature : body.current.temperature,
                feelslike: body.current.feelslike })
    }
   })
}

module.exports = forecast