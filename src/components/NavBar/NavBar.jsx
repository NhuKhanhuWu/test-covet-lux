/** @format */

import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../../public/logo-no-background.png";
import { useSelector } from "react-redux";
import { editTitle } from "../../redux/productsSlide";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  // get cart's product amount: start
  const cartAmount = useSelector((state) => state.cart).productArray.length;
  // get cart's product amount: end

  // get user avatar: start
  const user = useSelector((state) => state.user).user;

  const avatar = user.id ? user.avatar : null;

  // search product by title
  const [tile, setTitle] = useState(
    useSelector((state) => state.products.titleFilter)
  );
  const dispacth = useDispatch();
  const navigate = useNavigate(); //redirect to product page
  const currTitleFilter = useRef(); //get current seach titlr

  function handleFilterTitle(e, title) {
    e.preventDefault();
    dispacth(editTitle(title));
    navigate("/test-covet-lux/products");
  }
  // get user avatar: end

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
          <Link to="/test-covet-lux/products">PRODUCT</Link>
        </li>
        <li>
          <Link to="/test-covet-lux/blogs">BLOG</Link>
        </li>
        <li>
          <Link to="/test-covet-lux/contact">CONTACT</Link>
        </li>
        <li>
          <Link to="/test-covet-lux/infor">ABOUT</Link>
        </li>
      </ul>

      <ul className={styles.navLogo}>
        <form
          className={styles.search}
          onSubmit={(e) => handleFilterTitle(e, currTitleFilter.current.value)}>
          <input
            ref={currTitleFilter}
            type="text"
            placeholder="Search..."
            value={tile}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </form>

        <Link to="/test-covet-lux/cart" className={styles.cart}>
          <ion-icon name="cart-outline"></ion-icon>
          <div>{cartAmount}</div>
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
