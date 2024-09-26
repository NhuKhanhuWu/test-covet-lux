/** @format */
import Loader from "./Loader/Loader";

function RenderQueryData({ children, isLoading, isError, isEmptyList = true }) {
  return (
    <>
      {isLoading && <Loader></Loader>}
      {!isLoading && !isError && isEmptyList && "not found"}
      {!isLoading && !isError && !isEmptyList && children}
      {isError && "error"}
    </>
  );
}

export default RenderQueryData;
