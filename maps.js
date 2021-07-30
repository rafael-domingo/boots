require('dotenv').config();
const {Client} = require("@googlemaps/google-maps-services-js");

const express = require('express');
const router = express.Router();
const google_key = process.env.GOOGLE_MAPS_API_KEY;
const client = new Client({});


router.post('/autocomplete', async (req, res) => {
    const searchTerm = req.body.searchTerm;
    const sessionToken = req.body.sessionToken;
    client.placeAutocomplete({
        params: {
            input: searchTerm,
            key: google_key,
            sessiontoken: sessionToken,
            types: '(cities)'
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(e => {
        console.log(e);
    })
})

router.post('/placeDetails', async (req, res) => {
    const placeId = req.body.placeId;
    const sessionToken = req.body.sessionToken;
    client.placeDetails({
        params: {
            place_id: placeId,
            key: google_key,
            sessiontoken: sessionToken
        }
    })
    .then(response => {
        res.json(response.data)
    })
    .catch(e => {
        console.log(e)
    })

})
module.exports = router;