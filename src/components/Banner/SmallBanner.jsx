/** @format */

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Banner.module.css";

function SmallBanner({ header, imgUrl, url }) {
  return (
    <Link to={url} className={styles.smallBanner}>
      <img alt="small-banner" src={imgUrl} className={styles.img}></img>
      <div className={styles.smallBannerTxt}>
        <h2>{header}</h2>
      </div>
    </Link>
  );
}

SmallBanner.propTypes = {
  header: PropTypes.string,
  imgUrl: PropTypes.string,
  url: PropTypes.string,
};

export default SmallBanner;
