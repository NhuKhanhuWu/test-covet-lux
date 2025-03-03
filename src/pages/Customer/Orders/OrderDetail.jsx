/** @format */
import { StatusBar } from "./component_orderDetail/StatusBar";
import styles from "./OrderDetail.module.css";
import { BlankDivider } from "../../../components/Divider";
import { Header } from "./component_orderDetail/Header";
import OrderSummary from "./component_orderDetail/OrderSummary";
import OrderProducts from "./component_orderDetail/OrderProducts";

import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderDetail() {
  // get order id
  const [url] = useSearchParams();
  const id = Number(url.get("id"));

  // get order detail
  const orderInfor = useSelector((state) => state.orders).orderArray.find(
    (order) => order.id === id
  );

  return (
    <>
      <NavBar></NavBar>
      <BlankDivider distance={4}></BlankDivider>

      <div className={styles.content}>
        <Header id={id}></Header>
        <StatusBar orderInfor={orderInfor}></StatusBar>

        <OrderSummary orderInfor={orderInfor}></OrderSummary>
        <OrderProducts orderInfor={orderInfor}></OrderProducts>
      </div>

      <BlankDivider distance={4}></BlankDivider>
      <Footer></Footer>
    </>
  );
}

export default OrderDetail;
