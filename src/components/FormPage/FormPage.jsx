/** @format */
import styles from "./FormPage.module.css";

function FormPage({ children, elClass }) {
  return (
    <div className={`${styles.formContainer} ${elClass}`}>
      <div className={styles.form}>{children}</div>
    </div>
  );
}

export default FormPage;
