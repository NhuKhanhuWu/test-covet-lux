/** @format */

import { AmountInput } from "../../../components/AmountInput/AmountInput.jsx";
import styles from "../Cart.module.css";

// redux
import { changeAmount, removeFromCart } from "../../../redux/cartSlide.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";

function BigTablet({ index, productList, updateAmount, handleDelete }) {
  return (
    <>
      {productList[index] && (
        <tr className={styles.productRow}>
          <td>
            <img
              className={styles.img}
              alt={productList[index].title}
              src={productList[index].images[0]
                .replace("[", "")
                .replace('"', "")}
              loading="lazy"></img>
          </td>

          <td>
            <Link
              className={styles.productTitle}
              to={`/test-covet-lux/product?product_id=${productList[index].id}`}>
              {productList[index].title}
            </Link>
            {/* <p></p> */}
          </td>

          <td className={styles.money}>
            <p>${productList[index].price}</p>
          </td>

          <td>
            <AmountInput
              callback={updateAmount}
              productList={productList}
              index={index}
              amount={productList[index]?.amount}
              setAmount={() => {}}
              id={`product-${productList[index].id}`}></AmountInput>
          </td>

          <td className={`${styles.money} orange-text`}>
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

function SmallTablet({ index, productList, updateAmount, handleDelete }) {
  return (
    <>
      {productList[index] && (
        <tr className={styles.productRow}>
          <td className={styles.imgContainer}>
            <img
              className={styles.img}
              alt={productList[index].title}
              src={productList[index].images[0]
                .replace("[", "")
                .replace('"', "")}
              loading="lazy"></img>
          </td>

          <td>
            <Link
              className={styles.productTitle}
              to={`/test-covet-lux/product?product_id=${productList[index].id}`}>
              {productList[index].title}
            </Link>

            <p className={styles.money}>${productList[index].price}</p>

            <AmountInput
              callback={updateAmount}
              productList={productList}
              index={index}
              amount={productList[index]?.amount}
              setAmount={() => {}}
              id={`product-${productList[index].id}`}></AmountInput>
          </td>

          <td className={`${styles.money} orange-text`}>
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

function BigPhone({ index, productList, updateAmount, handleDelete }) {
  return (
    <>
      {productList[index] && (
        <tr className={styles.productRow}>
          <td className={styles.imgContainer}>
            <img
              className={styles.img}
              alt={productList[index].title}
              src={productList[index].images[0]
                .replace("[", "")
                .replace('"', "")}
              loading="lazy"></img>
          </td>

          <td>
            <Link
              className={styles.productTitle}
              to={`/test-covet-lux/product?product_id=${productList[index].id}`}>
              {productList[index].title}
            </Link>

            <p className={styles.money}>${productList[index].price}</p>
          </td>

          <td className={`${styles.money} orange-text`}>
            <p>${productList[index].amount * productList[index].price}</p>

            <AmountInput
              callback={updateAmount}
              productList={productList}
              index={index}
              amount={productList[index]?.amount}
              setAmount={() => {}}
              id={`product-${productList[index].id}`}></AmountInput>

            <div className={styles.delete} onClick={() => handleDelete()}>
              {/* remove btn width x icon */}
              <MediaQuery minWidth={460}>
                <button className="tx-hover--orange">
                  <ion-icon
                    name="close-outline"
                    style={{ fontSize: "2.5rem" }}></ion-icon>
                </button>
              </MediaQuery>

              {/* remove btn with txt */}
              <MediaQuery maxWidth={460}>
                <button className="link">Remove</button>
              </MediaQuery>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function Product({ index, productList, setProductList }) {
  const dispatch = useDispatch();

  // update cart in localStorage when change amount
  function updateAmount(value, index, productList) {
    // update amount in state
    let newProductList = [...productList];
    newProductList[index].amount = value;
    setProductList(newProductList);

    // update in local storage & redux
    dispatch(changeAmount({ id: productList[index].id, amount: value }));
  }

  // delete product
  function handleDelete() {
    // update in local storage
    let newProductList = [...productList];
    newProductList.splice(index, 1);
    setProductList(newProductList);

    dispatch(removeFromCart({ id: productList[index].id }));
  }

  return (
    <>
      <MediaQuery minWidth={601}>
        <BigTablet
          index={index}
          productList={productList}
          updateAmount={updateAmount}
          handleDelete={handleDelete}></BigTablet>
      </MediaQuery>

      <MediaQuery maxWidth={600} minWidth={461}>
        <SmallTablet
          index={index}
          productList={productList}
          updateAmount={updateAmount}
          handleDelete={handleDelete}></SmallTablet>
      </MediaQuery>

      <MediaQuery maxWidth={460}>
        <BigPhone
          index={index}
          productList={productList}
          updateAmount={updateAmount}
          handleDelete={handleDelete}></BigPhone>
      </MediaQuery>
    </>
  );
}
