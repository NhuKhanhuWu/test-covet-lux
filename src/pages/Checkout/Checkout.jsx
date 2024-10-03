/** @format */

import { useEffect, useState } from "react";
import FlexContainer from "../../components/FlexContainer";
import RenderQueryData from "../../components/RenderQueryData";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import ListHeader from "../../components/ListHeader/ListHeader";
import styles from "./Checkout.module.css";
import { BlankDivider } from "../../components/Divider";
import useGetLocal from "../../hooks/useGetLocal";
import useGetDataList from "../../hooks/useGetDataList";

import PersonalInfor from "./PesonalInfor";
import Payment from "./Payment";
import ProductList from "./ProductList";
import Total from "./Total";
import { useNavigate } from "react-router-dom";

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
  const cart = useGetLocal("cart");
  // get product from database
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
    redirect(`/test-covet-lux/buy_success?order_id=${orderId}`, {
      replace: true,
    });
  }

  useEffect(
    function () {
      if (!isBuy) return;

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
      console.log(orders);
      orders.unshift(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));

      // clear cart
      localStorage.removeItem("cart");
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
