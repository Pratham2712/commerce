import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "../slices/UserInfoSlice.js";

const rootReducer = combineReducers({
  UserInfoSlice: UserInfoSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
