/** @format */

import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <img
          alt="covet-lux"
          src="../../public/logo-no-background.svg"
          className={styles.logo}></img>
      </Link>

      <ul className={styles.navLink}>
        <li>
          <NavLink to="/">HOME PAGE</NavLink>
        </li>
        <li>
          <NavLink to="/product">PRODUCT</NavLink>
        </li>
        <li>
          <NavLink to="/blog">BLOG</NavLink>
        </li>
        <li>
          <NavLink to="/contact">CONTACT</NavLink>
        </li>
        <li>
          <NavLink to="/infor">INFOR</NavLink>
        </li>
      </ul>

      <ul className={styles.navLogo}>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <button>
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
        <Link to="cart">
          <ion-icon name="cart-outline"></ion-icon>
        </Link>
        <Link to="account">
          <ion-icon name="person-outline"></ion-icon>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;
