/** @format */

import styles from "./BuySuccess.module.css";
import RecommendProduct from "../../../components/RecommendProduct/RecommendProduct";

import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function BuySuccess() {
  // check if user login
  const isLogin = useSelector((state) => state.user).user.id !== undefined;

  // render order detail url
  const [url] = useSearchParams();
  const orderId = url.get("order_id");

  return (
    <>
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
    </>
  );
}

export default BuySuccess;
