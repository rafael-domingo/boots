import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
    name: 'Map',
    initialState: {
        locationArray: [],
        windowWidth: '',
        directions: false,
        center: {},
    },
    reducers: {
        setLocationArray: (state, action) => {
            state.locationArray = action.payload
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
    setLocationArray,
    setWindowWidth,
    setDirections,
    setCenter,
} = mapSlice.actions;
export default mapSlice.reducer