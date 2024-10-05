/** @format */

import { AmountInput } from "../../../components/AmountInput/AmountInput.jsx";
import styles from "../Cart.module.css";

// redux
import { changeAmount, removeFromCart } from "../../../redux/cartSlide.js";
import { useDispatch } from "react-redux";

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
      {productList[index] && (
        <tr className={styles.productRow}>
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
              amount={productList[index]?.amount}
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
