/** @format */
import styles from "../Checkout.module.css";
import FlexContainer from "../../../components/FlexContainer";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <tr className={styles.product}>
      <td>
        <FlexContainer margin={0} gap={1}>
          <img
            alt={product.title}
            src={product.images[0].replace("[", "").replace('"', "")}
            className={`img`}
            style={{ width: "9rem" }}
            loading="lazy"></img>
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
