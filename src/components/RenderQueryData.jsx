/** @format */
import IconLoader from "./Loader/IconLoader.jsx";
import NoResult from "./NoResult/NoResult.jsx";

function RenderQueryData({
  children,
  isLoading,
  isError,
  isEmptyList = true,
  emptyMess = false,
  loading = true,
}) {
  const mtyMessage = emptyMess || <NoResult></NoResult>;

  return (
    <>
      {loading && isLoading && <IconLoader></IconLoader>}
      {!isLoading && !isError && isEmptyList && mtyMessage}
      {!isLoading && !isError && !isEmptyList && children}
      {isError && "error"}
    </>
  );
}

export default RenderQueryData;
