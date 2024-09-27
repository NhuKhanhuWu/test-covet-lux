/** @format */

import { Link } from "react-router-dom";
import styles from "./ListHeader.module.css";

function ListHeader({ title, url = "" }) {
  return (
    <div className={styles.listHeader}>
      <h3>{title}</h3>
      <Link to={url}>See more</Link>
    </div>
  );
}

export default ListHeader;
