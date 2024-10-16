/** @format */
import styles from "./FormPage.module.css";

function FormPage({ backgroundImg, children, elClass }) {
  return (
    <div className={`${styles.formContainer} ${elClass}`}>
      <img
        src={backgroundImg}
        alt="background"
        className={`img ${styles.img}`}></img>

      <div className={styles.form}>{children}</div>
    </div>
  );
}

export default FormPage;
