/** @format */

import useGetData from "../../hooks/useGetData";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./SideBarProduct.module.css";

/** @format */

function Category() {
  const { dataList: categories, isLoading, isError } = useGetData("categories");

  return (
    <div className={styles.category}>
      <p className={styles.sectionHeader}>Categories</p>
      {isLoading && <Loader></Loader>}
      {!isLoading && !isError && (
        <div className="columnContent">
          {categories.slice(0, 4).map((catgr, i) => (
            <Link
              key={`category-${i}`}
              to={`/test-covet-lux/products/?categoryId=${catgr.id}`}>
              {catgr.name}
            </Link>
          ))}
        </div>
      )}
      {isError && "error"}
    </div>
  );
}

function PriceRange() {
  return (
    <div>
      <p className={styles.sectionHeader}>Price range</p>

      <form className={`${styles.priceForm}`}>
        <div>
          <input
            type="number"
            min={0}
            placeholder="From"
            id="price_from"></input>

          <input type="number" min={0} placeholder="To" id="price_to"></input>
        </div>

        <button type="submit" className={`border-btn ${styles.submitBtn}`}>
          Search
        </button>
      </form>
    </div>
  );
}

function SideBarProduct() {
  return (
    <div className={styles.sideBar}>
      <Category></Category>
      <PriceRange></PriceRange>
    </div>
  );
}

export default SideBarProduct;
