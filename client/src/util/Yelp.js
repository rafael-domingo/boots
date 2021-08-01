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

    async buildTrip(location, timeDay, activities) {      
        
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

        // call Yelp API to populate trip array
        var tripArray = [];
        // create timer to rate-limit call to Yelp API
        const timer = ms => new Promise(res => setTimeout(res, ms))
        // async function to call Yelp API
        const searchYelp = async (searchTermArray) => {
            for (let index = 0; index < searchTermArray.length; index++) {
                const term = searchTermArray[index];
                this.search(term, location)
                .then(response => {
                   tripArray.push(response.businesses[0])
                    
                })
                await timer(1000);
                
            }
            return tripArray
        }
        // call async function 
        const array = await searchYelp(searchTermArray)
            
        return array;
    },


}