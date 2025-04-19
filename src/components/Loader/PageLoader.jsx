/** @format */
import logo from "../../../public/icon-only.webp";
import styles from "./Loader.module.css";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img
        src={logo}
        alt="Loading Logo"
        className={`w-40 h-40 object-contain ${styles["slow-spin"]}`}
      />
    </div>
  );
};

export default PageLoader;
