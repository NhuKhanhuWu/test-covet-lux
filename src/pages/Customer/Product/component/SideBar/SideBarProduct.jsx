/** @format */

import useGetData from "../../../../../hooks/useGetData.jsx";
import styles from "./SideBarProduct.module.css";
import RenderQueryData from "../../../../../components/RenderQueryData.jsx";
import { useSearchParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";

function Category({ setOpen = null }) {
  // get category from data base
  const {
    dataResponse: categories,
    isLoading,
    isError,
  } = useGetData("categories");

  // get current filter
  const [searchQuery, setQuery] = useSearchParams();
  const currFilter = searchQuery.get("category") || "";

  // change category handler
  function handleCategoryFilter(category) {
    // set new url
    const newParams = new URLSearchParams(searchQuery);
    newParams.set("category", category);

    // Update the URL search parameters
    setQuery(newParams);

    // close modal & scroll to top
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
            <option
              value={catgr.id}
              key={`catgr${i}`}
              selected={catgr.id == currFilter}>
              {catgr.name}
            </option>
          ))}
        </select>
      </RenderQueryData>
    </div>
  );
}

function PriceRange({ setOpen = () => {} }) {
  const [searchQuery, setQuery] = useSearchParams();
  const priceMin = searchQuery.get("priceMin") || "";
  const priceMax = searchQuery.get("priceMax") || "";

  // update price range
  function handlePriceFilter(values) {
    // set new url
    const newParams = new URLSearchParams(searchQuery);
    newParams.set("priceMin", values.priceMin);
    newParams.set("priceMax", values.priceMax);

    // Update the URL search parameters
    setQuery(newParams);

    // close modal & scroll to top
    setOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <div>
      <p className={styles.sectionHeader}>Price range</p>

      <Formik
        initialValues={{ priceMin: priceMin, priceMax: priceMax }}
        className={`${styles.priceForm}`}
        onSubmit={handlePriceFilter}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <Field
                type="number"
                min={0}
                placeholder="From"
                id="price_from"
                name="priceMin"
                className={styles.priceInput}></Field>

              <Field
                type="number"
                min={0}
                placeholder="To"
                id="price_to"
                name="priceMax"
                className={styles.priceInput}></Field>
            </div>

            <button type="submit" className={`border-btn btn--small`}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { Category, PriceRange };
