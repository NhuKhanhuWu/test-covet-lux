/** @format */

import useGetData from "../../hooks/useGetData";
import { Link } from "react-router-dom";
import styles from "./SideBarProduct.module.css";
import RenderQueryData from "../RenderQueryData.jsx";
import { useEffect, useRef, useState } from "react";

function Category() {
  const {
    dataResponse: categories,
    isLoading,
    isError,
  } = useGetData("categories");
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div className={styles.category}>
      <p className={styles.sectionHeader}>Categories</p>
      <RenderQueryData
        isError={isError}
        isLoading={isLoading}
        isEmptyList={categories.length === 0}>
        <div className="columnContent" style={{ marginBottom: "1.5rem" }}>
          {categories.slice(0, 4).map((catgr, i) => (
            <Link
              key={`category-${i}`}
              to={`/test-covet-lux/products/?categoryId=${catgr.id}`}>
              {catgr.name}
            </Link>
          ))}

          {/* expanded part: start */}
          {isExpanded &&
            categories.slice(4).map((catgr, i) => (
              <Link
                key={`category-${i}`}
                to={`/test-covet-lux/products/?categoryId=${catgr.id}`}>
                {catgr.name}
              </Link>
            ))}
          {/* expanded part: end */}
        </div>
      </RenderQueryData>

      <button
        className="border-btn border-btn--small"
        onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? "Less" : "More"}
      </button>
    </div>
  );
}

function PriceRange({ curPriceTo = null, curPriceFrom = null }) {
  let priceFrom = useRef(null);
  let priceTo = useRef(null);

  useEffect(
    function () {
      priceFrom.current.value = curPriceFrom;
      priceTo.current.value = curPriceTo;
    },
    [curPriceFrom, curPriceTo]
  );

  function handlePriceFilter(e) {
    e.preventDefault();
    window.location.href = `/test-covet-lux/products/?price_min=${priceFrom.current.value}&price_max=${priceTo.current.value}`;
  }

  useEffect(function () {});

  return (
    <div>
      <p className={styles.sectionHeader}>Price range</p>

      <form className={`${styles.priceForm}`}>
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

        <button
          type="submit"
          className={`border-btn border-btn--small`}
          onClick={(e) => handlePriceFilter(e)}>
          Search
        </button>
      </form>
    </div>
  );
}

function SideBarProduct({ curPriceFrom = null, curPriceTo = null }) {
  return (
    <div className={styles.sideBar}>
      <Category></Category>
      <PriceRange
        curPriceFrom={curPriceFrom}
        curPriceTo={curPriceTo}></PriceRange>
    </div>
  );
}

export default SideBarProduct;
