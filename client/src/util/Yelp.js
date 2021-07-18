import fetch from 'node-fetch';

export const Yelp = {
    search(searchTerm) {
        return fetch('http://localhost:5000/yelp/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchTerm: searchTerm
            })
        })
        .then(response => response.json())
        .then(data => data)
    },

    detail() {
        
    },

    autoComplete(searchTerm) {
        if (searchTerm.length > 1) {
            return fetch('http://localhost:5000/yelp/autocomplete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchTerm: searchTerm
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
        }
        
    }
}