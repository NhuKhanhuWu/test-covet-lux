/** @format */
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { StatusBar } from "./component_orderDetail/StatusBar";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./OrderDetail.module.css";
import { BlankDivider } from "../../components/Divider";
import { Header } from "./component_orderDetail/Header";

function OrderDetail() {
  // get order id
  const [url] = useSearchParams();
  const id = Number(url.get("id"));

  // get order detail
  const orderDetail = useSelector((state) => state.orders).orderArray.find(
    (order) => order.id === id
  );

  return (
    <>
      <NavBar></NavBar>
      <BlankDivider distance={4}></BlankDivider>

      <div className={styles.content}>
        <Header id={id}></Header>
        <StatusBar
          paymentMethob={orderDetail.payMethod}
          currStatus={orderDetail.status}></StatusBar>
      </div>

      <BlankDivider></BlankDivider>
      <Footer></Footer>
    </>
  );
}

export default OrderDetail;
