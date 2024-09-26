/** @format */

import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../../public/logo-no-background.png";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link to="/test-covet-lux">
        <img alt="covet-lux" src={logo} className={styles.logo}></img>
      </Link>

      <ul className={styles.navLink}>
        <li>
          <NavLink to="/test-covet-lux">HOME PAGE</NavLink>
        </li>
        <li>
          <NavLink to="/test-covet-lux/products?page=1">PRODUCT</NavLink>
        </li>
        <li>
          <NavLink to="/test-covet-lux/blog">BLOG</NavLink>
        </li>
        <li>
          <NavLink to="/test-covet-lux/contact">CONTACT</NavLink>
        </li>
        <li>
          <NavLink to="/test-covet-lux/infor">INFOR</NavLink>
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
        <Link to="/test-covet-lux/account">
          <ion-icon name="person-outline"></ion-icon>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;
