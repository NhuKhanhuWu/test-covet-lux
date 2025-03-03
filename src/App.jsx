/** @format */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./general.css";
import "./responsive.css";

import HomePage from "./pages/Customer/HomePage/HomePage.jsx";
import Product from "./pages/Customer/Product/Product.jsx";
import ProductDetail from "./pages/Customer/Product/ProductDetail.jsx";

import Cart from "./pages/Customer/Cart/Cart.jsx";
import Checkout from "./pages/Customer/Checkout/Checkout.jsx";
import BuySuccess from "./pages/Customer/Checkout/BuySuccess.jsx";

import Login from "./pages/Customer/Login_Signup/Login.jsx";
import Signup from "./pages/Customer/Login_Signup/Signup.jsx";

import Blogs from "./pages/Customer/Blog/Blogs.jsx";
import Contact from "./pages/Customer/Contact/Contact.jsx";
import About from "./pages/Customer/About/About.jsx";

import Account from "./pages/Customer/Account/Account.jsx";
import Orders from "./pages/Customer/Orders/Orders.jsx";
import OrderDetail from "./pages/Customer/Orders/OrderDetail.jsx";
import BlogDetail from "./pages/Customer/Blog/BlogDetail.jsx";
import ScrollTopBtn from "./components/ScrollTopBtn/ScrollTopBtn.jsx";
import ChatBox from "./components/ChatBox/ChatBox.tsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar.jsx";

function App() {
  const location = useLocation();
  const navBar = location.pathname.includes("/test-covet-lux/admin") ? (
    <AdminSidebar></AdminSidebar>
  ) : (
    <NavBar></NavBar>
  );

  const footer =
    location.pathname == "/test-covet-lux/dashboard" ? "" : <Footer></Footer>;

  return (
    <>
      {navBar}

      <Routes>
        {/* USER: START */}
        <Route path="/test-covet-lux" element={<HomePage />}></Route>
        <Route path="/test-covet-lux/contact" element={<Contact />}></Route>
        <Route path="/test-covet-lux/infor" element={<About />}></Route>
        {/* product: start */}
        <Route path="/test-covet-lux/products" element={<Product />}></Route>
        <Route
          path="/test-covet-lux/product"
          element={<ProductDetail />}></Route>
        {/* product:end */}
        {/* cart & checkout: start */}
        <Route path="/test-covet-lux/cart" element={<Cart></Cart>}></Route>
        <Route
          path="/test-covet-lux/checkout"
          element={<Checkout></Checkout>}></Route>
        <Route
          path="/test-covet-lux/buy_success"
          element={<BuySuccess></BuySuccess>}></Route>
        {/* cart & checkout: end */}
        {/* login, signin: start */}
        <Route path="/test-covet-lux/login" element={<Login></Login>}></Route>
        <Route
          path="/test-covet-lux/signup"
          element={<Signup></Signup>}></Route>
        {/* login, signin: end */}
        {/* acccount, order: start */}
        <Route
          path="/test-covet-lux/account"
          element={<Account></Account>}></Route>
        <Route
          path="/test-covet-lux/orders"
          element={<Orders></Orders>}></Route>{" "}
        <Route
          path="/test-covet-lux/order"
          element={<OrderDetail></OrderDetail>}></Route>
        {/* acccount, order: end */}
        {/* blog: start */}
        <Route path="/test-covet-lux/blogs" element={<Blogs />}></Route>
        <Route path="/test-covet-lux/blog" element={<BlogDetail />}></Route>
        {/* blog: end */}
        {/* USER: END */}
        {/* ADMIN: START */}
        <Route
          path="/test-covet-lux/admin/analyst"
          element={<Dashboard></Dashboard>}></Route>
        {/* ADMIN: END */}
      </Routes>

      <ChatBox></ChatBox>
      <ScrollTopBtn></ScrollTopBtn>

      {footer}
    </>
  );
}

export default App;
