/** @format */

import { Link } from "react-router-dom";
import styles from "./ListHeader.module.css";

function ListHeader({ title, url = "", className = null, margin = 5 }) {
  return (
    <div
      className={`${styles.listHeader} ${className}`}
      style={{ margin: `${margin}rem` }}>
      <h3>{title}</h3>
      {url && (
        <Link to={url} className="link">
          See more
        </Link>
      )}
    </div>
  );
}

export default ListHeader;
