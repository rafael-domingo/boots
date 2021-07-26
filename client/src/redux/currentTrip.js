import { createSlice } from "@reduxjs/toolkit";

export const currentTripSlice = createSlice({
    name: 'CurrentTrip',
    initialState: {
        name: '',
        city: '',
        coordinates: {},
        destinations: [],
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
    }
})

export const {
    setName,
    setCity,
    setCoordinates,
    setDestinations,
    addDestinations
} = currentTripSlice.actions;
export default currentTripSlice.reducer