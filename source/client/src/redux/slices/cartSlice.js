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

export const deleteCartThunk = createAsyncThunk(
  "/cart/delete",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/cart/delete`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const updateSizeThunk = createAsyncThunk(
  "/cart/updatesize",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/cart/updatesize`, data);
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
    deleteCartThunk: IDLE,
    updateSizeThunk: IDLE,
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
      })
      //deleteCartThunk======================================================================================================
      .addCase(deleteCartThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteCartThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.updateDone = !state.updateDone;
            state.status.deleteCartThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(deleteCartThunk.rejected, (state, action) => {
        state.status.deleteCartThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //updateSizeThunk======================================================================================================
      .addCase(updateSizeThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(updateSizeThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.updateDone = !state.updateDone;
            state.status.updateSizeThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(updateSizeThunk.rejected, (state, action) => {
        state.status.updateSizeThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default cartSlice.reducer;
export const { clearErrorSlice } = cartSlice.actions;
