/** @format */
import { useEffect, useState } from "react";
import FlexContainer from "../../../components/FlexContainer";
import styles from "../OrderDetail.module.css";
import MediaQuery from "react-responsive";

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

function StatusTxt({ dateStr, statusProps }) {
  const date = new Date(dateStr);
  // Format the date
  const hoursMinutes = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dayMonthYear = date.toLocaleDateString("en-GB");

  // Combine the time and date
  const formattedDate = `${hoursMinutes} ${dayMonthYear}`;

  return (
    <>
      <p style={{ color: "black" }}>{statusProps?.statusTxt}</p>
      {dateStr !== null ? (
        <div style={{ color: "var(--gray)" }}>{formattedDate}</div>
      ) : (
        ""
      )}
    </>
  );
}

function StatusItem({ statusProps, color, dateStr }) {
  return (
    <div style={{ color: color }} className={styles.status}>
      {statusProps.icon}
      {/* medium tablet */}
      <MediaQuery minWidth={580}>
        <StatusTxt statusProps={statusProps} dateStr={dateStr}></StatusTxt>
      </MediaQuery>

      {/* small tablet, phone */}
      <MediaQuery maxWidth={579}>
        <div className={styles.statusTxt}>
          <StatusTxt statusProps={statusProps} dateStr={dateStr}></StatusTxt>
        </div>
      </MediaQuery>
    </div>
  );
}

function ShowStatusBtn() {
  function handleShowStatus() {
    // show/hide status
    const statusList = document.querySelectorAll(`.${styles.statusBar}`);
    statusList.forEach((status) => status.classList.toggle(styles.show));

    // rotate show detail btn icon
    document
      .querySelector(`.${styles.arrowIcon}`)
      .classList.toggle(styles.statusOpen);
  }
  return (
    <button className={styles.showStatusBtn} onClick={() => handleShowStatus()}>
      Status detail
      <span className={`material-symbols-outlined ${styles.arrowIcon}`}>
        keyboard_arrow_up
      </span>
    </button>
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

  // get process bar 'top' position
  const [iconHeight, setIconHeight] = useState(0);

  useEffect(function () {
    setIconHeight(
      document.querySelector(`.${styles.status}>span`).clientHeight
    );
  }, []);

  return (
    <div className={styles.statusBarContainer}>
      <MediaQuery maxWidth={530}>
        <ShowStatusBtn></ShowStatusBtn>
      </MediaQuery>
      <FlexContainer elClass={styles.statusBar} margin={null}>
        {statusBarData.map((status, i) => (
          <StatusItem
            dateStr={i <= currStatusIndex ? orderInfor.date : null}
            statusProps={status}
            key={`status-${i}`}
            color={
              i <= currStatusIndex ? "var(--green)" : "var(--gray)"
            }></StatusItem>
        ))}

        {/* process bar - medium tablet */}
        <MediaQuery minWidth={530}>
          <div
            className={styles.statusProcess}
            style={{ top: `${iconHeight / 2 + 2}px` }}></div>
        </MediaQuery>
      </FlexContainer>
    </div>
  );
}
