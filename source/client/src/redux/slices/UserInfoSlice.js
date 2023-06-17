import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BASE_URL,
  SUCCESS,
  FAILURE,
  ERROR,
  IDLE,
} from "../../constants/constants";
import axios from "axios";

export const getNumberThunk = createAsyncThunk(
  "/auth/get_phone",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/get_phone`, data);
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
  isError: false,
  isLogin: false,
  data: {
    phoneNumber: "",
  },
  status: {
    getNumberThunk: IDLE,
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getNumberThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getNumberThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.phoneNumber = payload.data.phoneNumber;
            state.loading = false;
            break;
          default:
            state.isError = true;
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(getNumberThunk.rejected, (state, action) => {
        state.status.getNumberThunk = ERROR;
        state.loading = false;
        state.errorData = action.error.message;
      });
  },
});

export default userInfoSlice.reducer;
