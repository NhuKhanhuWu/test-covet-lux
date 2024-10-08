/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initState = {
  orderArray: [],
};

const orderSlide = createSlice({
  name: "orderSlide",
  initialState: initState,
  reducers: {
    addOrder: (state, action) => {
      state.orderArray.unshift(action.payload);
    },

    changeStatus: (state, action) => {
      //   find order
      let changedOrder = state.orderArray.find(
        (order) => order.id === action.id
      );

      //   change status
      changedOrder.status = action.status;
    },
  },
});

export const { addOrder, changeStatus } = orderSlide.actions;
export default orderSlide;
