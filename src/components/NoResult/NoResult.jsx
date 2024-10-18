/** @format */
import styles from "./NoResult.module.css";

function NoResult() {
  return (
    <div className={styles.container}>
      <span className={`material-symbols-outlined ${styles.icon}`}>
        search_off
      </span>
      <span className={styles.txt}>No result found</span>
    </div>
  );
}

export default NoResult;
