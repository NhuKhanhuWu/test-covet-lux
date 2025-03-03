/** @format */

import { Link } from "react-router-dom";
import emptyCart from "../../../../../public/empty-cart.svg";
import styles from "../Cart.module.css";

export function EmptyCart() {
  return (
    <div className={`columnContent ${styles.emtyContainer}`}>
      <img alt="empty cart" src={emptyCart} className={styles.emtyImg}></img>
      <p className={styles.emptyTxt}>Your cart is empty</p>
      <Link to="/test-covet-lux/products?page=1" className={`border-btn`}>
        Go shopping{" "}
        <ion-icon
          name="arrow-forward-outline"
          style={{ fontSize: "2rem" }}></ion-icon>
      </Link>
    </div>
  );
}
