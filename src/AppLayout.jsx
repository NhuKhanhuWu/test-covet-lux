/** @format */

import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import ScrollTopBtn from "./components/ScrollTopBtn/ScrollTopBtn";
import { Header } from "./pages/Customer/Orders/component_orderDetail/Header";
import NavBar from "./components/NavBar/NavBar";

export default function AppLayout() {
  const location = useLocation();
  const navBar = location.pathname.includes("/test-covet-lux/admin") ? (
    ""
  ) : (
    <NavBar></NavBar>
  );

  const footer =
    location.pathname == "/test-covet-lux/dashboard" ? "" : <Footer></Footer>;

  return (
    <>
      {navBar}

      <main>
        <Outlet></Outlet>
      </main>

      <ScrollTopBtn></ScrollTopBtn>
      {footer}
    </>
  );
}
