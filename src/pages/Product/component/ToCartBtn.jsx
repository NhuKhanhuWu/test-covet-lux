/** @format */
// import { HandleAddToCart } from "../ProductDetail";
import { useState } from "react";
import MessageBox from "../../../components/MessageBox/MessageBox";

export function ToCartBtn({ product, amount, handleAddToCart }) {
  // display message
  const [isAdded, setAdd] = useState(false);

  return (
    <>
      <button
        className="border-btn"
        onClick={() => handleAddToCart(product, amount, setAdd)}>
        Add to cart
      </button>

      {/* message */}
      <MessageBox isShowed={isAdded} setShow={setAdd}>
        <>
          <ion-icon
            name="checkmark-circle"
            class="icon"
            style={{ color: "rgb(88 252 97)" }}></ion-icon>
          <p>Added to cart</p>
        </>
      </MessageBox>
    </>
  );
}
