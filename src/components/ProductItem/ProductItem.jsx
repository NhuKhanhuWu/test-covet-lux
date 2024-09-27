/** @format */
import PropTypes from "prop-types";
import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <Link to={`/test-covet-lux/product?product_id=${product.id}`}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img
            alt={product.title}
            src={product?.images[0]?.replace("[", "").replace('"', "")}
            className="img"></img>
          <img
            alt={product.title}
            src={product?.images[1]?.replace("[", "").replace('"', "")}
            className="img"></img>
        </div>

        <p className={styles.title}>{product.title}</p>
        <p className={styles.descr}>{product.description.slice(0, 50)}[...]</p>

        <div>
          <Link
            to={`/test-covet-lux/products/?categoryId=${product.category.id}&page=1`}
            className={styles.categoryTag}>
            {product.category.name}
          </Link>{" "}
          | <span className={styles.price}>${product.price}</span>
        </div>
      </div>
    </Link>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default ProductItem;
