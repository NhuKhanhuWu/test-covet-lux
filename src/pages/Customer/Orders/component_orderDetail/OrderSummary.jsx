/** @format */

import FlexContainer from "../../../../components/FlexContainer";
import styles from "../OrderDetail.module.css";

function OrderSummary({ orderInfor }) {
  //   order shipment
  const address = `${orderInfor.specificAddress}, ${orderInfor.ward}, ${orderInfor.province}, ${orderInfor.city}`;

  return (
    <>
      <div className={styles.address}>
        <h2 className={styles.inforHeader}>Delivery</h2>

        <ul className={styles.inforContent}>
          <li>
            <span>Name: {orderInfor.name}</span>
          </li>
          <li>
            <span>Phone: {orderInfor.phone}</span>
          </li>
          <li>
            <span>Address: {address}</span>
          </li>
        </ul>
      </div>

      {/* payment */}
      <div className={styles.payment}>
        <h2 className={styles.inforHeader}>Payment</h2>

        <div className={styles.inforContent}>
          <FlexContainer spaceBetween={true} margin={0}>
            <span>Total cost of goods</span>
            <span>${orderInfor.goodsTotal}</span>
          </FlexContainer>

          <FlexContainer spaceBetween={true} margin={0}>
            <span>Delivery fee</span>
            <span>${orderInfor.deliverFee}</span>
          </FlexContainer>

          <FlexContainer spaceBetween={true} margin={0}>
            <span>Total</span>
            <span className={styles.total}>
              {orderInfor.deliverFee + orderInfor.goodsTotal}
            </span>
          </FlexContainer>

          <FlexContainer spaceBetween={true} margin={0}>
            <span>Methob</span>
            <span>{orderInfor.paymentMethod.toUpperCase()}</span>
          </FlexContainer>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
