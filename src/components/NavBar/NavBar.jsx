/** @format */

import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../../public/logo-no-background.png";
import { useSelector } from "react-redux";
import { editTitle } from "../../redux/productsSlide";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MediaQuery from "react-responsive";
import FlexContainer from "../FlexContainer";

function Logo() {
  return (
    <Link to="/test-covet-lux">
      <img alt="covet-lux" src={logo} className={styles.logo}></img>
    </Link>
  );
}

function NavLink() {
  return (
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
  );
}

function NavIcon() {
  // get cart's product amount: start
  const cartAmount = useSelector((state) => state.cart).productArray.length;
  // get cart's product amount: end

  // get user avatar: start
  const user = useSelector((state) => state.user).user;

  const avatar = user.id ? user.avatar : null;
  // get user avatar: end

  return (
    <ul className={styles.navLogo}>
      <div>
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
      </div>
    </ul>
  );
}

function SearchBar() {
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

  return (
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
  );
}

function MenuBtn({ isOpen, setOpen }) {
  return (
    <div
      className={`${styles.container} ${isOpen && styles.change}`}
      onClick={() => setOpen(!isOpen)}>
      <div className={`${styles.bar1}`}></div>
      <div className={`${styles.bar2}`}></div>
      <div className={`${styles.bar3}`}></div>
    </div>
  );
}

function DesktopNavBar() {
  return (
    <>
      <MediaQuery minWidth={831}>
        <Logo></Logo>
        <NavLink></NavLink>
        <FlexContainer gap={2} margin={0} verticalCenter={true}>
          <SearchBar></SearchBar>
          <NavIcon></NavIcon>
        </FlexContainer>
      </MediaQuery>
    </>
  );
}

function BigTabletNavBar({ isOpen, setOpen, navHeight }) {
  return (
    <>
      <Logo></Logo>
      <SearchBar></SearchBar>
      <MenuBtn isOpen={isOpen} setOpen={setOpen}></MenuBtn>
      <div
        style={{ top: `${navHeight}px` }}
        className={`${styles.sideBar} ${isOpen && styles.open}`}>
        <NavIcon></NavIcon>
        <NavLink></NavLink>
      </div>
    </>
  );
}

function SmallTableNavBar({ isOpen, setOpen, navHeight }) {
  return (
    <>
      <Logo></Logo>
      <MenuBtn isOpen={isOpen} setOpen={setOpen}></MenuBtn>
      <div
        style={{ top: `${navHeight}px` }}
        className={`${styles.sideBar} ${isOpen && styles.open}`}>
        <NavIcon></NavIcon>
        <SearchBar></SearchBar>
        <NavLink></NavLink>
      </div>
    </>
  );
}

function SideNavBar() {
  // get nav bar height
  const [navHeight, setHeight] = useState(0);
  // set nav bar height being side bar top
  useEffect(function () {
    const nav = document.querySelector(`.${styles.nav}`);
    setHeight(nav.clientHeight + 1);
  }, []);

  // toogle side bar
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <MediaQuery maxWidth={830} minWidth={501}>
        <BigTabletNavBar
          isOpen={isOpen}
          setOpen={setOpen}
          navHeight={navHeight}></BigTabletNavBar>
      </MediaQuery>

      <MediaQuery maxWidth={500}>
        <SmallTableNavBar
          isOpen={isOpen}
          setOpen={setOpen}
          navHeight={navHeight}></SmallTableNavBar>
      </MediaQuery>
    </>
  );
}

function NavBar() {
  // responsive

  return (
    <nav className={styles.nav}>
      <DesktopNavBar></DesktopNavBar>
      <SideNavBar></SideNavBar>
    </nav>
  );
}

export default NavBar;
