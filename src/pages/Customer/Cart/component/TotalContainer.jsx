/** @format */

import styles from "../Cart.module.css";

export function TotalContainer({ children }) {
  return (
    <table className={`${styles.productContainer} ${styles.totalTable}`}>
      <tr className={styles.tableHeader}>
        <th>TOTAL</th>

        <th></th>
      </tr>
      {children}
    </table>
  );
}
