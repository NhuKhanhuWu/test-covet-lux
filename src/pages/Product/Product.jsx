/** @format */
import FlexContainer from "../../components/FlexContainer.jsx";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer.jsx";
import {
  SideBarProduct,
  Category,
  PriceRange,
} from "../../components/SideBar/SideBarProduct.jsx";
import { Link, useSearchParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData.jsx";
import GridContainer from "../../components/GridContainer.jsx";
import RenderQueryData from "../../components/RenderQueryData.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import { BlankDivider } from "../../components/Divider.jsx";

import styles from "./Product.module.css";
import { useEffect, useReducer, useState } from "react";

function Pagination({ query, count, currPage = null }) {
  const arr = Array.from({ length: count });
  // const currPage

  return (
    <div className={styles.pagination}>
      {arr.map((_, i) => (
        <Link
          to={`${query}&page=${i + 1}`}
          key={`paginate-${i}`}
          className={`border-btn--small border-btn ${
            currPage == i + 1 ? styles.currPage : ""
          }`}>
          {i + 1}
        </Link>
      ))}
    </div>
  );
}

// store product data in reducer
const initProduct = {
  productList: [],
  error: false,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "updateData":
      return {
        ...state,
        productList: action.productList,
        error: action.error,
        loading: action.loading,
      };

    default:
      console.error("Unknown action");
  }
}

function Product() {
  // get filter query
  const [urlQuery] = useSearchParams();

  const categoryId =
    urlQuery.get("categoryId") === null ? "" : urlQuery.get("categoryId");
  const minPrice =
    urlQuery.get("price_min") === null ? "" : urlQuery.get("price_min");
  const maxPrice =
    urlQuery.get("price_max") === null ? "" : urlQuery.get("price_max");
  const title = urlQuery.get("title") === null ? "" : urlQuery.get("title");
  const page = urlQuery.get("page") === null ? 1 : urlQuery.get("page");

  const query = `?price_min=${minPrice}&price_max=${maxPrice}&title=${title}&categoryId=${categoryId}`;

  // get product by query
  const { dataResponse, isError, isLoading } = useGetData(
    `products/${query}&offset=${12 * (page - 1)}&limit=12`
  );

  // store data in reducer
  const [{ productList, error, loading }, dispacth] = useReducer(
    reducer,
    initProduct
  );
  useEffect(
    function () {
      dispacth({
        type: "updateData",
        productList: dataResponse,
        error: isError,
        loading: isLoading,
      });
    },
    [dataResponse, isError, isLoading]
  );

  return (
    <>
      <NavBar></NavBar>

      <FlexContainer gap={5}>
        <SideBarProduct>
          <Category></Category>
          <PriceRange dispacth={dispacth}></PriceRange>
        </SideBarProduct>

        <GridContainer numCol={4}>
          <RenderQueryData
            isError={error}
            isLoading={loading}
            isEmptyList={productList.length === 0}>
            {productList.map((product, i) => (
              <ProductItem key={`product-${i}`} product={product} />
            ))}
          </RenderQueryData>
        </GridContainer>
      </FlexContainer>

      <BlankDivider distance={3}></BlankDivider>
      <Pagination query={query} count={3} currPage={page}></Pagination>
      <BlankDivider></BlankDivider>

      <Footer></Footer>
    </>
  );
}

export default Product;
