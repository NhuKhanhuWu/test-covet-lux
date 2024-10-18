/** @format */
import Loader from "./Loader/Loader";
// import NoResult from "./NoResult/Noresult";

function RenderQueryData({
  children,
  isLoading,
  isError,
  isEmptyList = true,
  emptyMess = null,
  loading = true,
}) {
  return (
    <>
      {loading && isLoading && <Loader></Loader>}
      {!isLoading &&
        !isError &&
        isEmptyList &&
        (emptyMess !== null ? emptyMess : "Mo result")}
      {!isLoading && !isError && !isEmptyList && children}
      {isError && "error"}
    </>
  );
}

export default RenderQueryData;
