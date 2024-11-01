/** @format */
import FlexContainer from "../../components/FlexContainer.jsx";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer.jsx";
import { Category, PriceRange } from "./component/SideBar/SideBarProduct.jsx";
import GridContainer from "../../components/GridContainer.jsx";
import RenderQueryData from "../../components/RenderQueryData.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import { BlankDivider } from "../../components/Divider.jsx";
import {
  SideBar,
  SideBarBtn,
} from "../../components/SideBarMobile/SideBarMobile.jsx";

import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchFilteredProducts,
  increasePage,
  resetProducts,
  resetFilter,
} from "../../redux/productsSlide.js";
import { useDispatch } from "react-redux";
import usePageExit from "../../hooks/usePageExit.jsx";
import MediaQuery from "react-responsive";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/Loader/Loader.jsx";

function Product() {
  const dispatch = useDispatch();
  // get filter
  const titleFilter = useSelector((state) => state.products.titleFilter);
  const categoryFilter = useSelector((state) => state.products.categoryFilter);
  const priceFilter = useSelector((state) => state.products.priceFilter);

  // get product
  const {
    items: productList,
    status,
    hasMore,
  } = useSelector((state) => state.products);

  // search bar
  const [navHeight, setNavHeight] = useState(0);
  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(
    function () {
      // top position of btn
      setNavHeight(document.querySelector("nav").clientHeight + 10);

      // reset when filter change
      dispatch(resetProducts());

      // get product list
      dispatch(fetchFilteredProducts());

      // scroll to top
      window.scrollTo(0, 0);
    },
    [categoryFilter, dispatch, priceFilter, titleFilter]
  );

  // Load more products when user scrolls down
  const fetchMoreData = () => {
    if (status !== "loading" && status != "failed") {
      dispatch(increasePage()); // Increment the page
      dispatch(fetchFilteredProducts()); // Fetch more products
    }
  };

  // reset filter when leave page
  usePageExit(dispatch(resetFilter()));

  return (
    <>
      <NavBar></NavBar>

      {/* search bar for mobile: start */}
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
      {/* search bar for mobile: end */}

      <FlexContainer gap={4} elClass={styles.productContainer}>
        {/* search bar for desktop: start */}
        <MediaQuery minWidth={651}>
          <div className={`${styles.sideBar} ${isSearchOpen && styles.open}`}>
            <Category></Category>
            <PriceRange></PriceRange>
          </div>
        </MediaQuery>
        {/* search bar for desktop:  end */}

        {/* products: start */}
        <div style={{ margin: "auto" }}>
          <InfiniteScroll
            dataLength={productList.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader></Loader>}>
            <RenderQueryData
              isEmptyList={productList.length === 0 && status !== "loading"}
              emptyMess={true}>
              <GridContainer numCol={4} elClass={styles.productContainer}>
                {productList.map((product, i) => (
                  <ProductItem key={`product-${i}`} product={product} />
                ))}
              </GridContainer>
            </RenderQueryData>
          </InfiniteScroll>
        </div>
        {/* products: end */}
      </FlexContainer>

      <BlankDivider></BlankDivider>

      <Footer></Footer>
    </>
  );
}

export default Product;
