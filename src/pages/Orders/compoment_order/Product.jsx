/** @format */
import FlexContainer from "../../../components/FlexContainer";
import styles from "../Orders.module.css";

export function Product({ product }) {
  return (
    <FlexContainer margin={2} gap={1} elClass={`${styles.product} gray-text`}>
      <img
        alt={product.title}
        src={product?.images[0]?.replace("[", "").replace('"', "")}
        style={{ width: "7rem" }}></img>

      <div className={styles.productText}>
        <p className={styles.title}>{product.title}</p>
        <p>X{product.amount}</p>
        <p>${product.price}</p>
      </div>

      <p className={styles.price}>${product.price * product.amount}</p>
    </FlexContainer>
  );
}
