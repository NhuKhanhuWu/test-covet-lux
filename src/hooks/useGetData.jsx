/** @format */

import { useEffect, useState } from "react";

function useGetData(query) {
  const [dataList, setDataList] = useState([]);
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
            `https://api.escuelajs.co/api/v1/${query}`
          );
          const data = await response.json();
          setDataList(data);
          setError("");
        } catch (err) {
          setError(err.message); //set error if there is
        } finally {
          setLoading(false); //stop loading
        }
      }

      fetchData();
    },
    [query, setDataList]
  );
  return { dataList, isLoading, isError };
}

export default useGetData;
