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

export const checkUsernameThunk = createAsyncThunk(
  "/auth/checkUser",
  async (data) => {
    console.log("slice", data);
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
    userInfo: [],
    userName: false,
  },
  status: {
    loginThunk: IDLE,
    checkUsernameThunk: IDLE,
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    setCustomAlert: (state, action) => {
      state.isError = false;
      state.errorData = {};
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
            state.data.userInfo = payload.data.userInfo;
            state.loading = false;
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
            state.data.userName = payload.data;
            state.loading = false;
            state.status.checkUsernameThunk = FULFILLED;
            break;
          case SUCCESS:
            state.data.userName = payload.data;
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
      });
  },
});

export default userInfoSlice.reducer;
