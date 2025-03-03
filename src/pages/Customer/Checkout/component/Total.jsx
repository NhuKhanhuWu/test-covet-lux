/** @format */
import styles from "../Checkout.module.css";

export default function Total({ total }) {
  const deliverFee = total >= 100 ? 0 : 5;
  return (
    <table className={`${styles.table} ${styles.productTxt} ${styles.total}`}>
      <tbody>
        <tr>
          <td>Sub-total</td>
          <td>${total}</td>
        </tr>
        <tr>
          <td>Shipping fee</td>
          <td>${deliverFee}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>${deliverFee + total}</td>
        </tr>
      </tbody>
    </table>
  );
}
