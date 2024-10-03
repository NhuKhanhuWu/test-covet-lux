/** @format */
import styles from "./FormPage.module.css";

function FormPage({ backgroundImg, children }) {
  return (
    <div className={styles.formContainer}>
      <img src={backgroundImg} alt="background" className="img"></img>

      <div className={styles.form}>{children}</div>
    </div>
  );
}

export default FormPage;
