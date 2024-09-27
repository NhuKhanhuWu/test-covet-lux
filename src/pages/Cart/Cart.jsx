/** @format */
import { useState } from "react";
import { AmountInput } from "../../components/AmountInput/AmountInput";
import FlexContainer from "../../components/FlexContainer";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Cart.module.css";
import { BlankDivider } from "../../components/Divider";

function Product({ product, i }) {
  const [amount, setAmount] = useState(product.amount);

  return (
    <tr className={styles.productRow}>
      <td className={styles.select}>
        <input type="checkbox"></input>
      </td>
      <td>
        <img
          className={styles.img}
          alt={product.title}
          src={product.images[0].replace("[", "").replace('"', "")}></img>
      </td>

      <td>
        <p className={styles.productTitle}>{product.title}</p>
      </td>

      <td className={styles.money}>
        <p>${product.price}</p>
      </td>

      <td>
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          id={`product-${i}`}></AmountInput>
      </td>

      <td className={styles.money}>
        <p>${amount * product.price}</p>
      </td>

      <td className={styles.delete}>
        <button>
          <ion-icon
            name="close-outline"
            style={{ fontSize: "2.5rem" }}></ion-icon>
        </button>
      </td>
    </tr>
  );
}

function TableList({ productList }) {
  return (
    <table className={styles.productContainer}>
      <tbody>
        <tr>
          <th>
            <td></td>
          </th>
          <th>
            <td>PRODUCT</td>
          </th>
          <th>
            <td></td>
          </th>
          <th>
            <td>PRICE</td>
          </th>
          <th>
            <td>AMOUNT</td>
          </th>
          <th>
            <td>TOTAL</td>
          </th>
          <th>
            <td></td>
          </th>
        </tr>
        {productList !== null && (
          <>
            {productList.map((product, i) => (
              <Product product={product} i={i} key={`product${i}`}></Product>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}

function Cart() {
  const productList = JSON.parse(localStorage.getItem("cart"));

  return (
    <>
      <NavBar></NavBar>

      <BlankDivider distance={1}></BlankDivider>
      <FlexContainer gap={3}>
        <TableList productList={productList}></TableList>
        <div>total container</div>
      </FlexContainer>
      <BlankDivider distance={3}></BlankDivider>

      <Footer></Footer>
    </>
  );
}

export default Cart;
