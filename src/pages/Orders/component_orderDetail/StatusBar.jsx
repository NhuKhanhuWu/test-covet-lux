/** @format */
import { useEffect, useState } from "react";
import FlexContainer from "../../../components/FlexContainer";
import styles from "../OrderDetail.module.css";

const generalStatus = [
  {
    statusTxt: "Order placed",
    icon: <span className="material-symbols-outlined">fact_check</span>,
    id: "placed",
  },

  {
    statusTxt: "Delivering",
    icon: <span className="material-symbols-outlined">local_shipping</span>,
    id: "delivering",
  },
  {
    statusTxt: "Received",
    icon: <span className="material-symbols-outlined">system_update_alt</span>,
    id: "received",
  },
];

const codStatus = generalStatus.toSpliced(1, 0, {
  statusTxt: "Payment confirmed",
  icon: <span className="material-symbols-outlined">payments</span>,
  id: "confirmed",
});

const ePayStatus = generalStatus.toSpliced(1, 0, {
  statusTxt: "Order has been paid",
  icon: <span className="material-symbols-outlined">payments</span>,
  id: "paid",
});

function StatusItem({ statusProps, color, dateStr }) {
  const date = new Date(dateStr);

  // Format the date
  const hoursMinutes = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dayMonthYear = date.toLocaleDateString("en-GB");

  // Combine the time and date
  const formattedDate = `${hoursMinutes} ${dayMonthYear}`;
  console.log(color);

  return (
    <div style={{ color: color, width: "10rem" }} className={styles.status}>
      {statusProps.icon}
      <p style={{ color: "black" }}>{statusProps.statusTxt}</p>
      {dateStr !== null ? (
        <div style={{ color: "var(--gray)" }}>{formattedDate}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export function StatusBar({ orderInfor }) {
  // get sutable status bar
  const statusBarData = orderInfor.payMethod === "cod" ? codStatus : ePayStatus;

  // get curr status index
  const currStatus = orderInfor.status;
  const currStatusIndex = statusBarData.findIndex(
    (data) => data.id === currStatus
  );
  console.log(currStatus, statusBarData);

  // get process bar 'top' position
  const [iconHeight, setIconHeight] = useState(0);

  useEffect(function () {
    setIconHeight(
      document.querySelector(`.${styles.status}>span`).clientHeight
    );
  }, []);

  return (
    <FlexContainer elClass={styles.statusBar} margin={0}>
      {statusBarData.map((status, i) => (
        <StatusItem
          dateStr={i <= currStatusIndex ? orderInfor.date : null}
          statusProps={status}
          key={`status-${i}`}
          color={
            i <= currStatusIndex ? "var(--green)" : "var(--gray)"
          }></StatusItem>
      ))}
      <div
        className={styles.statusProcess}
        style={{ top: `${iconHeight / 2}px` }}></div>
    </FlexContainer>
  );
}
