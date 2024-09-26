/** @format */
import FlexContainer from "../../components/FlexContainer.jsx";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer.jsx";
import SideBarProduct from "../../components/SideBar/SideBarProduct.jsx";
import { Link, useSearchParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData.jsx";
import GridContainer from "../../components/GridContainer.jsx";
import RenderQueryData from "../../components/RenderQueryData.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import { BlankDivider } from "../../components/Divider.jsx";

import styles from "./Product.module.css";

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
  const {
    dataResponse: productList,
    isError,
    isLoading,
  } = useGetData(`products/${query}&offset=${12 * (page - 1)}&limit=12`);

  return (
    <>
      <NavBar></NavBar>

      <FlexContainer gap={5}>
        <SideBarProduct
          curPriceFrom={minPrice}
          curPriceTo={maxPrice}></SideBarProduct>
        <GridContainer numCol={4}>
          <RenderQueryData
            isError={isError}
            isLoading={isLoading}
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
