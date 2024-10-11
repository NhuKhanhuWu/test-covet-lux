/** @format */

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import ListHeader from "../../components/ListHeader/ListHeader";

import styles from "./BuySuccess.module.css";
import useGetData from "../../hooks/useGetData";
import RenderQueryData from "../../components/RenderQueryData";
import ProductItem from "../../components/ProductItem/ProductItem";
import FlexContainer from "../../components/FlexContainer";
import { Link, useSearchParams } from "react-router-dom";

function BuySuccess() {
  const {
    isLoading,
    isError,
    dataResponse: recommenProducts,
  } = useGetData("products?offset=0&limit=5");
  const isEmptyList =
    !Array.isArray(recommenProducts) || recommenProducts.length === 0;

  // check if user login
  const isLogin = localStorage.getItem("user") !== null;

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
      <ListHeader
        title={"You may also like"}
        url="/test-covet-lux/products?page=1"></ListHeader>
      <RenderQueryData
        isError={isError}
        isLoading={isLoading}
        isEmptyList={isEmptyList}>
        <FlexContainer>
          {recommenProducts.map((product, i) => (
            <ProductItem product={product} key={`recommen-${i}`}></ProductItem>
          ))}
        </FlexContainer>
      </RenderQueryData>

      <Footer></Footer>
    </>
  );
}

export default BuySuccess;
