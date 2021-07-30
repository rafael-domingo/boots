import { createSlice } from "@reduxjs/toolkit";

export const tripBuilderSlice = createSlice({
    name: 'TripBuilder',
    initialState: {
        city: '',
        autoComplete: [],
        selectedCity: {},
        selectedCityLocation: '',
        transportation: '',
        autoBuild: '',
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
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload
        },
        setAutoComplete: (state, action) => {
            state.autoComplete = action.payload
        },
        setSelectedCity: (state, action) => {
            state.selectedCity = action.payload
        },
        setSelectedCityLocation: (state, action) => {
            state.selectedCityLocation = action.payload
        },
        setTransportation: (state, action) => {
            state.transportation = action.payload
        },
        setAutoBuild: (state, action) => {
            state.autoBuild = action.payload
        },
        setTimeDay: (state, action) => {
            state.timeDay = action.payload
        },
        setActivities: (state, action) => {
            state.activities = action.payload
        }
    }
})

export const {
    setCity,
    setAutoComplete,
    setSelectedCity,
    setSelectedCityLocation,
    setTransportation,
    setAutoBuild,
    setTimeDay,
    setActivities
} = tripBuilderSlice.actions;
export default tripBuilderSlice.reducer