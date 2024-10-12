/** @format */

import { Link } from "react-router-dom";
import styles from "./ListHeader.module.css";

function ListHeader({ title, url = "", className = null }) {
  return (
    <div className={`${styles.listHeader} ${className}`}>
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
