import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        username: {},
        profilePicture: {},
        tripList: {},
        currentTrip: {},
        tripBuilder: {
            city: '',
            transportationn: '',
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
            state.currentTrip = action.payload
        },
        setTripBuilder: (state, action) => {
            state.tripBuilder = action.payload
        },
        setLocationDetail: (state, action) => {
            state.locationDetail = action.payload
        }

    }
})

export const { setUserName, setProfilePicture, setTripList, setCurrentTrip, setTripBuilder, setLocationDetail } = userSlice.actions;
export default userSlice.reducer