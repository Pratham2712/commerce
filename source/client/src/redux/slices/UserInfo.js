import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {},
});

export default userInfoSlice.reducer;