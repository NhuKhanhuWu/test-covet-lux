/** @format */
import SideBarAcc from "../../../components/SideBarAcc/SideBarAcc.jsx";
import FlexContainer from "../../../components/FlexContainer.jsx";
import { BlankDivider } from "../../../components/Divider.jsx";
import RenderQueryData from "../../../components/RenderQueryData.jsx";
import { EmptyOrder } from "./compoment_order/EmptyOrder.jsx";
import { Product } from "./compoment_order/Product.jsx";

import styles from "./Orders.module.css";
import { Link } from "react-router-dom";

import useGetDataList from "../../../hooks/useGetDataList.jsx";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";

function Order({ children }) {
  return <div className={styles.order}>{children}</div>;
}

function Orders() {
  // get data from localStorage
  const data = useSelector((state) => state.orders).orderArray;
  console.log(data);

  //   get product list from order
  const productList = data?.map((order) => order?.products);

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
      <BlankDivider></BlankDivider>

      {/* mobile side bar: start */}
      <MediaQuery maxWidth={539}>
        <SideBarAcc></SideBarAcc>
      </MediaQuery>
      {/* mobile side bar: end */}

      <FlexContainer>
        <MediaQuery minWidth={540}>
          <SideBarAcc></SideBarAcc>
        </MediaQuery>

        {/* order list */}
        <RenderQueryData
          isError={isError}
          isLoading={isLoading}
          isEmptyList={orders.length === 0}
          emptyMess={<EmptyOrder></EmptyOrder>}>
          <div className={styles.content}>
            {orders.map((order, iOrder) => (
              <Order key={`order-${iOrder}`}>
                {/* link to detal & status */}
                <div className={styles.orderHeader}>
                  <span>{data[iOrder].status.toUpperCase()}</span>
                  {" | "}
                  <Link
                    to={`/test-covet-lux/order?id=${data[iOrder].id}`}
                    className="link">
                    See detail
                  </Link>
                </div>

                {order.map((product, iProduct) => (
                  <Product
                    product={product}
                    key={`product-${iProduct}`}></Product>
                ))}

                <div className={styles.orderSumary}>
                  Total:
                  <span>
                    $
                    {data[iOrder].goodsTotal >= 100
                      ? data[iOrder].goodsTotal
                      : data[iOrder].goodsTotal + 10}
                    {/* {order.reduce(
                      (pre, curr) => (pre += curr.amount * curr.price),
                      0
                    )} */}
                  </span>
                </div>
              </Order>
            ))}
          </div>
        </RenderQueryData>
      </FlexContainer>

      <BlankDivider></BlankDivider>
    </>
  );
}

export default Orders;
