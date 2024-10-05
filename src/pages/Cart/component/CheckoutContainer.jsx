/** @format */

import { Link } from "react-router-dom";
import styles from "../Cart.module.css";

export function CheckoutContainer() {
  return (
    <>
      <Link
        to={"/test-covet-lux/checkout"}
        className={`fill-btn ${styles.checkoutBtn}`}>
        Checkout
      </Link>
    </>
  );
}
