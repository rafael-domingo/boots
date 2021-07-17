require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const {Client} = require("@googlemaps/google-maps-services-js");
const yelp = require('yelp-fusion');
const yelp_api_key = process.env.YELP_API_KEY;
const client = yelp.client(yelp_api_key);
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const path = require('path')

var google_api_key = process.env.GOOGLE_MAPS_API_KEY;
client.search({
    term: 'Four Barrel Coffee',
    location: 'san francisco, ca',
  }).then(response => {
    console.log(response.jsonBody.businesses);
  }).catch(e => {
    console.log(e);
  });
// Google Maps Places API
// async function makeRequest() {
//     try {
//         const neighborhood = 'chelsea'
//         const borough = 'manhattan'
//         const city = 'new+york+city'
//         const category = 'burgers'
//         const {data} = await axios.get(
        
//      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${borough}+${city}&type=restaurant&key=${google_api_key}`
//         )
//         console.log(data.results)
//         } 
//       catch (err) {
//        console.log(err)
//      }
// }

// makeRequest()
app.listen(port, () => console.log(`Server started on ${port}`));
