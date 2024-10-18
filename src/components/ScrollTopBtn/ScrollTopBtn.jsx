/** @format */
import styles from "./ScrollTopBtn.module.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollTopBtn() {
  // scroll to top when load page
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Runs every time the path changes

  // scroll to top when click btn
  function handleScrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <button className={styles.btn} onClick={() => handleScrollToTop()}>
      <span className="material-symbols-outlined">arrow_upward</span>
    </button>
  );
}

export default ScrollTopBtn;
