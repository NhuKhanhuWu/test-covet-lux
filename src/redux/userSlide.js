/** @format */

import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: {},
};

// Product slice
const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => {
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

export const { login, logOut, signUp } = userSlice.actions;
userSlice.reducer;
export default userSlice;
