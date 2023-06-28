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

export const addCategoryThunk = createAsyncThunk(
  "/admin/addCategory",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/addCategory`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getCategoryThunk = createAsyncThunk(
  "/admin/getCategory",
  async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getCategory`);
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
    addedCategory: {},
    allCategory: [],
  },
  status: {
    addCategoryThunk: IDLE,
    getCategoryThunk: IDLE,
  },
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(addCategoryThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addCategoryThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.addedCategory = payload.data;
            state.successData.message = payload.message;
            state.loading = false;
            state.updateDone = !state.updateDone;
            state.status.addCategoryThunk = FULFILLED;
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
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.status.addCategoryThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getCategoryThunk==============================================================================================================================
      .addCase(getCategoryThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getCategoryThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.allCategory = payload.data;
            state.loading = false;
            state.status.getCategoryThunk = FULFILLED;
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
      .addCase(getCategoryThunk.rejected, (state, action) => {
        state.status.getCategoryThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default adminSlice.reducer;
export const { clearErrorSlice } = adminSlice.actions;
