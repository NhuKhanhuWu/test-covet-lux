/** @format */

import { useState } from "react";
import FlexContainer from "../../components/FlexContainer";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import ListHeader from "../../components/ListHeader/ListHeader";
import GridContainer from "../../components/GridContainer";
import styles from "./Checkout.module.css";
import { BlankDivider } from "../../components/Divider";

// get personal infor from local storage
const infor = localStorage.getItem("personal_infor");
const INPUT_FIELDS_INFOR = [
  { id: "name", name: "Full name", value: infor?.name },
  { id: "phone", name: "Phone", type: "tel", value: infor?.phone },
];
const ADDRESS = [
  { id: "city", name: "City/provine", value: infor?.city },
  { id: "provine", name: "Provine", value: infor?.provine },
  { id: "ward", name: "Ward", value: infor?.ward },
  {
    id: "specificAddress",
    name: "Specific Address",
    value: infor?.specificAddress,
  },
];
const INPUT_FIELDS_EPAYMENT = [
  { id: "cardCode", name: "Card code", placeholder: "0123 4567 8901 2345" },
  { id: "expiredDate", name: "Expired date", placeholder: "DD/MM/YY" },
  { id: "password", name: "Password", placeholder: "3 character" },
  { id: "ownerName", name: "Owner name", placeholder: "John Wilson" },
];

function InputField({
  value,
  id,
  name,
  type = "text",
  isRequired = true,
  placeholder = null,
}) {
  const checkedPlaceholder = placeholder !== null ? placeholder : name;

  return (
    <div className={styles.inputField}>
      <label htmlFor={id}>{name}*</label>
      <input
        required={isRequired}
        form="paymentInfor"
        type={type}
        value={value}
        placeholder={checkedPlaceholder}
        id={id}></input>
    </div>
  );
}

function PersonalInfor() {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div className={`columnContent`} style={{ marginBottom: "1rem" }}>
        {INPUT_FIELDS_INFOR.map((field, i) => (
          <InputField
            key={`infor-${i}`}
            value={field.value}
            id={field.id}
            name={field.name}
            type={field?.type}></InputField>
        ))}
      </div>
      <GridContainer numCol={2} gap={2}>
        {ADDRESS.map((field, i) => (
          <InputField
            key={`address${i}`}
            value={field.value}
            id={field.id}
            name={field.name}></InputField>
        ))}
      </GridContainer>
    </div>
  );
}

function Payment() {
  const [currMethod, setMethod] = useState("cod");

  return (
    <div>
      <ListHeader
        title={"Payment information"}
        className={styles.header}></ListHeader>
      <div
        style={{
          marginBottom: "2rem",
          paddingBottom: "2rem",
          borderBottom: "solid 1px var(--gray)",
        }}>
        <input
          required
          type="radio"
          name="payment-method"
          value="cod"
          id="cod"
          onClick={() => setMethod("cod")}></input>
        <label htmlFor="cod" className={styles.paymentLabel}>
          COD
        </label>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <input
          onClick={() => setMethod("ePayment")}
          required
          type="radio"
          name="payment-method"
          value="ePayment"
          id="ePayment"></input>
        <label htmlFor="ePayment" className={styles.paymentLabel}>
          Online payment
        </label>
      </div>
      {currMethod === "ePayment" && (
        <div className={`columnContent`}>
          {INPUT_FIELDS_EPAYMENT.map((field, i) => (
            <InputField
              isRequired={currMethod === "ePayment"}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              key={`payment-${i}`}></InputField>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductItem({ product }) {
  return (
    <tr>
      <td>
        <FlexContainer margin={0} gap={1}>
          <img
            alt={product.title}
            src={product.images[0]}
            className={`img`}
            style={{ width: "9rem" }}></img>
          <div
            className={`columnContent ${styles.productTxt}`}
            style={{ width: "60%" }}>
            <p>{product.title}</p>
            <p>X{product.amount}</p>
            <p>${product.price}</p>
          </div>
        </FlexContainer>
      </td>
      <td className={styles.productTxt}>${product.amount * product.price}</td>
    </tr>
  );
}

function ProductList({ productList }) {
  return (
    <table className={`${styles.table} ${styles.productInfor}`}>
      <thead>
        <tr style={{ textAlign: "left", marginBottom: "2rem" }}>
          <th>Product</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {productList.map((product, i) => (
          <ProductItem product={product} key={`product-${i}`}></ProductItem>
        ))}
      </tbody>
    </table>
  );
}

function Total({ total }) {
  const shippingFee = total >= 100 ? 0 : 5;
  return (
    <table className={`${styles.table} ${styles.productTxt} ${styles.total}`}>
      <tbody>
        <tr>
          <td>Sub-total</td>
          <td>${total}</td>
        </tr>
        <tr>
          <td>Shipping fee</td>
          <td>${shippingFee}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>${shippingFee + total}</td>
        </tr>
      </tbody>
    </table>
  );
}

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
  const productList = JSON.parse(localStorage.getItem("cart"));
  const total = productList.reduce(
    (pre, curr) => (pre += curr.amount * curr.price),
    0
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
          <ProductList productList={productList}></ProductList>

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
