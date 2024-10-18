/** @format */
import Loader from "./Loader/Loader";
import NoResult from "./NoResult/NoResult.jsx";

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
        (emptyMess !== null ? emptyMess : <NoResult></NoResult>)}
      {!isLoading && !isError && !isEmptyList && children}
      {isError && "error"}
    </>
  );
}

export default RenderQueryData;
