import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "../slices/UserInfoSlice.js";
import adminSlice from "../slices/adminSlice.js";
import homeSlice from "../slices/homeSlice.js";

const rootReducer = combineReducers({
  UserInfoSlice: UserInfoSlice,
  adminSlice: adminSlice,
  homeSlice: homeSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
