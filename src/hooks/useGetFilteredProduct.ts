/** @format */

import axios from "axios";

export const useGetFilteredProduct = async (
  category,
  priceMin,
  priceMax,
  title
) => {
  // Build query string based on filter criteria
  const query = `?categoryId=${category}&price_min=${priceMin}&price_max=${priceMax}&title=${title}`;

  const response = await axios.get(
    `https://api.escuelajs.co/api/v1/products/${query}`
  );
  return response.data; // Return filtered data from the API
};
