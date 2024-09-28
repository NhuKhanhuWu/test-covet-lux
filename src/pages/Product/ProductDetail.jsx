/** @format */

import { Link, useSearchParams } from "react-router-dom";
import FlexContainer from "../../components/FlexContainer";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./ProductDetail.module.css";
import useGetData from "../../hooks/useGetData";
import RenderQueryData from "../../components/RenderQueryData.jsx";
import { BlankDivider } from "../../components/Divider.jsx";
import { useEffect, useState } from "react";

// for test rendering reviews
import avatar from "../../../public/avatar.jpg";
import ListHeader from "../../components/ListHeader/ListHeader.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import MessageBox from "../../components/MessageBox/MessageBox.jsx";
import { AmountInput } from "../../components/AmountInput/AmountInput.jsx";

/** @format */
function Images({ product }) {
  return (
    <div className={styles.productImg}>
      {product.images.map((img, i) => (
        <img
          className="img"
          key={`img-${i}`}
          alt={product.title}
          src={product?.images[i]?.replace("[", "").replace('"', "")}></img>
      ))}
    </div>
  );
}

function Stars({ rating }) {
  const arr = Array.from({ length: Math.floor(rating) });
  const ratingDemical = rating - Math.floor(rating);

  return (
    <div>
      <ion-icon name="star"></ion-icon>
    </div>
  );
}

