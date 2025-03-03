/** @format */
import FlexContainer from "../../../components/FlexContainer.jsx";
import { Category, PriceRange } from "./component/SideBar/SideBarProduct.jsx";
import GridContainer from "../../../components/GridContainer.jsx";
import RenderQueryData from "../../../components/RenderQueryData.jsx";
import ProductItem from "../../../components/ProductItem/ProductItem.jsx";
import { BlankDivider } from "../../../components/Divider.jsx";
import {
  SideBar,
  SideBarBtn,
} from "../../../components/SideBarMobile/SideBarMobile.jsx";

import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { useSearchParams } from "react-router-dom";
import { useGetFilteredProduct } from "../../../hooks/useGetFilteredProduct.ts";

function SearchBarMobile({ setSearchOpen, isSearchOpen, navHeight }) {
  return (
    <>
      <MediaQuery maxWidth={650}>
        <SideBarBtn
          callback={() => setSearchOpen(!isSearchOpen)}
          navHeight={navHeight}>
          <span className="material-symbols-outlined">filter_list</span> Filter
        </SideBarBtn>
      </MediaQuery>

      <MediaQuery maxWidth={650}>
        <SideBar
          isOpen={isSearchOpen}
          setOpen={setSearchOpen}
          navHeight={navHeight}>
          <Category setOpen={setSearchOpen}></Category>
          <PriceRange setOpen={setSearchOpen}></PriceRange>
        </SideBar>
      </MediaQuery>
    </>
  );
}

function SearchBarDesktop({ isSearchOpen }) {
  return (
    <MediaQuery minWidth={651}>
      <div className={`${styles.sideBar} ${isSearchOpen && styles.open}`}>
        <Category></Category>
        <PriceRange></PriceRange>
      </div>
    </MediaQuery>
  );
}

function ProductList({ productList }) {
  return (
    <div style={{ margin: "auto" }}>
      <RenderQueryData
        isEmptyList={productList.length === 0 && status !== "loading"}>
        <GridContainer numCol={4} elClass={styles.productContainer}>
          {productList.map((product, i) => (
            <ProductItem key={`product-${i}`} product={product} />
          ))}
        </GridContainer>
      </RenderQueryData>
    </div>
  );
}

function Product() {
  // product list
  const [productList, setProductList] = useState([]);

  // search bar
  const [navHeight, setNavHeight] = useState(0);
  const [isSearchOpen, setSearchOpen] = useState(false);

  // get filter
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const category = params.category ?? "";
  const priceMin = params.priceMin ?? "";
  const priceMax = params.priceMax ?? "";
  const title = params.title ?? "";

  // loading state
  const [isLoading, setLoading] = useState(false);
  const [err, setError] = useState();

  // get filter product
  useEffect(() => {
    // top position of btn
    setNavHeight(document.querySelector("nav").clientHeight + 10);

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await useGetFilteredProduct(
          category,
          priceMin,
          priceMax,
          title
        );
        setProductList(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, priceMin, priceMax, title]); // Dependencies: runs when any filter changes

  return (
    <>
      {/* search bar for mobile: start */}
      <SearchBarMobile
        isSearchOpen={isSearchOpen}
        setSearchOpen={setSearchOpen}
        navHeight={navHeight}></SearchBarMobile>
      {/* search bar for mobile: end */}

      <FlexContainer gap={4} elClass={styles.productContainer}>
        {/* search bar for desktop */}
        <SearchBarDesktop isSearchOpen={isSearchOpen}></SearchBarDesktop>

        {/* products */}
        {!isLoading && <ProductList productList={productList}></ProductList>}
      </FlexContainer>

      <BlankDivider></BlankDivider>
    </>
  );
}

export default Product;
