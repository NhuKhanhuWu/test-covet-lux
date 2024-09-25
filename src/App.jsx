/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./general.css";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import Infor from "./pages/Infor.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test-covet-lux" element={<HomePage />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/infor" element={<Infor />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
