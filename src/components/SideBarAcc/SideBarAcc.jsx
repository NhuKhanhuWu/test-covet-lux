/** @format */

import { NavLink } from "react-router-dom";
import styles from "./SideBarAcc.module.css";

function SideBarAcc() {
  return (
    <div className={styles.container}>
      <NavLink to="/test-covet-lux/account">Account</NavLink>
      <NavLink to="/test-covet-lux/password">Change password</NavLink>
      <NavLink to="/test-covet-lux/orders">Orders</NavLink>
    </div>
  );
}

export default SideBarAcc;
