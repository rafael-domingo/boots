import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from './user';
import tripBuilderReducer from './tripBuilder';
import currentTripReducer from './currentTrip';

export default configureStore({
    reducer: {
        user: userSliceReducer,
        tripBuilder: tripBuilderReducer,
        currentTrip: currentTripReducer
    }
})