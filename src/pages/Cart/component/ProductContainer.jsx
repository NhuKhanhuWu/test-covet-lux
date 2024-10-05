/** @format */

import styles from "../Cart.module.css";

export function ProductContainer({ children }) {
  return (
    <table className={styles.productContainer}>
      <tbody>
        <tr className={styles.tableHeader}>
          {/* <th></th> */}
          <th>PRODUCT</th>
          <th></th>
          <th>PRICE</th>
          <th>AMOUNT</th>
          <th>TOTAL</th>
          <th></th>
        </tr>
        {children}
      </tbody>
    </table>
  );
}
