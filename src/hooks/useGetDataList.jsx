/** @format */

import { useEffect, useState } from "react";

function useGetDataList(query, idList) {
  const [dataResponse, setDataResponse] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");

  useEffect(
    function () {
      async function fetchData() {
        try {
          setLoading(true); //start loading
          setError("");

          // try get data
          const dataPromises = idList.map(async (id) => {
            const response = await fetch(
              `https://api.escuelajs.co/api/v1/${query}/${id}`
            );
            // console.log(`https://api.escuelajs.co/api/v1/${query}/${id}`);

            if (!response.ok) {
              throw new Error(`Failed to fetch product with ID: ${id}`);
            }

            return response.json();
          });

          // Wait for all promises to resolve
          const data = await Promise.all(dataPromises);
          setDataResponse(data);
        } catch (err) {
          setError(err.message); //set error if there is
        } finally {
          setLoading(false); //stop loading
        }
      }

      fetchData();
    },
    [query]
  );
  return { dataResponse, isLoading, isError };
}

export default useGetDataList;
