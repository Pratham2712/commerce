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

export const createOrderThunk = createAsyncThunk(
  "/order/createOrder",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/order/createOrder`, data);
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
    currentOrder: {},
  },
  status: {
    createOrderThunk: IDLE,
  },
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      //createOrderThunk======================================================================================================
      .addCase(createOrderThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.data.currentOrder = payload.data;
            state.status.createOrderThunk = FULFILLED;
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
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.status.createOrderThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default orderSlice.reducer;
export const { clearErrorSlice } = orderSlice.actions;
