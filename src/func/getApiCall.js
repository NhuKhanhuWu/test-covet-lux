/** @format */

async function getApiCall(query) {
  let dataResponse = null;
  let isLoading = false;
  let error = false;

  const isNullQuery = query.includes("null");

  if (!isNullQuery) {
    try {
      isLoading = true;

      // try get data
      const response = await fetch(`https://api.escuelajs.co/api/v1/${query}`);
      // console.log(`https://api.escuelajs.co/api/v1/${query}`);

      const data = await response.json();
      dataResponse = data;
    } catch (err) {
      error = err; //set error if there is
    } finally {
      isLoading = false; //stop loading
    }
  }

  return { dataResponse, isLoading, error };
}

export default getApiCall;
