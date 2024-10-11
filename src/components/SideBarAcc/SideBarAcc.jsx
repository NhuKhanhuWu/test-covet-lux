/** @format */

import { NavLink } from "react-router-dom";
import styles from "./SideBarAcc.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/userSlide";

function SideBarAcc() {
  const dispatch = useDispatch();
  function handleLogout() {
    // log out
    dispatch(logOut());

    // redirect to homepage
    window.location.href = "/test-covet-lux";
  }

  return (
    <div className={styles.container}>
      <NavLink to="/test-covet-lux/account">Account</NavLink>
      {/* <NavLink to="/test-covet-lux/change_pass">Change password</NavLink> */}
      <NavLink to="/test-covet-lux/orders">Orders</NavLink>
      <NavLink to="/test-covet-lux/logout" onClick={() => handleLogout()}>
        Log out
      </NavLink>
    </div>
  );
}

export default SideBarAcc;
