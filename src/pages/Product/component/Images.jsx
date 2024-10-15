/** @format */

import MediaQuery, { useMediaQuery } from "react-responsive";
import styles from "../ProductDetail.module.css";

/** @format */
function ImgList({ product }) {
  const isMobile = useMediaQuery({ query: "(max-width: 650px)" });

  return (
    <>
      {product.images &&
        product.images.map((img, i) => (
          <div
            key={`img-${i}`}
            className={`${isMobile && "carousel-item"} ${i === 0 && "active"}`}>
            <img
              className={`img`}
              alt={product.title}
              src={img?.replace("[", "").replace('"', "")}
              loading="lazy"></img>
          </div>
        ))}
    </>
  );
}

function ImgCarourel({ product }) {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel">
      <ol className="carousel-indicators">
        {Array.from(Array(product.images.length)).map((_, i) => (
          <li
            key={`button-${i}`}
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className={i === 0 ? "active" : ""}></li>
        ))}
      </ol>
      <div className="carousel-inner">
        <ImgList product={product}></ImgList>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export function Images({ product }) {
  return (
    <div className={styles.productImg}>
      <MediaQuery minWidth={531}>
        <ImgList product={product}></ImgList>
      </MediaQuery>

      <MediaQuery maxWidth={530}>
        <ImgCarourel product={product}></ImgCarourel>
      </MediaQuery>
    </div>
  );
}