function ProductInfor({ product }) {
  return (
    <>
      <div>
        <h1>{product.title}</h1>
        <div>⭐⭐⭐⭐⭐ (5.0) | 100 sold | 2 reviews</div>
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

function ByNowBtn({ product, amount }) {
  return (
    <Link
      onClick={() =>
        handleAddToCart(
          product,
          amount,
          () => {},
          () => {}
        )
      }
      to={`/test-covet-lux/cart/`}
      className="fill-btn">
      Buy now
    </Link>
  );
}

function ToCartBtn({ product, amount }) {
  // display message
  const [isAdded, setAdd] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  return (
    <>
      <button
        className="border-btn"
        onClick={() => handleAddToCart(product, amount, setSuccess, setAdd)}>
        Add to cart
      </button>

      {/* message */}
      <MessageBox isShowed={isAdded} setShow={setAdd}>
        {isSuccess ? (
          <>
            <ion-icon
              name="checkmark-circle"
              class={styles.icon}
              style={{ color: "rgb(88 252 97)" }}></ion-icon>
            <p>Added to cart</p>
          </>
        ) : (
          <>
            <ion-icon
              name="close-circle"
              class={styles.icon}
              style={{ color: "#ff2d00" }}></ion-icon>
            <p>Each product is limited to a quantity of 20</p>
          </>
        )}
      </MessageBox>
    </>
  );
}

function DescripAndReview({ product, reviews = null }) {
  const testReviews = [
    {
      userName: "ongzao",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos quo inventore expedita soluta nemo, animi recusandae repellendus ea atque dicta cumque, aspernatur a tempora dignissimos molestias temporibus rerum autem beatae",
    },
    {
      userName: "user123",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora error ullam ea cum repellendus voluptatibus adipisci numquam ut facere, ipsum beatae! Quibusdam unde tenetur recusandae ipsam cum sint aspernatur voluptas!",
    },
  ];

  const [showedEl, setShowedEl] = useState("descipt");

  return (
    <>
      <DesciptionAndReviewsBtn
        showedEl={showedEl}
        setShowedEl={setShowedEl}></DesciptionAndReviewsBtn>

      <div className={styles.descripReviewContainer}>
        <Description product={product} showedEl={showedEl}></Description>
        <Reviews reviews={testReviews} showedEl={showedEl}></Reviews>
      </div>
    </>
  );
}

function DesciptionAndReviewsBtn({ setShowedEl, showedEl }) {
  return (
    <div className={styles.btnContainer}>
      <button
        onClick={() => {
          setShowedEl("descipt");
        }}
        className={showedEl === "descipt" ? "orange-text" : ""}>
        DESCRIPTION
      </button>
      <span>|</span>
      <button
        onClick={() => {
          setShowedEl("reviews");
        }}
        className={showedEl === "reviews" ? "orange-text" : ""}>
        REVIEWS
      </button>
    </div>
  );
}

function Description({ product, showedEl }) {
  return (
    <div
      className={`${styles.description} ${
        showedEl === "descipt" ? "" : "hidden"
      }`}>
      <p>{product.description}</p>
    </div>
  );
}

function Reviews({ reviews, showedEl }) {
  return (
    <div
      className={`${styles.reviews} ${showedEl === "reviews" ? "" : "hidden"}`}>
      {reviews.map((review, i) => (
        <div key={`review-${i}`}>
          <FlexContainer margin={0} gap={1}>
            <img alt={review.userName} src={avatar} className="small-avatar" />

            <div>
              <p>{review.userName}</p>
              <span>⭐⭐⭐⭐⭐</span>
              <p>27/09/2024</p>
              <p style={{ marginTop: "1rem", width: "60%" }}>{review.text}</p>
            </div>
          </FlexContainer>
        </div>
      ))}
    </div>
  );
}

function ProductDetail() {
  // product details
  const [url] = useSearchParams();
  const productId = url.get("product_id");
  const {
    dataResponse: productDetail,
    isLoading: isLoading_productDetail,
    isError: isError_productDetail,
  } = useGetData(`products/${productId}`);
  const [amount, setAmount] = useState(1);

  // scroll to top of the page (to fix when click to recommend product, page stay in the same prosition)
  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [productId]
  );

  // recommened products
  // store category id in state
  const [categoryId, setCategoryId] = useState(null);

  // get category id when productDetail fully loaded
  useEffect(
    function () {
      if (productDetail.category) setCategoryId(productDetail.category.id);
    },
    [productDetail]
  );

  // get product by category
  const {
    dataResponse: recommenedProduct,
    isLoading: isLoading_recommenedProduct,
    isError: isError_recommenedProduct,
  } = useGetData(
    categoryId ? `products/?categoryId=${categoryId}&offset=0&limit=5` : null
  );

  return (
    <>
      <NavBar></NavBar>

      {/* product infor: start */}
      <FlexContainer elClass={styles.productInfor}>
        <RenderQueryData
          isError={isError_productDetail}
          isLoading={isLoading_productDetail}
          isEmptyList={productDetail.length === 0}>
          <Images product={productDetail}></Images>

          <div className={styles.productText}>
            <ProductInfor product={productDetail}></ProductInfor>

            <FlexContainer elClass={styles.amount}>
              <AmountInput
                amount={amount}
                setAmount={setAmount}
                id={"quantity"}></AmountInput>
              <p>100 available product(s)</p>
            </FlexContainer>

            <FlexContainer elClass={styles.btn} gap={2}>
              <ByNowBtn product={productDetail} amount={amount}></ByNowBtn>
              <ToCartBtn product={productDetail} amount={amount} />
            </FlexContainer>
          </div>
        </RenderQueryData>
      </FlexContainer>
      {/* product infor: end */}

      {/* desription & reviews: start */}
      <BlankDivider distance={4}></BlankDivider>
      <DescripAndReview product={productDetail}></DescripAndReview>
      <BlankDivider distance={2}></BlankDivider>
      {/* desription & reviews: end */}

      {/* recommened product: start */}
      <RenderQueryData
        isError={isError_recommenedProduct}
        isLoading={isLoading_recommenedProduct}
        isEmptyList={
          !Array.isArray(recommenedProduct) || recommenedProduct.length === 0
        }>
        <ListHeader
          title={"You may like"}
          url={`/test-covet-lux/products/?categoryId=${categoryId}&page=1`}></ListHeader>
        <FlexContainer>
          {Array.isArray(recommenedProduct) &&
            recommenedProduct.map((product, i) => (
              <ProductItem
                key={`recommen-${i}`}
                product={product}></ProductItem>
            ))}
        </FlexContainer>
      </RenderQueryData>
      {/* recommened product: end */}

      <BlankDivider></BlankDivider>
      <Footer></Footer>
    </>
  );
}

// handle add to cart
function handleAddToCart(product, amount, setSuccess, setAdd) {
  // get cart from local storage
  const data = JSON.parse(localStorage.getItem("cart"));
  let cart = data !== null ? data : [];

  // check is product already in cart => if there is => update amount
  function checkIfExists() {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == product.id) {
        if (cart[i].amount + amount > 20) return "reachLimit"; // return 'reach limit if total amount >20

        cart[i].amount += amount;
        setSuccess(true);
        return true;
      }
    }
    return false;
  }

  // if product not in cart => add to cart
  const result = checkIfExists();
  if (result === false) {
    const newProduct = {
      ...product,
      amount: amount,
    };
    cart.push(newProduct);

    // set message
    setSuccess(true);
  } else if (result === "reachLimit") {
    setSuccess(false);
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  // show message box
  setAdd(true);
}

export default ProductDetail;
