/** @format */

import useGetData from "../../../../hooks/useGetData.jsx";
import styles from "./SideBarProduct.module.css";
import RenderQueryData from "../../../../components/RenderQueryData.jsx";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { editCategory, editPrice } from "../../../../redux/productsSlide.js";
import MediaQuery from "react-responsive";

function Category({ setOpen = null }) {
  // get category from data base
  const {
    dataResponse: categories,
    isLoading,
    isError,
  } = useGetData("categories");

  // update filter in redux
  const dispatch = useDispatch();

  function handleCategoryFilter(category) {
    dispatch(editCategory(category));
    setOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <div className={styles.category}>
      <p className={styles.sectionHeader}>Categories</p>
      <RenderQueryData
        isError={isError}
        isLoading={isLoading}
        isEmptyList={categories.length === 0}>
        <select
          className={styles.categorySelector}
          onChange={(e) => handleCategoryFilter(e.target.value)}>
          <option value={""}>All category</option>
          {categories.map((catgr, i) => (
            <option value={catgr.id} key={`catgr${i}`}>
              {catgr.name}
            </option>
          ))}
        </select>
      </RenderQueryData>
    </div>
  );
}

function PriceRange({ setOpen = null }) {
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

    // close filter bar
    setOpen(false);
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

export { Category, PriceRange };
