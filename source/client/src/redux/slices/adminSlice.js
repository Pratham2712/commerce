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
  data: {},
  status: {
    addCategoryThunk: IDLE,
  },
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builders) => {},
});

export default adminSlice.reducer;
