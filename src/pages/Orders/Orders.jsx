/** @format */
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SideBarAcc from "../../components/SideBarAcc/SideBarAcc.jsx";
import FlexContainer from "../../components/FlexContainer.jsx";
import { BlankDivider } from "../../components/Divider.jsx";

import styles from "./Orders.module.css";
import { Link } from "react-router-dom";
import useGetLocal from "../../hooks/useGetLocal.jsx";

import emptyBox from "../../../public/empty-box.png";
import useGetDataList from "../../hooks/useGetDataList.jsx";

function EmptyOrder() {
  return (
    <div className={styles.emptyMessage}>
      <img alt="empty box" src={emptyBox} style={{ width: "35%" }}></img>
      <p>There is no order yet!</p>
      <Link to="/test-covet-lux/products?page=1" className={`border-btn`}>
        Go shopping{" "}
        <ion-icon
          name="arrow-forward-outline"
          style={{ fontSize: "2rem" }}></ion-icon>
      </Link>
    </div>
  );
}

function Product({ product }) {
  return (
    <FlexContainer margin={2} gap={1} elClass={`${styles.product} gray-text`}>
      <img
        alt={product.title}
        src={product.images[0]}
        style={{ width: "7rem" }}></img>

      <div className={styles.productText}>
        <p className={styles.title}>{product.title}</p>
        <p>X{product.amount}</p>
        <p>${product.price}</p>
      </div>

      <p className={styles.price}>${product.price * product.amount}</p>
    </FlexContainer>
  );
}

function Order({ children }) {
  return <div className={styles.order}>{children}</div>;
}

function Orders() {
  //   get product list from order
  const productList = useGetLocal("orders")?.map((order) => order?.products);

  //   get product infor
  const idList = productList?.flat().map((product) => product.id);

  const { dataResponse, isLoading, isError } = useGetDataList(
    "products",
    idList
  );

  //   divide returned data to array as orders
  let tempData = [...dataResponse];
  let orders = productList?.map((item, iList) => {
    return tempData.splice(0, item.length).map((product, iTemp) => {
      return { ...product, amount: productList[iList][iTemp].amount };
    });
  });

  return (
    <>
      <NavBar></NavBar>
      <BlankDivider></BlankDivider>
      <FlexContainer>
        <SideBarAcc></SideBarAcc>

        <div className={styles.content}>
          {productList === undefined ? (
            <EmptyOrder></EmptyOrder>
          ) : (
            orders.map((order, iOrder) => (
              <Order key={`order-${iOrder}`}>
                {order.map((product, iProduct) => (
                  <Product
                    product={product}
                    key={`product-${iProduct}`}></Product>
                ))}

                {order.reduce(
                  (pre, curr) => (pre += curr.amount * curr.price),
                  0
                )}
              </Order>
            ))
          )}
        </div>
      </FlexContainer>

      <BlankDivider></BlankDivider>
      <Footer></Footer>
    </>
  );
}

export default Orders;
