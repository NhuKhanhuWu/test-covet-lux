/** @format */

import { useEffect, useState } from "react";

function useGetData(query) {
  const [dataResponse, setDataResponse] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");

  useEffect(
    function () {
      async function fetchData() {
        const isNullQuery = query.includes("null");

        if (!isNullQuery) {
          try {
            setLoading(true); //start loading
            setError("");

            // try get data
            const response = await fetch(
              `https://api.escuelajs.co/api/v1/${query}`
            );
            // console.log(`https://api.escuelajs.co/api/v1/${query}`);

            const data = await response.json();
            setDataResponse(data);
          } catch (err) {
            setError(err.message); //set error if there is
          } finally {
            setLoading(false); //stop loading
          }
        }
      }

      fetchData();
    },
    [query, setDataResponse]
  );
  return { dataResponse, isLoading, isError };
}

export default useGetData;
