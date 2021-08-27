import { createSlice } from "@reduxjs/toolkit";

export const currentTripSlice = createSlice({
    name: 'CurrentTrip',
    initialState: {
        name: '',
        city: '',
        tripId: '',
        coordinates: {},
        destinations: [],
        searchTerm: {},
        searchResults: {},
        autoCompleteResults: [],
        autoComplete: false,
        travelTime: [],
        tripBuilder: {}
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        setTripId: (state, action) => {
            state.tripId = action.payload
        },
        setCoordinates: (state, action) => {
            state.coordinates = action.payload
        },
        setDestinations: (state, action) => {
            state.destinations = action.payload
        },
        addDestinations: (state, action) => {
            state.destinations.push(action.payload)
        },
        removeDestinations: (state, action) => {
            return {
                ...state,
                destinations: state.destinations.filter(item => item.id !== action.payload.id)
            }
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        },
        setAutoCompleteResults: (state, action) => {
            state.autoCompleteResults = action.payload
        },
        setAutoComplete: (state, action) => {
            state.autoComplete = action.payload
        },
        setTravelTime: (state, action) => {
            state.travelTime = action.payload
        },
        setTripBuilder: (state, action) => {
            state.tripBuilder = action.payload
        }
    }
})

export const {
    setName,
    setCity,
    setTripId,
    setCoordinates,
    setDestinations,
    addDestinations,
    removeDestinations,
    setSearchTerm,
    setSearchResults,
    setAutoCompleteResults,
    setAutoComplete,
    setTravelTime,
    setTripBuilder
} = currentTripSlice.actions;
export default currentTripSlice.reducer