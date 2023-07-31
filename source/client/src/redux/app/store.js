import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "../slices/UserInfoSlice.js";
import adminSlice from "../slices/adminSlice.js";
import homeSlice from "../slices/homeSlice.js";
import cartSlice from "../slices/cartSlice.js";
import orderSlice from "../slices/orderSlice.js";

const rootReducer = combineReducers({
  UserInfoSlice: UserInfoSlice,
  adminSlice: adminSlice,
  homeSlice: homeSlice,
  cartSlice: cartSlice,
  orderSlice: orderSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
