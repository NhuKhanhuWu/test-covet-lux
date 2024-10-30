/** @format */

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./BuySuccess.module.css";
import RecommendProduct from "../../components/RecommendProduct/RecommendProduct";

import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function BuySuccess() {
  // check if user login
  const isLogin = useSelector((state) => state.user).user.id !== undefined;
  console.log(isLogin);

  // render order detail url
  const [url] = useSearchParams();
  const orderId = url.get("order_id");

  return (
    <>
      <NavBar></NavBar>
      <div className={styles.message}>
        <span className="material-symbols-outlined">check_circle</span>
        <p>Order successfully!</p>

        <div className={styles.redirect}>
          <Link to="/test-covet-lux/" className="fill-btn ">
            Homepage
          </Link>
          {isLogin && (
            <Link
              to={`/test-covet-lux/order?id=${orderId}`}
              className="border-btn">
              Order detail
            </Link>
          )}
        </div>
      </div>

      {/* recommended products */}
      <RecommendProduct offset={0} query={"products/?"}></RecommendProduct>
      {/* recommended products */}

      <Footer></Footer>
    </>
  );
}

export default BuySuccess;
