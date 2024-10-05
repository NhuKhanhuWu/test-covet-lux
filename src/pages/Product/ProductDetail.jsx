/** @format */

import { useSearchParams } from "react-router-dom";
import FlexContainer from "../../components/FlexContainer";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./ProductDetail.module.css";
import useGetData from "../../hooks/useGetData";
import RenderQueryData from "../../components/RenderQueryData.jsx";
import { BlankDivider } from "../../components/Divider.jsx";
import { useEffect, useState } from "react";

// for test rendering reviews
import ListHeader from "../../components/ListHeader/ListHeader.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import { AmountInput } from "../../components/AmountInput/AmountInput.jsx";

// redux
import { addToCart } from "../../redux/cartSlide";
import { useDispatch } from "react-redux";

// components
import { Images } from "./component/Images.jsx";
import { ProductInfor } from "./component/ProductInfor.jsx";
import { ByNowBtn } from "./component/ByNowBtn.jsx";
import { DescripAndReview } from "./component/DescripAndReview.jsx";
import { ToCartBtn } from "./component/ToCartBtn.jsx";

function Stars({ rating }) {
  const arr = Array.from({ length: Math.floor(rating) });
  const ratingDemical = rating - Math.floor(rating);

  return (
    <div>
      <ion-icon name="star"></ion-icon>
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

  // add to cart handle
  const dispatch = useDispatch();

  function handleAddToCart(product, amount, setAdd) {
    // add product to cart
    dispatch(addToCart({ id: product.id, amount: amount }));

    // show message
    setAdd(true);
  }

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
              <ByNowBtn
                product={productDetail}
                amount={amount}
                handleAddToCart={handleAddToCart}></ByNowBtn>
              <ToCartBtn
                product={productDetail}
                amount={amount}
                handleAddToCart={handleAddToCart}
              />
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

export default ProductDetail;
