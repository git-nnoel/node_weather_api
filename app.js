const fetch = require('node-fetch');
function location(place){
  fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+ place + '.json?access_token=pk.eyJ1IjoiaGVucmlxMzAwIiwiYSI6ImNrNTF6Zm9hOTBpMjUza3BtcGR5NGl2Z2EifQ.tmb0t7zBhWaILkrw3UkHhw&limit=1')
    .then(res => res.json())
    .then(data => {
      try{
      const latitude = data.features[0].geometry.coordinates[1]
      const longitude = data.features[0].geometry.coordinates[0]
      const url = ('https://api.darksky.net/forecast/d0e5f4f38b3c87decd85866eae84b68c/' + latitude + ',' + longitude + '?units=si')
      weather(url)
    }
    catch(e){
      console.log("place not found")
    }
    });
  }

function weather(url){
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("in " + data.timezone + ": " + data.currently.temperature + " celsius degrees")});
    }

if (process.argv[2] !== undefined){
const place = process.argv[2].replace(" ", "+").toLowerCase();
location(place);
}
