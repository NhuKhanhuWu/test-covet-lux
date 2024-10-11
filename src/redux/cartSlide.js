/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initState = {
  productArray: [],
};

const cartSlide = createSlice({
  name: "cartSlide",
  initialState: initState,
  reducers: {
    addToCart: (state, action) => {
      // check if product already in cart
      const existingItem = state.productArray.find(
        (item) => item.id === action.payload.id
      );

      // if in array
      if (existingItem !== undefined) {
        // if reach amount limit
        if (existingItem.amount + action.payload.amount > 20) return state;

        // if not reach limit
        existingItem.amount += action.payload.amount;
      }
      // if not in array
      else {
        state.productArray.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.productArray = state.productArray.filter(
        (product) => product.id !== action.payload.id
      );
    },

    changeAmount: (state, action) => {
      // check if product already in cart
      const existingItem = state.productArray.find(
        (item) => item.id == action.payload.id
      );

      // increase amount
      existingItem.amount = action.payload.amount;
    },

    reset: (state) => {
      state.productArray = initState.productArray;
    },
  },
});

export const { addToCart, removeFromCart, changeAmount, reset } =
  cartSlide.actions;
export default cartSlide;
