import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserInfo from "../slices/UserInfo";

const rootReducer = combineReducers({
  UserInfo: UserInfo,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});