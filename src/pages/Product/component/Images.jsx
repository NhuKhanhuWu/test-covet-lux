/** @format */

import styles from "../ProductDetail.module.css";

/** @format */
export function Images({ product }) {
  return (
    <div className={styles.productImg}>
      {product.images &&
        product.images.map((img, i) => (
          <img
            className="img"
            key={`img-${i}`}
            alt={product.title}
            src={product?.images[i]?.replace("[", "").replace('"', "")}></img>
        ))}
    </div>
  );
}
