/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "./responsive.css";

// import pages
import { lazy, Suspense } from "react";
import PageLoader from "./components/Loader/PageLoader.jsx";
const HomePage = lazy(() => import("./pages/Customer/HomePage/HomePage.jsx"));
const Product = lazy(() => import("./pages/Customer/Product/Product.jsx"));
const ProductDetail = lazy(() =>
  import("./pages/Customer/Product/ProductDetail.jsx")
);

const Cart = lazy(() => import("./pages/Customer/Cart/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Customer/Checkout/Checkout.jsx"));
const BuySuccess = lazy(() =>
  import("./pages/Customer/Checkout/BuySuccess.jsx")
);

const Login = lazy(() => import("./pages/Customer/Login_Signup/Login.jsx"));
const Signup = lazy(() => import("./pages/Customer/Login_Signup/Signup.jsx"));

const Blogs = lazy(() => import("./pages/Customer/Blog/Blogs.jsx"));
const BlogDetail = lazy(() => import("./pages/Customer/Blog/BlogDetail.jsx"));

const Contact = lazy(() => import("./pages/Customer/Contact/Contact.jsx"));
const About = lazy(() => import("./pages/Customer/About/About.jsx"));

const Account = lazy(() => import("./pages/Customer/Account/Account.jsx"));
const Orders = lazy(() => import("./pages/Customer/Orders/Orders.jsx"));
const OrderDetail = lazy(() =>
  import("./pages/Customer/Orders/OrderDetail.jsx")
);

const Analyst = lazy(() => import("./pages/Admin/Analyst/Analyst.jsx"));
const AppLayout = lazy(() => import("./AppLayout.jsx"));

const router = createBrowserRouter([
  {
    path: "/test-covet-lux",
    element: <AppLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "contact", element: <Contact /> },
      { path: "infor", element: <About /> },

      // Product
      { path: "products", element: <Product /> },
      { path: "product", element: <ProductDetail /> },

      // Cart & Checkout
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "buy_success", element: <BuySuccess /> },

      // Auth
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // Account & Orders
      { path: "account", element: <Account /> },
      { path: "orders", element: <Orders /> },
      { path: "order", element: <OrderDetail /> },

      // Blog
      { path: "blogs", element: <Blogs /> },
      { path: "blog", element: <BlogDetail /> },

      // Admin
      { path: "admin/analyst", element: <Analyst /> },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router}></RouterProvider>;
    </Suspense>
  );
}

export default App;
