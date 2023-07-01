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

export const addSubThunk = createAsyncThunk(
  "/admin/addSubcategory",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/addSubcategory`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteSubThunk = createAsyncThunk(
  "/admin/deleteSubcategory",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/deleteSubcategory`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const deleteCatThunk = createAsyncThunk(
  "/admin/deleteCategory",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/deleteCategory`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const getCatbyType = createAsyncThunk(
  "/admin/getcategory",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/getcategory`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addProductThunk = createAsyncThunk(
  "/admin/addproduct",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/addproduct`, data);

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
    isSuccess: false,
  },
  isError: false,
  data: {
    addedCategory: {},
    allCategory: [],
    categoryData: [],
  },
  status: {
    addCategoryThunk: IDLE,
    getCategoryThunk: IDLE,
    addSubThunk: IDLE,
    deleteSubThunk: IDLE,
    deleteCatThunk: IDLE,
    getCatbyType: IDLE,
    addProductThunk: IDLE,
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
    clearSuccessMsg: (state) => {
      state.successData.message = "";
      state.successData.isSuccess = false;
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
      })
      //addSubThunk==============================================================================================================================
      .addCase(addSubThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addSubThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.updateDone = !state.updateDone;
            state.status.addSubThunk = FULFILLED;
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
      .addCase(addSubThunk.rejected, (state, action) => {
        state.status.getCategoryThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //deleteSubThunk==============================================================================================================================
      .addCase(deleteSubThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteSubThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.updateDone = !state.updateDone;
            state.status.deleteSubThunk = FULFILLED;
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
      .addCase(deleteSubThunk.rejected, (state, action) => {
        state.status.deleteSubThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //deleteCatThunk==============================================================================================================================
      .addCase(deleteCatThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteCatThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.updateDone = !state.updateDone;
            state.status.deleteCatThunk = FULFILLED;
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
      .addCase(deleteCatThunk.rejected, (state, action) => {
        state.status.deleteCatThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //deleteCatThunk==============================================================================================================================
      .addCase(getCatbyType.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getCatbyType.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.data.categoryData = payload.data;
            state.status.getCatbyType = FULFILLED;
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
      .addCase(getCatbyType.rejected, (state, action) => {
        state.status.getCatbyType = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //addProductThunk==============================================================================================================================
      .addCase(addProductThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addProductThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.successData.message = payload.message;
            state.successData.isSuccess = !state.successData.isSuccess;
            state.status.addProductThunk = FULFILLED;
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
      .addCase(addProductThunk.rejected, (state, action) => {
        state.status.addProductThunk = ERROR;
        state.loading = false;
        state.errorData = action.error;
      });
  },
});

export default adminSlice.reducer;
export const { clearErrorSlice, clearSuccessMsg } = adminSlice.actions;
