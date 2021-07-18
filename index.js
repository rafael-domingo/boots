require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const {Client} = require("@googlemaps/google-maps-services-js");
const yelp = require('./yelp');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(express.json());
app.use('/yelp', yelp);

// var google_api_key = process.env.GOOGLE_MAPS_API_KEY;




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
