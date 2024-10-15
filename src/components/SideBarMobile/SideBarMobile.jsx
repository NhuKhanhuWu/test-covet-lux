/** @format */

import styles from "./SideBarMobile.module.css";

export function SideBarBtn({ callback, children, navHeight }) {
  return (
    <div
      style={{ top: `${navHeight}px` }}
      className={`${styles.openFilterBtn}`}
      onClick={() => callback()}>
      {children}
    </div>
  );
}

export function SideBar({ children, navHeight, isOpen, setOpen }) {
  return (
    <>
      <div
        className={`${styles.sideBar} ${isOpen && styles.open}`}
        style={{ top: `${navHeight - 9}px` }}>
        <div className={styles.closeBtn} onClick={() => setOpen(!isOpen)}>
          <span className="material-symbols-outlined">close</span>
        </div>

        {children}
      </div>
    </>
  );
}
