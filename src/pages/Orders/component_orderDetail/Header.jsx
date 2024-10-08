/** @format */

import { Link } from "react-router-dom";

import styles from "../OrderDetail.module.css";
import FlexContainer from "../../../components/FlexContainer";

export function Header({ id }) {
  return (
    <FlexContainer spaceBetween={true} margin={0} elClass={styles.header}>
      <Link to="/covet-lux-fake-api/orders" className={styles.backBtn}>
        <span className="material-symbols-outlined">arrow_back</span> BACK
      </Link>

      <div>
        <span>ORDER ID: {id}</span>
      </div>
    </FlexContainer>
  );
}
