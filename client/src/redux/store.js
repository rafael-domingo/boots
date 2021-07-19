import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from './user';
import tripBuilderReducer from './tripBuilder';

export default configureStore({
    reducer: {
        user: userSliceReducer,
        tripBuilder: tripBuilderReducer
    }
})