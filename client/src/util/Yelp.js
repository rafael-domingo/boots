import fetch from 'node-fetch';

export const Yelp = {
    search(searchTerm, location) {
        return fetch('http://localhost:5000/yelp/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchTerm: searchTerm,
                latitude: location.lat,
                longitude: location.lng
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
        
    },

    buildTrip(location, timeDay, activities) {      
        
        // define search terms based on trip builder inputs        
        var intineraryArray = [
            {
                food: timeDay.morning ? 'breakfast' : null,               
                activity: activities.caffeinate ? 'coffee' : null 
            },
            {
                food: timeDay.midDay ? 'lunch' : null,
                activity: activities.sightsee ? 'tourist' : null
            },
            {
                food: timeDay.midDay ? 'snack' : null,
                activity: activities.shop ? 'shopping' : null
            },
            {
                food: timeDay.evening ? 'dinner': null,
                activity: activities.drink ? 'cocktails' : null
            }
        ];

        // build search term array based on trip builder inputs
        var searchTermArray = [];
        intineraryArray.map(section => {
            if (section.food !== null) {
                searchTermArray.push(section.food)
            }
            if (section.activity !== null) {
                searchTermArray.push(section.activity)
            }
        })


        console.log(searchTermArray);
    }
}