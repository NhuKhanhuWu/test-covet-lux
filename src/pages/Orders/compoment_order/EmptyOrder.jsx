/** @format */

import { Link } from "react-router-dom";
import emptyBox from "../../../../public/empty-box.png";
import styles from "../Orders.module.css";

export function EmptyOrder() {
  return (
    <div className={styles.emptyMessage}>
      <img
        alt="empty box"
        src={emptyBox}
        style={{ width: "35%" }}
        loading="lazy"></img>
      <p>There is no order yet!</p>
      <Link to="/covet-lux-fake-api/products?page=1" className={`border-btn`}>
        Go shopping{" "}
        <ion-icon
          name="arrow-forward-outline"
          style={{ fontSize: "2rem" }}></ion-icon>
      </Link>
    </div>
  );
}
