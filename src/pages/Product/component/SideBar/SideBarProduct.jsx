/** @format */

import useGetData from "../../../../hooks/useGetData.jsx";
import styles from "./SideBarProduct.module.css";
import RenderQueryData from "../../../../components/RenderQueryData.jsx";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editCategory, editPrice } from "../../../../redux/productsSlide.js";

function Category() {
  // get category from data base
  const {
    dataResponse: categories,
    isLoading,
    isError,
  } = useGetData("categories");
  const [isExpanded, setExpanded] = useState(false);

  // highlight current category
  const currCategory = useSelector((state) => state.products.categoryFilter);

  // update filter in redux
  const dispatch = useDispatch();

  return (
    <div className={styles.category}>
      <p className={styles.sectionHeader}>Categories</p>
      <RenderQueryData
        isError={isError}
        isLoading={isLoading}
        isEmptyList={categories.length === 0}>
        <div className="columnContent" style={{ marginBottom: "1.5rem" }}>
          <p
            onClick={() => dispatch(editCategory(""))}
            className={currCategory === "" ? "orange-text" : ""}>
            All category
          </p>

          {categories.slice(0, 4).map((catgr, i) => (
            <p
              onClick={() => {
                dispatch(editCategory(catgr.id));
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
              key={`category-${i}`}
              className={catgr.id == currCategory ? "orange-text" : ""}>
              {catgr.name}
            </p>
          ))}

          {/* expanded part: start */}
          {isExpanded &&
            categories.slice(4).map((catgr, i) => (
              <p
                key={`category-more-${i}`}
                onClick={() => dispatch(editCategory(catgr.id))}
                className={catgr.id == currCategory ? "orange-text" : ""}>
                {catgr.name}
              </p>
            ))}
          {/* expanded part: end */}
        </div>
      </RenderQueryData>

      <button
        className="border-btn btn--small"
        onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? "Less" : "More"}
      </button>
    </div>
  );
}

function PriceRange() {
  const priceFrom = useRef(null);
  const priceTo = useRef(null);

  // update filter in redux
  const dispatch = useDispatch();
  function handlePriceFilter(e) {
    // check price range
    const from = priceFrom.current.value !== "" ? priceFrom.current.value : 0;
    const to =
      priceTo.current.value !== "" ? priceTo.current.value : 9999999999;

    e.preventDefault();
    dispatch(editPrice([from, to]));
  }

  return (
    <div>
      <p className={styles.sectionHeader}>Price range</p>

      <form
        className={`${styles.priceForm}`}
        onSubmit={(e) => handlePriceFilter(e)}>
        <div>
          <input
            type="number"
            min={0}
            placeholder="From"
            id="price_from"
            ref={priceFrom}></input>

          <input
            type="number"
            min={0}
            placeholder="To"
            id="price_to"
            ref={priceTo}></input>
        </div>

        <button type="submit" className={`border-btn btn--small`}>
          Search
        </button>
      </form>
    </div>
  );
}

function SideBarProduct({ children }) {
  return <div className={styles.sideBar}>{children}</div>;
}

export { SideBarProduct, Category, PriceRange };
