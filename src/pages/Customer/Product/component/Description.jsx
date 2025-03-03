/** @format */

import styles from "../ProductDetail.module.css";

export function Description({ product, showedEl }) {
  return (
    <div
      className={`${styles.description} ${
        showedEl === "descipt" ? "" : "hidden"
      }`}>
      <p>{product.description}</p>
    </div>
  );
}
