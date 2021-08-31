import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        username: '',
        email: '',
        phone: '',
        uid: '',
        profilePicture: '',
        tripList: [
            // {
            //     name: 'Baton Rouge',
            //     location: {
            //         lat: 30.441455,
            //         lng: -91.181458
            //     },
            //     trip: [
            //         {
            //             id: 'CeTmU-WrauNGIFD7J9nnuA',
            //             alias: 'city-roots-coffee-bar-baton-rouge',
            //             name: 'City Roots Coffee Bar',
            //             image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/6obQLf5WhM0s5rGM0FEmgQ/o.jpg',
            //             is_closed: false,
            //             url: 'https://www.yelp.com/biz/city-roots-coffee-bar-baton-rouge?adjust_creative=EO6vk8hfahjo0A-BbnDCWw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=EO6vk8hfahjo0A-BbnDCWw',
            //             review_count: 55,
            //             categories: [
            //                 {
            //                     alias: 'coffee',
            //                     title: 'Coffee & Tea'
            //                 },
            //             ],
            //             rating: 4.5,
            //             coordinates: {
            //                 latitude: 30.444314635723746,
            //                 longitude: -91.17240908158148
            //             },
            //             transactions: [],
            //             price: '$',
            //             location: {
            //                 address1: '1509 Government St',
            //                 address2: '',
            //                 address3: null,
            //                 city: 'Baton Rouge',
            //                 zip_code: '70802',
            //                 country: 'US',
            //                 state: 'LA'
            //             },
            //             display_address: [
            //                 '1509 Government St',
            //                 'Baton Rouge, LA 70802'
            //             ],
            //             phone: '+12252564991',
            //             display_phone: '(225) 256-4991',
            //             distance: 8003.440545339997
            //         },
            //         {
            //             id: 'rBL71Quf8-XqXIK3oaqcqQ',
            //             alias: 'french-truck-coffee-baton-rouge-2',
            //             name: 'French Truck Coffee',
            //             image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/nU_vTfKxU23imlctyS6MUg/o.jpg',
            //             is_closed: false,
            //             url: 'https://www.yelp.com/biz/french-truck-coffee-baton-rouge-2?adjust_creative=EO6vk8hfahjo0A-BbnDCWw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=EO6vk8hfahjo0A-BbnDCWw',
            //             review_count: 102,
            //             categories: [
            //                 {
            //                     alias: 'coffee',
            //                     title: 'Coffee & Tea'
            //                 },
            //                 {
            //                     alias: 'cafes',
            //                     title: 'Cafes'
            //                 }
            //             ],
            //             rating: 4.5,
            //             coordinates: {
            //                 latitude: 30.44382,
            //                 longitude: -91.15825
            //             },
            //             transactions: [
            //                 'delivery'
            //             ],
            //             price: '$',
            //             location: {
            //                 address1: '2978 Government St',
            //                 address2: '',
            //                 address3: null,
            //                 city: 'Baton Rouge',
            //                 zip_code: '70806',
            //                 country: 'US',
            //                 state: 'LA'
            //             },
            //             display_address: [
            //                 '2978 Government St',
            //                 'Baton Rouge, LA 70806'
            //             ],
            //             phone: '+12254067776',
            //             display_phone: '(225) 406-7776',
            //             distance: 6730.552261693972
            //         },
            //         {
            //             id: 'j23WAA_FsDWHWrxRbvVIdg',
            //             alias: 'brq-restaurant-baton-rouge',
            //             name: 'BRQ Restaurant',
            //             image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/BlzaU2_kxu5NrptwHvabGg/o.jpg',
            //             is_closed: false,
            //             url: 'https://www.yelp.com/biz/brq-restaurant-baton-rouge?adjust_creative=EO6vk8hfahjo0A-BbnDCWw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=EO6vk8hfahjo0A-BbnDCWw',
            //             review_count: 369,
            //             categories: [
            //                 {
            //                     alias: 'bbq',
            //                     title: 'Barbeque'
            //                 },
            //                 {
            //                     alias: 'seafood',
            //                     title: 'Seafood'
            //                 },
            //                 {
            //                     alias: 'beergardens',
            //                     title: 'Beer Gardens'
            //                 }
            //             ],
            //             rating: 4,
            //             coordinates: {
            //                 latitude: 30.40909,
            //                 longitude: -91.06704
            //             },
            //             transactions: [
            //                 'pickup',
            //                 'delivery'
            //             ],
            //             price: '$$',
            //             location: {
            //                 address1: '10423 Jefferson Hwy',
            //                 address2: null,
            //                 address3: '',
            //                 city: 'Baton Rouge',
            //                 zip_code: '70809',
            //                 country: 'US',
            //                 state: 'LA'
            //             },
            //             display_address: [
            //                 '10423 Jefferson Hwy',
            //                 'Baton Rouge, LA 70809'
            //             ],
            //             phone: '+12253722674',
            //             display_phone: '(225) 372-2674',
            //             distance: 2837.3819121736424
            //         },
            //     ],
            //     tripBuilder: {
            //         city: '',
            //         autoComplete: [],
            //         selectedCity: {},
            //         selectedCityLocation: '',
            //         transportation: 'DRIVING',
            //         autoBuild: '',
            //         timeDay: {
            //             morning: false,
            //             midDay: false,
            //             evening: false
            //         },
            //         activities: {
            //             eat: false,
            //             shop: false,
            //             caffeinate: false,
            //             sightsee: false,
            //             drink: false
            //         },
            //     }
            // },
            // {
            //     name: 'New Orleans',
            //     location: {
            //         lat: 30.0329779,
            //         lng: -89.9526028
            //     },
            //     trip: [],
            //     tripBuilder: {
            //         city: '',
            //         autoComplete: [],
            //         selectedCity: {},
            //         selectedCityLocation: '',
            //         transportation: 'DRIVING',
            //         autoBuild: '',
            //         timeDay: {
            //             morning: false,
            //             midDay: false,
            //             evening: false
            //         },
            //         activities: {
            //             eat: false,
            //             shop: false,
            //             caffeinate: false,
            //             sightsee: false,
            //             drink: false
            //         },
            //     }
            // },
            // {
            //     name: 'New York City',
            //     location: {
            //         lat: 40.6974034,
            //         lng: -74.1197618
            //     },
            //     trip: [],
            //     tripBuilder: {
            //         city: '',
            //         autoComplete: [],
            //         selectedCity: {},
            //         selectedCityLocation: '',
            //         transportation: 'DRIVING',
            //         autoBuild: '',
            //         timeDay: {
            //             morning: false,
            //             midDay: false,
            //             evening: false
            //         },
            //         activities: {
            //             eat: false,
            //             shop: false,
            //             caffeinate: false,
            //             sightsee: false,
            //             drink: false
            //         },
            //     }
            // }
        ],
        locationDetail: {},
        view : 'Home'
    },
    reducers: {
        setUserName: (state, action) => {
            state.username = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setUid: (state, action) => {
            state.uid = action.payload
        },
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload
        },
        setTripList: (state, action) => {
            state.tripList = action.payload
        },          
        setLocationDetail: (state, action) => {
            state.locationDetail = action.payload
        },       
        setView: (state, action) => {
            state.view = action.payload
        },
        updateTripList: (state, action) => {
            // object destructuring from payload
            const {name, tripId, destinations, tripBuilder} = action.payload;
            console.log(destinations)
            console.log(name)
            // set a new trip list array 
            const tripListArray = state.tripList.map((item) => {
                // check to see what city to update
                if (item.tripId !== tripId) {
                    return item
                }
                // if found city, update necessary info
                return {
                    ...item,                 
                    trip: destinations,
                    tripBuilder: tripBuilder
                }
            })
            // return state with updated trip list
            return {
                ...state,
                tripList: tripListArray
            }
        },
        addTripList: (state, action) => {
            const {name, tripId, coordinates, destinations, tripBuilder} = action.payload;
            state.tripList.push({
                name: name,
                tripId: tripId,
                location: coordinates,
                trip: destinations,
                tripBuilder: tripBuilder
            })
        },
        deleteTrip: (state, action) => {
            const newTripListArray = [];
            state.tripList.map((item) => {
                if (item.tripId !== action.payload) {
                    newTripListArray.push(item)
                }
            })
            return {
                ...state,
                tripList: newTripListArray
            }
        }
    }
})

export const { 
    setUserName, 
    setEmail,
    setPhone,
    setUid,
    setProfilePicture, 
    setTripList, 
    setLocationDetail, 
    setView,
    updateTripList,
    addTripList,
    deleteTrip
} = userSlice.actions;
export default userSlice.reducer