/** @format */

async function getApi(path) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(path);
        console.log(response);

        if (!response.ok) {
          reject({
            status: response.status,
            message: `Error ${response.status}: ${response.statusText}`,
          });
          return;
        }

        const data = await response.json(); // Extract JSON data
        resolve(data);
      } catch (err) {
        reject({ status: 500, message: "Network Error", error: err.message });
      }
    }, 1000); // Simulate network delay
  });
}

export default getApi;
