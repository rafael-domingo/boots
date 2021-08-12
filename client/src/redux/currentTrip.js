import { createSlice } from "@reduxjs/toolkit";

export const currentTripSlice = createSlice({
    name: 'CurrentTrip',
    initialState: {
        name: '',
        city: '',
        coordinates: {},
        destinations: [],
        searchTerm: {},
        searchResults: {},
        autoCompleteResults: {},
        autoComplete: false
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
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
        }
    }
})

export const {
    setName,
    setCity,
    setCoordinates,
    setDestinations,
    addDestinations,
    setSearchTerm,
    setSearchResults,
    setAutoCompleteResults,
    setAutoComplete
} = currentTripSlice.actions;
export default currentTripSlice.reducer