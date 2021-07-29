require('dotenv').config();
const yelp = require('yelp-fusion');
const yelp_api_key = process.env.YELP_API_KEY;
const client = yelp.client(yelp_api_key);

const express = require('express');
const router = express.Router();

router.post('/search', async (req, res) => {
    const searchTerm = req.body.searchTerm;
    const location = req.body.city;
    client.search({
        term: searchTerm,
        location: location,
       
      }).then(response => {
        console.log('search');
        res.json(response.jsonBody);
      }).catch(e => {
        console.log(e);
      });
})

router.get('/detail', async (req, res) => {
    
})

router.post('/autocomplete', async (req, res) => {
    const searchTerm = req.body.searchTerm;
    console.log(searchTerm)
    client.autocomplete({
        text: searchTerm
      }).then(response => {
        console.log('autocomplete')
        console.log(response.jsonBody);
      }).catch(e => {
        console.log(e);
      });
})
module.exports = router;