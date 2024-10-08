/** @format */
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
  statusTxt: "Payment information confirmed",
  icon: <span className="material-symbols-outlined">payments</span>,
  id: "confirmed",
});

const ePayStatus = generalStatus.toSpliced(1, 0, {
  statusTxt: "Order has been paid",
  icon: <span className="material-symbols-outlined">payments</span>,
  id: "payed",
});

function StatusItem({ statusProps, color }) {
  return (
    <div style={{ color: color, width: "10rem" }} className={styles.status}>
      {statusProps.icon}
      <p style={{ color: "black" }}>{statusProps.statusTxt}</p>
    </div>
  );
}

export function StatusBar({ currStatus, paymentMethob }) {
  // get sutable status bar
  const statusBarData = paymentMethob === "cod" ? codStatus : ePayStatus;

  // get curr status index
  const currStatusIndex = statusBarData.findIndex(
    (data) => data.id === currStatus
  );

  return (
    <FlexContainer elClass={styles.statusBar}>
      {statusBarData.map((status, i) => (
        <StatusItem
          statusProps={status}
          key={`status-${i}`}
          color={
            i <= currStatusIndex ? "var(--green)" : "var(--gray)"
          }></StatusItem>
      ))}
      <div className={styles.statusProcess}></div>
    </FlexContainer>
  );
}
