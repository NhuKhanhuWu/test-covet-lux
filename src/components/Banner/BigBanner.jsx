/** @format */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Banner.module.css";

function BigBanner({ imgUrl, header, text, url }) {
  return (
    <div className={styles.bigBanner}>
      <img alt="jeans-sweater" src={imgUrl} className={styles.img}></img>

      <div className={styles.bigBannerTxt}>
        <h1>{header}</h1>
        <p>{text}</p>
        <Link to={url} className="border-btn">
          BUY NOW <ion-icon name="arrow-forward-outline"></ion-icon>
        </Link>
      </div>
    </div>
  );
}

BigBanner.propTypes = {
  imgUrl: PropTypes.string,
  header: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
};

export default BigBanner;
