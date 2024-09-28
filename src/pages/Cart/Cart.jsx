/** @format */
import { useEffect, useRef, useState } from "react";
import { AmountInput } from "../../components/AmountInput/AmountInput";
import FlexContainer from "../../components/FlexContainer";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Cart.module.css";
import { BlankDivider } from "../../components/Divider";
import { Link } from "react-router-dom";

function Product({ index, productList, setProductList }) {
  // update cart in localStorage when change amount
  function updateAmount(value, index, productList) {
    // update amount in state
    let newProductList = [...productList];
    newProductList[index].amount = value;
    setProductList(newProductList);

    // update in local storage
    localStorage.setItem("cart", JSON.stringify(newProductList));
  }

  // delete product
  function handleDelete() {
    // update in local storage
    let newProductList = [...productList];
    newProductList.splice(index, 1);
    setProductList(newProductList);
    localStorage.setItem("cart", JSON.stringify(newProductList));
  }

  return (
    <>
      {productList[index] && (
        <tr className={styles.productRow}>
          {/* <td className={styles.select}>
        <div className="checkbox-wrapper-19">
          <input type="checkbox" id={`cbtest-${product.id}`} />
          <label htmlFor={`cbtest-${product.id}`} className="check-box"></label>
        </div>
      </td> */}
          <td>
            <img
              className={styles.img}
              alt={productList[index].title}
              src={productList[index].images[0]
                .replace("[", "")
                .replace('"', "")}></img>
          </td>

          <td>
            <p className={styles.productTitle}>{productList[index].title}</p>
          </td>

          <td className={styles.money}>
            <p>${productList[index].price}</p>
          </td>

          <td>
            <AmountInput
              callback={updateAmount}
              productList={productList}
              index={index}
              amount={productList[index].amount}
              setAmount={() => {}}
              id={`product-${productList[index].id}`}></AmountInput>
          </td>

          <td className={styles.money}>
            <p>${productList[index].amount * productList[index].price}</p>
          </td>

          <td className={styles.delete}>
            <button className="tx-hover--orange" onClick={() => handleDelete()}>
              <ion-icon
                name="close-outline"
                style={{ fontSize: "2.5rem" }}></ion-icon>
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

function ProductContainer({ children }) {
  return (
    <table className={styles.productContainer}>
      <tbody>
        <tr className={styles.tableHeader}>
          {/* <th></th> */}
          <th>PRODUCT</th>
          <th></th>
          <th>PRICE</th>
          <th>AMOUNT</th>
          <th>TOTAL</th>
          <th></th>
        </tr>
        {children}
      </tbody>
    </table>
  );
}

function TotalContainer({ children }) {
  return (
    <table className={`${styles.productContainer} ${styles.totalTable}`}>
      <tr className={styles.tableHeader}>
        <th>TOTAL</th>

        <th></th>
      </tr>
      {children}
    </table>
  );
}

function TotalDetail({ totalCost, setTotalMoney, totalMoney }) {
  const shippingFee = totalCost >= 100 ? 0 : 10;
  const shipMessage =
    shippingFee > 0 ? `($${100 - totalCost} more to get free shipment)` : "";

  useEffect(
    function () {
      setTotalMoney(totalCost + shippingFee);
    },
    [setTotalMoney, shippingFee, totalCost]
  );
  return (
    <>
      <tr>
        <td>Sub-total</td>
        <td>${totalCost}</td>
      </tr>
      <tr>
        <td>Shipping fee</td>
        <td>
          ${shippingFee}{" "}
          <p className="gray-text" style={{ fontSize: "1.4rem" }}>
            {shipMessage}
          </p>
        </td>
      </tr>
      <tr>
        <td>Total</td>
        <td className={styles.total}>${totalMoney}</td>
      </tr>
    </>
  );
}

function CheckoutContainer({ totalMoney, setTotalMoney }) {
  // get discount code
  const discountCode = useRef();

  function handleDiscount() {
    if (discountCode.current.value === "COVETLUX_DISCOUNT") {
      setTotalMoney(totalMoney * 0.85);
    }
  }
  return (
    <>
      <Link
        to={"/test-covet-lux/checkout"}
        className={`fill-btn ${styles.checkoutBtn}`}>
        Checkout
      </Link>
    </>
  );
}

function Cart() {
  const [productList, setProductList] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  // caculate total amount & total cost
  const totalCost = productList.reduce(
    (preTotal, curr) => (preTotal += curr.amount * curr.price),
    0
  );

  // store total money (cost+shipping-discount...) in state
  const [totalMoney, setTotalMoney] = useState(0);

  return (
    <>
      <NavBar></NavBar>

      <BlankDivider distance={1}></BlankDivider>
      <FlexContainer gap={2}>
        <ProductContainer>
          {productList !== null && (
            <>
              {productList.map((product, i) => (
                <Product
                  setProductList={setProductList}
                  index={i}
                  product={product}
                  productList={productList}
                  key={`product-${product.id}`}></Product>
              ))}
            </>
          )}
        </ProductContainer>
        <div className={styles.totalContainer}>
          <TotalContainer>
            <TotalDetail
              totalMoney={totalMoney}
              setTotalMoney={setTotalMoney}
              totalCost={totalCost}></TotalDetail>
          </TotalContainer>
          <CheckoutContainer></CheckoutContainer>
        </div>
      </FlexContainer>
      <BlankDivider distance={3}></BlankDivider>

      <Footer></Footer>
    </>
  );
}

export default Cart;
