/** @format */

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";

import styles from "./NavBar.module.css";
import Img from "../Img";
import { useEffect, useState } from "react";
import getApiCall from "../../func/getApiCall";

function SuggestedProduct({ product }) {
  return (
    <Link
      to={`test-covet-lux/product?product_id=${product.id}`}
      className="flex items-center space-x-4 p-2 hover:bg-gray-100 cursor-pointer gap-3">
      <Img
        alt={product.title}
        imgSrc={product.images[0]}
        elClass="w-22 h-22 object-cover rounded"></Img>
      <div>
        <p className="text-2xl font-semibold">{product.title}</p>
        <p className="text-xl text-gray-600">${product.price}</p>
      </div>
    </Link>
  );
}

function SearchForm({ titleFilter, handleSearch, setSearchTxt }) {
  return (
    <Formik
      initialValues={{ title: titleFilter }}
      onSubmit={handleSearch}
      enableReinitialize>
      {({ handleChange, values }) => (
        <Form className={styles.search}>
          <Field
            name="title"
            type="text"
            placeholder="Search..."
            value={values.title}
            onChange={(e) => {
              handleChange(e);
              setSearchTxt(e.target.value);
            }}
          />

          <button type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </Form>
      )}
    </Formik>
  );
}

function SearchBar() {
  //get title filter in url
  const [searchQuery] = useSearchParams();
  const titleFilter = searchQuery.get("title");
  const navigate = useNavigate(); // Redirect to product page
  const [searchTxt, setSearchTxt] = useState(titleFilter || ""); // get title in search bar
  const [suggestions, setSuggestions] = useState([]); // suggestion list
  const [isLoading, setIsLoading] = useState(false); // loading statestate

  // Debounce effect for search input
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (searchTxt.trim()) {
        setIsLoading(true);
        try {
          // Fetch suggestions from the API
          const { dataResponse } = await getApiCall(
            `products/?title=${searchTxt}`
          );
          setSuggestions(dataResponse || []);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]); // Clear suggestions if search text is empty
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimer); // Cleanup on unmount or searchTxt change
  }, [searchTxt]);

  // navigate to product page after submit search form
  function handleSearch(values) {
    navigate(`/test-covet-lux/products?title=${values.title}`);
  }

  return (
    <div className="relative w-full max-w-md">
      <SearchForm
        handleSearch={handleSearch}
        setSearchTxt={setSearchTxt}
        titleFilter={titleFilter}></SearchForm>

      {/* Suggestions dropdown */}
      {searchTxt && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <p>Loading...</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <SuggestedProduct key={product.id} product={product} />
            ))
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
