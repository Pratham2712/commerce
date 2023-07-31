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

export const addToCartThunk = createAsyncThunk(
  "/home/addtocart",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/home/addtocart`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getAllCartThunk = createAsyncThunk(
  "/home/getallcart",
  async () => {
    try {
      const res = await axios.get(`${BASE_URL}/home/getallcart`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateCartThunk = createAsyncThunk(
  "/home/updatecart",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/home/updatecart`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const addWishlistThunk = createAsyncThunk(
  "/home/addwishlist",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/home/addwishlist`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getWishlistThunk = createAsyncThunk(
  "/home/getwishlist",
  async () => {
    try {
      const res = await axios.get(`${BASE_URL}/home/getwishlist`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const initialState = {
  loading: false,
  updateDone: false,
  wishUpdate: false,
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
    cart: {
      id: "",
      list: {},
      totalCart: 0,
    },
    wishlist: {},
  },
  status: {
    getTypeCatThunk: IDLE,
    getProductThunk: IDLE,
    getProductDetailThunk: IDLE,
    addToCartThunk: IDLE,
    getAllCartThunk: IDLE,
    updateCartThunk: IDLE,
    addWishlistThunk: IDLE,
    getWishlistThunk: IDLE,
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
      })
      //addToCartThunk======================================================================================================
      .addCase(addToCartThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.updateDone = !state.updateDone;
            state.successData.message = payload.message;
            state.status.addToCartThunk = FULFILLED;
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
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.status.addToCartThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getAllCartThunk======================================================================================================
      .addCase(getAllCartThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getAllCartThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.data.cart.list = payload.data;
            state.data.cart.id = payload.id;
            state.data.cart.totalCart = payload.total;
            state.status.addToCartThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.data.cart.list = [];
            state.data.cart.totalCart = 0;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(getAllCartThunk.rejected, (state, action) => {
        state.status.getAllCartThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //updateCartThunk======================================================================================================
      .addCase(updateCartThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(updateCartThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.updateDone = !state.updateDone;
            state.status.updateCartThunk = FULFILLED;
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
      .addCase(updateCartThunk.rejected, (state, action) => {
        state.status.updateCartThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //addWishlistThunk======================================================================================================
      .addCase(addWishlistThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addWishlistThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.wishUpdate = !state.wishUpdate;
            state.status.addWishlistThunk = FULFILLED;
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
      .addCase(addWishlistThunk.rejected, (state, action) => {
        state.status.addWishlistThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getWishlistThunk======================================================================================================
      .addCase(getWishlistThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getWishlistThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.data.wishlist = payload.data;
            state.status.getWishlistThunk = FULFILLED;
            break;
          default:
            state.data.wishlist = {};
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(getWishlistThunk.rejected, (state, action) => {
        state.status.getWishlistThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default homeSlice.reducer;
export const { clearErrorSlice } = homeSlice.actions;
