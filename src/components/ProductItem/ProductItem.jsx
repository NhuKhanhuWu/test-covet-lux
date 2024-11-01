/** @format */
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { editCategory } from "../../redux/productsSlide";
import Img from "../Img";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  return (
    <Link to={`/test-covet-lux/product?product_id=${product.id}`}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Img
            alt={product.title}
            imgSrc={product.images[0]}
            elClass={"img"}></Img>
          <Img
            alt={product.title}
            imgSrc={product.images[1]}
            elClass={"img"}></Img>
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
