/** @format */
import PropTypes from "prop-types";
import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { editCategory } from "../../redux/productsSlide";
import { useDispatch } from "react-redux";

// function handleCategoryFilter() {}

function ProductItem({ product }) {
  // filter product by category
  const dispatch = useDispatch();

  return (
    <Link to={`/test-covet-lux/product?product_id=${product.id}`}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img
            alt={product.title}
            src={product?.images[0]?.replace("[", "").replace('"', "")}
            className="img"
            loading="lazy"></img>
          <img
            alt={product.title}
            src={product?.images[1]?.replace("[", "").replace('"', "")}
            className="img"
            loading="lazy"></img>
        </div>

        <p className={styles.title}>{product.title}</p>
        <p className={styles.descr}>{product.description.slice(0, 50)}[...]</p>

        <div>
          <Link
            onClick={() => dispatch(editCategory(product.category.id))}
            to={`/test-covet-lux/products/`}
            // ?categoryId=${product.category.id}
            className="link">
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
