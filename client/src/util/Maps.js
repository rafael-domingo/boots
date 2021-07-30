import fetch from 'node-fetch';
require('dotenv').config();

export const Maps = {
    autoComplete(searchTerm, sessionToken) {
       return fetch('http://localhost:5000/maps/autocomplete', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               searchTerm: searchTerm,
               sessionToken: sessionToken
           })
       })
       .then(response => response.json())
       .then(data => data)

    },

    placeDetails(placeId, sessionToken) {
        return fetch('http://localhost:5000/maps/placeDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                placeId: placeId,
                sessionToken: sessionToken
            })
        })
        .then(response => response.json())
        .then(data => data)
    }
}