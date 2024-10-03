/** @format */

function useGetLocal(key) {
  const localString = localStorage.getItem(key);
  const value = localString !== null ? JSON.parse(localString) : null;

  return value;
}

export default useGetLocal;
