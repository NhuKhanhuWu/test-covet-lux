/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  items: [],
  status: "succeeded",
  error: null,
  priceFilter: [0, 99999999999],
  categoryFilter: "",
  titleFilter: "",
  page: 1,
  hasMore: true,
};

// Thunk to fetch products based on filters
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (_, { getState }) => {
    // get filter
    const state = getState().products;

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
    return { data: response.data, hasMore: response.data.length > 0 }; // Return filtered data from the API
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
    editPrice: (state, action) => {
      state.priceFilter = action.payload;
    },
    increasePage: (state) => {
      state.page++; //increase page when user scroll
    },
    // reset when filter change
    resetProducts: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.data]; // Update the state with filtered products
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  editCategory,
  editPrice,
  editTitle,
  increasePage,
  resetProducts,
} = productsSlice.actions;
productsSlice.reducer;
export default productsSlice;
