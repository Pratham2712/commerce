import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "../slices/UserInfoSlice.js";
import adminSlice from "../slices/adminSlice.js";

const rootReducer = combineReducers({
  UserInfoSlice: UserInfoSlice,
  adminSlice: adminSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
