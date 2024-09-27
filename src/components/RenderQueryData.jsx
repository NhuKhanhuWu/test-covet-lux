/** @format */
import Loader from "./Loader/Loader";

function RenderQueryData({
  children,
  isLoading,
  isError,
  isEmptyList = true,
  renderError = false,
}) {
  return (
    <>
      {isLoading && <Loader></Loader>}
      {!isLoading && !isError && isEmptyList && renderError ? "not found" : ""}
      {!isLoading && !isError && !isEmptyList && children}
      {isError && "error"}
    </>
  );
}

export default RenderQueryData;
