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

export const getColorThunk = createAsyncThunk(
  "/filter/getColor",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/filter/getColor`, data);
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
    color: [],
  },
  status: {
    getColorThunk: IDLE,
  },
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      //getColorThunk======================================================================================================
      .addCase(getColorThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getColorThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.data.color = payload.data;
            state.status.getColorThunk = FULFILLED;
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
      .addCase(getColorThunk.rejected, (state, action) => {
        state.status.getColorThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default filterSlice.reducer;
export const { clearErrorSlice } = filterSlice.actions;
