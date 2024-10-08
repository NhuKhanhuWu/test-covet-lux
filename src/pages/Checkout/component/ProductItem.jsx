/** @format */
import styles from "../Checkout.module.css";
import FlexContainer from "../../../components/FlexContainer";

export default function ProductItem({ product }) {
  return (
    <tr>
      <td>
        <FlexContainer margin={0} gap={1}>
          <img
            alt={product.title}
            src={product.images[0]}
            className={`img`}
            style={{ width: "9rem" }}
            loading="lazy"></img>
          <div
            className={`columnContent ${styles.productTxt}`}
            style={{ width: "60%" }}>
            <p>{product.title}</p>
            <p>X{product.amount}</p>
            <p>${product.price}</p>
          </div>
        </FlexContainer>
      </td>
      <td className={styles.productTxt}>${product.amount * product.price}</td>
    </tr>
  );
}
