import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BASE_URL,
  SUCCESS,
  FAILURE,
  ERROR,
  IDLE,
  FULFILLED,
} from "../../constants/constants";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getTypeCatThunk = createAsyncThunk(
  "/home/getTypeCat",
  async (data) => {
    console.log("slice", data);
    try {
      const res = await axios.post(`${BASE_URL}/home/getTypeCat`, data);
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
    category: [],
  },
  status: {
    getTypeCatThunk: IDLE,
  },
};

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getTypeCatThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getTypeCatThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.category = payload.data;
            state.loading = false;
            state.status.getTypeCatThunk = FULFILLED;
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
      .addCase(getTypeCatThunk.rejected, (state, action) => {
        state.status.getTypeCatThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default homeSlice.reducer;
export const { clearErrorSlice } = homeSlice.actions;
