/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  user: {},
};

// Product slice
const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logOut: () => {
      return INITIAL_STATE;
    },
    signUp: (state, action) => {
      state.priceFilter = action.payload;
    },
  },
});

export const { loginSuccess, logOut, signUp } = userSlice.actions;
userSlice.reducer;
export default userSlice;
