const request = require('request')

const geocode = (address , callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1hbmdhdXRhbTA4MTAiLCJhIjoiY2xkbW1rNm4xMGF2dDN2bGU4YWV5azdsbCJ9.tUtfkH7UeRLGKtM7crV2kw&limit=1'
   
    request({url , json : true }, (error ,{body} ) => {
       if(error){
           callback('unable to connect the server geocode' , undefined)
       } else if(body.features.length === 0 ) {
           callback('this place do not exist . please try again' , undefined)
       }else 
       {
           callback(undefined , {
               latitude :  body.features[0].geometry.coordinates[1],
               longitude :   body.features[0].geometry.coordinates[0],
               location :  body.features[0].place_name
           })
       }
    })
   }

   module.exports = geocode 