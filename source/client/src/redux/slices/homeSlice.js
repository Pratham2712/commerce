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

export const getTypeCatThunk = createAsyncThunk(
  "/home/getTypeCat",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/home/getTypeCat`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getProductThunk = createAsyncThunk(
  "/home/getproduct",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/home/getproduct`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getProductDetailThunk = createAsyncThunk(
  "/home/getProductDetail",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/home/getProductDetail`, data);
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
    products: [],
    male: [],
    female: [],
    kids: [],
    total: 0,
    productDetail: {},
  },
  status: {
    getTypeCatThunk: IDLE,
    getProductThunk: IDLE,
    getProductDetailThunk: IDLE,
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
      })
      //getProductThunk======================================================================================================
      .addCase(getProductThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getProductThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.products = payload.data;
            state.data.total = payload.total;
            state.loading = false;
            state.status.getProductThunk = FULFILLED;
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
      .addCase(getProductThunk.rejected, (state, action) => {
        state.status.getProductThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getProductDetailThunk======================================================================================================
      .addCase(getProductDetailThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getProductDetailThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.productDetail = payload.data;
            state.loading = false;
            state.status.getProductDetailThunk = FULFILLED;
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
      .addCase(getProductDetailThunk.rejected, (state, action) => {
        state.status.getProductDetailThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default homeSlice.reducer;
export const { clearErrorSlice } = homeSlice.actions;
