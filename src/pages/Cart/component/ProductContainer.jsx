/** @format */

import MediaQuery from "react-responsive";
import styles from "../Cart.module.css";

export function ProductContainer({ children }) {
  return (
    <table className={styles.productContainer}>
      <tbody>
        <MediaQuery minWidth={601}>
          <tr className={styles.tableHeader}>
            {/* <th></th> */}
            <th>PRODUCT</th>
            <th></th>
            <th>PRICE</th>
            <th>AMOUNT</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </MediaQuery>

        <MediaQuery maxWidth={600} minWidth={461}>
          <tr className={styles.tableHeader}>
            {/* <th></th> */}
            <th>PRODUCT</th>
            <th></th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </MediaQuery>

        <MediaQuery maxWidth={460}>
          <tr className={styles.tableHeader}>
            {/* <th></th> */}
            <th>PRODUCT</th>
            <th></th>
            <th>TOTAL</th>
          </tr>
        </MediaQuery>
        {children}
      </tbody>
    </table>
  );
}
