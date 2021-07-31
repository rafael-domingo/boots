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
        const morning = timeDay.morning;
        const midDay = timeDay.midDay;
        const evening = timeDay.evening;
        const eat = activities.eat;
        const shop = activities.shop;
        const caffeinate = activities.caffeinate;
        const sightsee = activities.sightsee;
        const drink = activities.drink;

        var tripArray = [];
        var foodSearchArray = [];
        var searchArray = [];
        if (eat) {
            if (morning) {
                foodSearchArray.push({
                    time: 'morning',
                    term: 'breakfast'
                })
            }
            if (midDay) {
                foodSearchArray.push({
                    time: 'midday',
                    term: 'lunch'
                })
            }
            if (evening) {
                foodSearchArray.push({
                    time: 'evening',
                    term: 'dinner'
                })
            }
        }      
        if (shop) {
            searchArray.push('shopping')
        }
        if (caffeinate) {
            searchArray.push('coffee')
        }
        if (sightsee) {
            searchArray.push('tourist')
        }
        if (drink) {
            searchArray.push('cocktails')
        }


        console.log(tripArray);
    }
}