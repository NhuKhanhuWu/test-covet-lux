/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  items: [],
  status: "succeeded",
  error: null,
  priceFilter: ["", ""],
  categoryFilter: "",
  titleFilter: "",
  page: 1,
};

// Thunk to fetch products based on filters
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (_, { getState }) => {
    // get filter
    const state = getState().products;
    // console.log(state);

    // Build query string based on filter criteria
    const { categoryFilter, priceFilter, titleFilter, page } = state;
    const query = `?categoryId=${categoryFilter}&price_min=${
      priceFilter[0]
    }&price_max=${priceFilter[1]}&title=${titleFilter}&offset=${
      (page - 1) * 12
    }&limit=12`;

    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${query}`
    );
    return response.data; // Return filtered data from the API
  }
);

// Product slice
const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    editTitle: (state, action) => {
      state.titleFilter = action.payload;
    },
    editCategory: (state, action) => {
      state.categoryFilter = action.payload;
    },
    ceditPrice: (state, action) => {
      state.priceFilter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Update the state with filtered products
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { editCategory, ceditPrice, editTitle } = productsSlice.actions;
productsSlice.reducer;
export default productsSlice;
