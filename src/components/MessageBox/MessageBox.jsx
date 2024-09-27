/** @format */
import styles from "./MessageBox.module.css";

function MessageBox({ children, isShowed, setShow }) {
  setTimeout(() => setShow(false), 3000);

  return (
    <div className={`${styles.messageBox} ${isShowed ? "" : "hidden"}`}>
      {children}
    </div>
  );
}

export default MessageBox;
