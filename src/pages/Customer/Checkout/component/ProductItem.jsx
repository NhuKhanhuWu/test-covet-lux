/** @format */
import styles from "../Checkout.module.css";
import FlexContainer from "../../../../components/FlexContainer";
import { Link } from "react-router-dom";
import Img from "../../../../components/Img.jsx";

export default function ProductItem({ product }) {
  return (
    <tr className={styles.product}>
      <td>
        <FlexContainer margin={0} gap={1}>
          <Img
            alt={product.title}
            elClass={`img ${styles.productImg}`}
            imgSrc={product.images[0]}></Img>
          <div
            className={`columnContent ${styles.productTxt}`}
            style={{ width: "60%" }}>
            <Link to={`/test-covet-lux/product?product_id=${product.id}`}>
              {product.title}
            </Link>
            <p>X{product.amount}</p>
            <p>${product.price}</p>
          </div>
        </FlexContainer>
      </td>
      <td className={styles.productTxt}>${product.amount * product.price}</td>
    </tr>
  );
}
