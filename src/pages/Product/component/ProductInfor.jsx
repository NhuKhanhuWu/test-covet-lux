/** @format */

import styles from "../ProductDetail.module.css";
import MediaQuery from "react-responsive";

export function ProductInfor({ product }) {
  return (
    <>
      <div>
        <h1>{product.title}</h1>
        <div style={{ margin: "0.5rem 0" }}>
          ⭐⭐⭐⭐⭐ (5.0) | 100 sold | 2 reviews
        </div>
        <MediaQuery maxWidth={650}>100 sold | 2 reviews</MediaQuery>
      </div>

      <p className={`orange-text ${styles.price}`}>
        ${product.price}{" "}
        <span style={{ textDecoration: "line-through" }}>
          ${product.price * 1.25}
        </span>
      </p>
      <p className={styles.shipment}>Return in 15 days</p>
      <p className={styles.shipment}>Send from: Linh Trung, Thu Duc</p>
    </>
  );
}
