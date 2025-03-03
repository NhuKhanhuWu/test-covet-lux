/** @format */

import styles from "../ProductDetail.module.css";
import { Reviews } from "./Reviews";

export function DesciptionAndReviewsBtn({ setShowedEl, showedEl }) {
  return (
    <div className={styles.btnContainer}>
      <button
        onClick={() => {
          setShowedEl("descipt");
        }}
        className={showedEl === "descipt" ? "orange-text" : ""}>
        DESCRIPTION
      </button>
      <span>|</span>
      <button
        onClick={() => {
          setShowedEl("reviews");
        }}
        className={showedEl === "reviews" ? "orange-text" : ""}>
        REVIEWS
      </button>
    </div>
  );
}
