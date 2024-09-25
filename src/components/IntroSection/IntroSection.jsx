/** @format */
import { Link } from "react-router-dom";
import styles from "./IntroSection.module.css";

function IntroSection({ header, content, url = null }) {
  return (
    <div className={styles.introContainer}>
      <h2>{header}</h2>
      <p>{content}</p>

      {url !== null && (
        <Link to={url} className="border-btn">
          See more
        </Link>
      )}
    </div>
  );
}

export default IntroSection;
