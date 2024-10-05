/** @format */

import { useEffect, useState } from "react";

import useGetDataList from "../../hooks/useGetDataList";

// general component
import FlexContainer from "../../components/FlexContainer";
import RenderQueryData from "../../components/RenderQueryData";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import ListHeader from "../../components/ListHeader/ListHeader";
import { BlankDivider } from "../../components/Divider";

// page component
import styles from "./Checkout.module.css";
import PersonalInfor from "./PesonalInfor";
import Payment from "./Payment";
import ProductList from "./ProductList";
import Total from "./Total";
import { useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cartSlide";

function BuyBtn() {
  return (
    <button
      type="submit"
      form="paymentInfor"
      className="fill-btn"
      style={{ width: "80%", justifyContent: "center", margin: "auto" }}>
      BUY
    </button>
  );
}

function Checkout() {
  // get product from redux & database
  const cart = useSelector((state) => state.cart).productArray;
  const { dataResponse, isLoading, isError } = useGetDataList(
    "products",
    cart.map((item) => item.id)
  );

  // attrach amount to products array
  const productList = dataResponse.map((item, i) => {
    return {
      ...item,
      amount: cart[i].amount,
    };
  });

  // calc total money
  const total = productList.reduce(
    (pre, curr) => (pre += curr.amount * curr.price),
    0
  );

  // handle buy product
  const [isBuy, setBuy] = useState(false);
  const orderId = new Date().valueOf();

  // redirect to 'by_success' page
  const redirect = useNavigate();

  function handleBuy(e) {
    e.preventDefault();
    setBuy(true);
  }

  // clear cart
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (!isBuy) return;

      console.log(1);

      // get personal infor & store in personalInfor variable
      let personalInfor = {};
      const personalEls = document.querySelectorAll(`.inputInfor`);

      personalEls.forEach((input) => {
        personalInfor[input.id] = input.value;
      });

      // get payment method
      const paymentMethod = document.querySelector(
        'input[name="payment-method"]:checked'
      ).value;

      // store order to local storage
      // create new order
      const newOrder = {
        id: orderId,
        ...personalInfor,
        payMethod: paymentMethod,
        products: cart,
        date: new Date(),
      };

      const orderString =
        localStorage.getItem("orders") !== null
          ? localStorage.getItem("orders")
          : "[]";

      // store order
      let orders = JSON.parse(orderString);
      orders.unshift(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));

      // clear cart
      dispatch(reset());

      // redirect
      redirect(`/test-covet-lux/buy_success?order_id=${orderId}`, {
        replace: true,
      });
    },
    [isBuy, productList]
  );

  return (
    <>
      <NavBar></NavBar>
      <FlexContainer>
        <div
          style={{
            width: "50%",
            borderRight: "solid 1px var(--orange)",
            paddingRight: "4rem",
          }}>
          <ListHeader
            title={"Personal information"}
            className={styles.header}></ListHeader>
          <form
            onSubmit={(e) => {
              handleBuy(e);
            }}
            id="paymentInfor"
            className={`columnContent ${styles.inforForm}`}>
            <PersonalInfor></PersonalInfor>
            <Payment></Payment>
          </form>
        </div>

        <div style={{ flexGrow: "1" }}>
          <ListHeader
            title={"Order information"}
            className={styles.header}></ListHeader>

          <RenderQueryData
            isError={isError}
            isLoading={isLoading}
            isEmptyList={
              !Array.isArray(productList) && productList.length === 0
            }>
            <ProductList productList={productList}></ProductList>
          </RenderQueryData>

          <ListHeader
            title={"Total detail"}
            className={styles.header}></ListHeader>
          <Total total={total}></Total>
          <BuyBtn></BuyBtn>
        </div>
      </FlexContainer>

      <BlankDivider></BlankDivider>
      <Footer></Footer>
    </>
  );
}

export default Checkout;
