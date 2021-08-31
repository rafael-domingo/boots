require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const {Client} = require("@googlemaps/google-maps-services-js");
const yelp = require('./yelp');
const maps = require('./maps');
const port = process.env.PORT || 5000;
const path = require('path')
const app = express();
app.use(cors());

app.use(express.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/yelp', yelp);
app.use('/maps', maps);


// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(port, () => console.log(`Server started on ${port}`));
