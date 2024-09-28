/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./general.css";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Product from "./pages/Product/Product.jsx";
import ProductDetail from "./pages/Product/ProductDetail.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import Infor from "./pages/Infor.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";

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
        {/* cart & checkout: end */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
