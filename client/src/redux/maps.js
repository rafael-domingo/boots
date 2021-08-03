import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
    name: 'Map',
    initialState: {
        cityLocationArray: [],
        tripLocationArray: [],
        searchLocationArray: [],
        windowWidth: '',
        directions: false,
        center: {},
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
} = mapSlice.actions;
export default mapSlice.reducer