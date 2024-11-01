/** @format */
import { Link } from "react-router-dom";

import styles from "../Orders.module.css";
import FlexContainer from "../../../components/FlexContainer";
import Img from "../../../components/Img.jsx";

export function Product({ product }) {
  return (
    <FlexContainer margin={2} gap={1} elClass={`${styles.product} gray-text`}>
      <Img
        alt={product.title}
        imgSrc={product?.images[0]}
        elClass={styles.productImg}></Img>

      <div className={styles.productText}>
        <Link
          to={`/test-covet-lux/product?product_id=${product.id}`}
          className={styles.title}>
          {product.title}
        </Link>
        <p>X{product.amount}</p>
        <p>${product.price}</p>
      </div>

      <p className={styles.price}>${product.price * product.amount}</p>
    </FlexContainer>
  );
}
