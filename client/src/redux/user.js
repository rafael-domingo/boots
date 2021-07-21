import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        username: {},
        profilePicture: {},
        tripList: [
            {
                name: 'Baton Rouge',
                location: {
                    lat: 30.441455,
                    lng: -91.181458
                },
                trip: []
            },
            {
                name: 'New Orleans',
                location: {
                    lat: 30.0329779,
                    lng: -89.9526028
                },
                trip: []
            }
        ],
        currentTrip: [],       
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
    setLocationDetail, 
    setSearchTerm,
    setSearchResults
} = userSlice.actions;
export default userSlice.reducer