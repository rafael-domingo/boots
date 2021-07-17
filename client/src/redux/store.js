import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from './user';

export default configureStore({
    reducer: {
        user: userSliceReducer
    }
})