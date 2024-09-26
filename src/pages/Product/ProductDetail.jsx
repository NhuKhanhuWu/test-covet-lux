/** @format */

import { useSearchParams } from "react-router-dom";
import FlexContainer from "../../components/FlexContainer";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./ProductDetail.module.css";
import useGetData from "../../hooks/useGetData";
import RenderQueryData from "../../components/RenderQueryData.jsx";
import { BlankDivider } from "../../components/Divider.jsx";
import { useState } from "react";

/** @format */
function Images({ product }) {
  return (
    <div className={styles.productImg}>
      {product.images.map((img, i) => (
        <img
          className="img"
          key={`img-${i}`}
          alt={product.title}
          src={product.images[i]}></img>
      ))}
    </div>
  );
}

function AmountInput({ amount, setAmount }) {
  function handleChangeAmount(value) {
    if (value < 1 || value > 20) return;
    setAmount(value);
  }

  return (
    <div className={styles.amountInput}>
      <button onClick={() => handleChangeAmount(amount - 1)}>-</button>
      <input
        type="numder"
        min={1}
        step={1}
        value={amount}
        onChange={(e) => handleChangeAmount(Number(e.target.value))}></input>
      <button onClick={() => handleChangeAmount(amount + 1)}>+</button>
    </div>
  );
}

function Start({ rating }) {
  const arr = Array.from({ length: Math.floor(rating) });
  const ratingDemical = rating - Math.floor(rating);

  return (
    <div>
      <ion-icon name="star"></ion-icon>
    </div>
  );
}

function Text({ product }) {
  return (
    <>
      <div>
        <h1>{product.title}</h1>
        <div>⭐⭐⭐⭐⭐ (5.0) | 100 sold | 10 reviews</div>
      </div>

      <p className={`orange-text ${styles.price}`}>
        ${product.price}{" "}
        <span style={{ textDecoration: "line-through" }}>
          ${product.price * 1.25}
        </span>
      </p>
      <p className={styles.shipment}>Return in 15 days</p>
      <p className={styles.shipment}>Send from: Linh Trung, Thu Duc</p>
    </>
  );
}

function ProductDetail() {
  const [url] = useSearchParams();
  const productId = url.get("product_id");
  const {
    dataResponse: product,
    isLoading,
    isError,
  } = useGetData(`products/${productId}`);
  const [amount, setAmount] = useState(1);

  return (
    <>
      <NavBar></NavBar>

      {/* product infor: start */}
      <FlexContainer elClass={styles.productInfor}>
        <RenderQueryData
          isError={isError}
          isLoading={isLoading}
          isEmptyList={product.length === 0}>
          <Images product={product}></Images>

          <div className={styles.productText}>
            <Text product={product}></Text>

            <FlexContainer elClass={styles.amount}>
              <AmountInput amount={amount} setAmount={setAmount}></AmountInput>
              <p>100 available product(s)</p>
            </FlexContainer>

            <FlexContainer elClass={styles.btn} gap={2}>
              <button className="fill-btn">Buy now</button>
              <button className="border-btn">Add to cart</button>
            </FlexContainer>
          </div>
        </RenderQueryData>
      </FlexContainer>
      {/* product infor: end */}

      {/* desription & reviews */}

      <BlankDivider></BlankDivider>
      <Footer></Footer>
    </>
  );
}

export default ProductDetail;
