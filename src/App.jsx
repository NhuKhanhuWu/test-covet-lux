/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./general.css";
import HomePage from "./pages/HomePage/HomePage.jsx";

import Product from "./pages/Product/Product.jsx";
import ProductDetail from "./pages/Product/ProductDetail.jsx";

import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import BuySuccess from "./pages/Checkout/BuySuccess.jsx";

import Login from "./pages/Login_Signup/Login.jsx";
import Signup from "./pages/Login_Signup/Signup.jsx";

import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import Infor from "./pages/Infor.jsx";

import Account from "./pages/Account/Account.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import OrderDetail from "./pages/Orders/OrderDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test-covet-lux" element={<HomePage />}></Route>
        <Route path="/test-covet-lux/blog" element={<Blog />}></Route>
        <Route path="/test-covet-lux/contact" element={<Contact />}></Route>
        <Route path="/test-covet-lux/infor" element={<Infor />}></Route>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
