/** @format */

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { editTitle } from "../../redux/productsSlide";

import styles from "./NavBar.module.css";
import { Field, Formik } from "formik";

function SearchBar() {
  // search product by title
  const [tile, setTitle] = useState(
    useSelector((state) => state.products.titleFilter)
  );
  const dispacth = useDispatch();
  const navigate = useNavigate(); //redirect to product page
  const currTitleFilter = useRef(); //get current seach titlr

  function handleFilterTitle(e, title) {
    e.preventDefault();
    dispacth(editTitle(title));
    navigate("/test-covet-lux/products");
  }

  return (
    <Formik
      className={styles.search}
      onSubmit={(e) => handleFilterTitle(e, currTitleFilter.current.value)}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            ref={currTitleFilter}
            type="text"
            placeholder="Search..."
            value={tile}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SearchBar;
