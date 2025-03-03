/** @format */

import { useEffect } from "react";
import styles from "../Cart.module.css";

export function TotalDetail({ totalCost, setTotalMoney, totalMoney }) {
  const shippingFee = totalCost >= 100 ? 0 : 10;
  const shipMessage =
    shippingFee > 0 ? `($${100 - totalCost} more to get free shipment)` : "";

  useEffect(
    function () {
      setTotalMoney(totalCost + shippingFee);
    },
    [setTotalMoney, shippingFee, totalCost]
  );
  return (
    <>
      <tr>
        <td>Sub-total</td>
        <td>${totalCost}</td>
      </tr>
      <tr>
        <td>Shipping fee</td>
        <td>
          ${shippingFee}{" "}
          <p className="gray-text" style={{ fontSize: "1.4rem" }}>
            {shipMessage}
          </p>
        </td>
      </tr>
      <tr>
        <td>Total</td>
        <td className={styles.total}>${totalMoney}</td>
      </tr>
    </>
  );
}
