/** @format */
import FlexContainer from "../../components/FlexContainer.jsx";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer.jsx";
import { Category, PriceRange } from "./component/SideBar/SideBarProduct.jsx";
import GridContainer from "../../components/GridContainer.jsx";
import RenderQueryData from "../../components/RenderQueryData.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";
import { BlankDivider } from "../../components/Divider.jsx";

import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchFilteredProducts } from "../../redux/productsSlide.js";
import { useDispatch } from "react-redux";
import MediaQuery from "react-responsive";

function Product() {
  const dispatch = useDispatch();
  // get filter
  const titleFilter = useSelector((state) => state.products.titleFilter);
  const categoryFilter = useSelector((state) => state.products.categoryFilter);
  const priceFilter = useSelector((state) => state.products.priceFilter);

  // get product
  const productList = useSelector((state) => state.products.items);

  // get product list
  useEffect(
    function () {
      dispatch(fetchFilteredProducts());
    },
    [categoryFilter, dispatch, priceFilter, titleFilter]
  );

  // render products
  const status = useSelector((state) => state.products.status);

  // open & close search bar
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <NavBar></NavBar>

      {/* search bar for mobile: start */}
      <MediaQuery maxWidth={650}>
        <div
          className={`${styles.openFilterBtn}`}
          onClick={() => setSearchOpen(!isSearchOpen)}>
          <span className="material-symbols-outlined">filter_list</span> Filter
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={650}>
        <div className={`${styles.sideBar} ${isSearchOpen && styles.open}`}>
          <div
            className={styles.closeBtn}
            onClick={() => setSearchOpen(!isSearchOpen)}>
            <span className="material-symbols-outlined">close</span>
          </div>
          <Category setOpen={setSearchOpen}></Category>
          <PriceRange setOpen={setSearchOpen}></PriceRange>
        </div>
      </MediaQuery>
      {/* search bar for mobile: start */}

      <FlexContainer
        spaceBetween={true}
        gap={5}
        elClass={styles.productContainer}>
        <MediaQuery minWidth={651}>
          <div className={`${styles.sideBar} ${isSearchOpen && styles.open}`}>
            <Category></Category>
            <PriceRange></PriceRange>
          </div>
        </MediaQuery>

        <GridContainer numCol={4} elClass={styles.productContainer}>
          <RenderQueryData
            isError={status === "failed"}
            isLoading={status === "loading"}
            isEmptyList={productList.length === 0}>
            {productList.map((product, i) => (
              <ProductItem key={`product-${i}`} product={product} />
            ))}
          </RenderQueryData>
        </GridContainer>
      </FlexContainer>

      <BlankDivider></BlankDivider>

      <Footer></Footer>
    </>
  );
}

export default Product;
