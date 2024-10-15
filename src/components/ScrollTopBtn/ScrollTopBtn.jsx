/** @format */
import styles from "./ScrollTopBtn.module.css";

function ScrollTopBtn() {
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
