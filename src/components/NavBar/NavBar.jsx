/** @format */

import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../../public/logo-no-background.png";

function NavBar() {
  let avatar;
  if (localStorage.getItem("user")) {
    avatar = JSON.parse(localStorage.getItem("user")).avatar;
  }

  return (
    <nav className={styles.nav}>
      <Link to="/test-covet-lux">
        <img alt="covet-lux" src={logo} className={styles.logo}></img>
      </Link>

      <ul className={styles.navLink}>
        <li>
          <Link to="/test-covet-lux">HOME PAGE</Link>
        </li>
        <li>
          <Link to="/test-covet-lux/products?page=1">PRODUCT</Link>
        </li>
        <li>
          <Link to="/test-covet-lux/blog">BLOG</Link>
        </li>
        <li>
          <Link to="/test-covet-lux/contact">CONTACT</Link>
        </li>
        <li>
          <Link to="/test-covet-lux/infor">INFOR</Link>
        </li>
      </ul>

      <ul className={styles.navLogo}>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <button>
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
        <Link to="/test-covet-lux/cart">
          <ion-icon name="cart-outline"></ion-icon>
        </Link>

        {/* display differen el when login/not login */}
        {avatar ? (
          <Link to="/test-covet-lux/account">
            <img
              src={avatar}
              alt="avatar"
              className={`img ${styles.avatar}`}></img>
          </Link>
        ) : (
          <Link to="/test-covet-lux/login" className={styles.loginLink}>
            LOGIN
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
