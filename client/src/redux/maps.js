import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
    name: 'Map',
    initialState: {
        cityLocationArray: [],
        tripLocationArray: [],
        searchLocationArray: [],
        windowWidth: true,
        directions: false,
        transportation: 'DRIVING',
        center: {},
        zoom: 5,
        fitBounds: true,
        cityLocation: {
            lat: 37.7726611,
            lng: -100.0603993
        }
    },
    reducers: {
        setCityLocationArray: (state, action) => {
            state.cityLocationArray = action.payload
        },
        setTripLocationArray: (state, action) => {
            state.tripLocationArray = action.payload
        },
        setSearchLocationArray: (state, action) => {
            state.searchLocationArray = action.payload
        },
        setWindowWidth: (state, action) => {
            state.windowWidth = action.payload
        },
        setDirections: (state, action) => {
            state.directions = action.payload
        },
        setCenter: (state, action) => {
            state.center = action.payload
        },
        setZoom: (state, action) => {
            state.zoom = action.payload
        },
        setFitBounds: (state, action) => {
            state.fitBounds = action.payload
        },
        setTransportation: (state, action) => {
            state.transportation = action.payload
        },
        setCityLocation: (state, action) => {
            state.cityLocation = action.payload
        }
    
    }
})

export const {
    setCityLocationArray,
    setTripLocationArray,
    setSearchLocationArray,
    setWindowWidth,
    setDirections,
    setCenter,
    setZoom,
    setFitBounds,
    setTransportation,
    setCityLocation
} = mapSlice.actions;
export default mapSlice.reducer