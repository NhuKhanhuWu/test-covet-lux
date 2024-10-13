/** @format */
import styles from "./PageIntro.module.css";

function PageIntro({ header, paragraph }) {
  return (
    <div className={styles.intro}>
      <h1>{header}</h1>
      <p>{paragraph}</p>
      <div className={styles.introBorder}></div>
    </div>
  );
}

export default PageIntro;
