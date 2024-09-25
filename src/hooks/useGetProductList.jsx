/** @format */

import { useEffect, useState } from "react";

function useGetProductList(query) {
  const [productList, setProductList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");

  useEffect(
    function () {
      async function fetchData() {
        try {
          setLoading(true); //start loading
          setError("");

          // try get data
          const response = await fetch(
            `https://api.escuelajs.co/api/v1/products${query}`
          );
          const data = await response.json();
          setProductList(data);
          setError("");
        } catch (err) {
          setError(err.message); //set error if there is
        } finally {
          setLoading(false); //stop loading
        }
      }

      fetchData();
    },
    [query, setProductList]
  );
  return { productList, isLoading, isError };
}

export default useGetProductList;
