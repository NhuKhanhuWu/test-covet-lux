/** @format */
import Loader from "./Loader/Loader";

function RenderQueryData({
  children,
  isLoading,
  isError,
  isEmptyList = true,
  renderError = false,
  emptyMessChil = null,
}) {
  return (
    <>
      {isLoading && <Loader></Loader>}
      {!isLoading && !isError && isEmptyList && !renderError && "No result"}
      {/* {!isLoading && !isError && isEmptyList && emptyMessChil} */}
      {!isLoading && !isError && !isEmptyList && children}
      {isError && "error"}
    </>
  );
}

export default RenderQueryData;
