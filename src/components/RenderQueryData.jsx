/** @format */
import Loader from "./Loader/Loader";

function RenderQueryData({
  children,
  isLoading,
  isError,
  isEmptyList = true,
  renderError = false,
  emptyMess = null,
}) {
  return (
    <>
      {isLoading && <Loader></Loader>}
      {!isLoading &&
        !isError &&
        isEmptyList &&
        // !renderError &&
        (emptyMess !== null ? emptyMess : "No result")}
      {!isLoading && !isError && !isEmptyList && children}
      {isError && "error"}
    </>
  );
}

export default RenderQueryData;
