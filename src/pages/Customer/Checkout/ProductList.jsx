/** @format */
import ProductItem from "./component/ProductItem";
import styles from "./Checkout.module.css";

export default function ProductList({ productList }) {
  return (
    <table className={`${styles.table} ${styles.productInfor}`}>
      <thead>
        <tr style={{ textAlign: "left", marginBottom: "2rem" }}>
          <th>Product</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {productList.map((product, i) => (
          <ProductItem product={product} key={`product-${i}`}></ProductItem>
        ))}
      </tbody>
    </table>
  );
}
