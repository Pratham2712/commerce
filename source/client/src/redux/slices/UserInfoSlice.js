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

export const checkUsernameThunk = createAsyncThunk(
  "/auth/checkUser",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/checkUser`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const loginThunk = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const checkUserLoginThunk = createAsyncThunk(
  "/auth/token_login",
  async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/token_login`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const signupThunk = createAsyncThunk("auth/signup", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

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
  isLogin: false,
  data: {
    userInfo: [],
    userExist: false,
  },
  status: {
    loginThunk: IDLE,
    checkUsernameThunk: IDLE,
    checkUserLoginThunk: IDLE,
    signupThunk: IDLE,
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
    changeUserExist: (state) => {
      state.data.userExist = false;
    },
    clearSuccessMsg: (state) => {
      state.successData.message = "";
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(loginThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.userInfo = payload.data.data;
            state.successData.message = payload.data.message;
            state.loading = false;
            state.isLogin = true;
            state.status.loginThunk = FULFILLED;
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
      .addCase(loginThunk.rejected, (state, action) => {
        state.status.loginThunk = ERROR;
        state.loading = false;
        state.errorData = action.error.message;
      })
      //checkUsernameThunk===============================================================================================
      .addCase(checkUsernameThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(checkUsernameThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case FAILURE:
            state.data.userExist = payload.data;
            state.loading = false;
            state.status.checkUsernameThunk = FULFILLED;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
          case SUCCESS:
            state.data.userExist = payload.data;
            state.loading = false;
            state.status.checkUsernameThunk = FULFILLED;
          default:
            //state.isError = true;
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(checkUsernameThunk.rejected, (state, action) => {
        state.status.checkUsernameThunk = ERROR;
        state.loading = false;
        state.errorData = action.error.message;
      })
      //checkUserLoginThunk===============================================================================================
      .addCase(checkUserLoginThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(checkUserLoginThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.userInfo = payload.data;
            state.successData.message = payload.data.message;
            state.loading = false;
            state.isLogin = true;
            state.status.checkUserLoginThunk = FULFILLED;
            break;
          default:
            state.isLogin = false;
            state.loading = false;
            state.errorData = {
              //message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(checkUserLoginThunk.rejected, (state, action) => {
        state.status.checkUserLoginThunk = ERROR;
        state.loading = false;
        state.errorData = action.error.message;
      })
      //signupThunk===============================================================================================
      .addCase(signupThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(signupThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.userInfo = payload.data;
            state.successData.message = payload.data.message;
            state.loading = false;
            state.isLogin = true;
            state.status.signupThunk = FULFILLED;
            break;
          default:
            state.isLogin = false;
            state.loading = false;
            state.isError = true;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status.signupThunk = ERROR;
        state.loading = false;
        state.errorData = action.error.message;
      });
  },
});

export default userInfoSlice.reducer;
export const { clearErrorSlice, changeUserExist, clearSuccessMsg } =
  userInfoSlice.actions;
