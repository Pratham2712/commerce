import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BASE_URL,
  SUCCESS,
  ERROR,
  IDLE,
  FULFILLED,
} from "../../constants/constants";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getCartPageThunk = createAsyncThunk(
  "/cart/getcartpage",
  async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cart/getcartpage`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const initialState = {
  loading: false,
  updateDone: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  successData: {
    message: "",
  },
  isError: false,
  data: {
    cart: [],
  },
  status: {
    getCartPageThunk: IDLE,
  },
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getCartPageThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getCartPageThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.data.cart = payload.data;
            state.status.getCartPageThunk = FULFILLED;
            break;
          default:
            state.data.cart = [];
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(getCartPageThunk.rejected, (state, action) => {
        state.status.getCartPageThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default cartSlice.reducer;
export const { clearErrorSlice } = cartSlice.actions;
