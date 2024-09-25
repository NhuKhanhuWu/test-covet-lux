/** @format */
import PropTypes from "prop-types";
import styles from "./ProductItem.module.css";

function ProductItem({ product }) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img alt={product.title} src={product.images[0]} className="img"></img>
        <img alt={product.title} src={product.images[1]} className="img"></img>
      </div>

      <p className={styles.title}>{product.title}</p>
      <div className={styles.price}>${product.price}</div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
