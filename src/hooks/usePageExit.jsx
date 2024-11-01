/** @format */

import { useEffect } from "react";

function usePageExit(callback) {
  useEffect(() => {
    window.addEventListener("beforeunload", callback);

    return () => {
      window.removeEventListener("beforeunload", callback);
    };
  }, [callback]);
}

export default usePageExit;
