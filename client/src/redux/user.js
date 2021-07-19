import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        username: {},
        profilePicture: {},
        tripList: {},
        currentTrip: [],
        tripBuilder: {
            city: '',
            transportation: '',
            autoBuild: false,
            timeDay: {
                morning: false,
                midDay: false,
                evening: false
            },
            activities: {
                eat: false,
                shop: false,
                caffeinate: false,
                sightsee: false,
                drink: false
            },
        },
        locationDetail: {},
        searchTerm: {},
        searchResults: {},
    },
    reducers: {
        setUserName: (state, action) => {
            state.username = action.payload
        },
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload
        },
        setTripList: (state, action) => {
            state.tripList = action.payload
        },
        setCurrentTrip: (state, action) => {
            state.currentTrip.push(action.payload)
        },
        setTripBuilder: (state, action) => {
            state.tripBuilder = action.payload
        },
        setLocationDetail: (state, action) => {
            state.locationDetail = action.payload
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        }

    }
})

export const { 
    setUserName, 
    setProfilePicture, 
    setTripList, 
    setCurrentTrip, 
    setTripBuilder, 
    setLocationDetail, 
    setSearchTerm,
    setSearchResults
} = userSlice.actions;
export default userSlice.reducer