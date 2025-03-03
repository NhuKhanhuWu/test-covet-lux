/** @format */

import { useSearchParams } from "react-router-dom";
import FlexContainer from "../../../components/FlexContainer";

import styles from "./ProductDetail.module.css";
import useGetData from "../../../hooks/useGetData";
import RenderQueryData from "../../../components/RenderQueryData.jsx";
import { BlankDivider } from "../../../components/Divider.jsx";
import { AmountInput } from "../../../components/AmountInput/AmountInput.jsx";

// cart
import { addToCart } from "../../../redux/cartSlide";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// components
import { Images } from "./component/Images.jsx";
import { ProductInfor } from "./component/ProductInfor.jsx";
import { ByNowBtn } from "./component/ByNowBtn.jsx";
import { DescripAndReview } from "./component/DescripAndReview.jsx";
import { ToCartBtn } from "./component/ToCartBtn.jsx";
import RecommendProduct from "../../../components/RecommendProduct/RecommendProduct.jsx";

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
      setAmount(1);
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
      {/* desription & reviews: end */}

      {/* recommened product: start */}
      <RecommendProduct
        query={`products/?categoryId=${categoryId}&`}
        offset={0}></RecommendProduct>
      {/* recommened product: end */}

      <BlankDivider></BlankDivider>
    </>
  );
}

export default ProductDetail;
