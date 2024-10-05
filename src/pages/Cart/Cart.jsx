/** @format */
import { useEffect, useState } from "react";
import styles from "./Cart.module.css";

// general component
import FlexContainer from "../../components/FlexContainer";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

// page component
import { BlankDivider } from "../../components/Divider";
import useGetDataList from "../../hooks/useGetDataList.jsx";
import { EmptyCart } from "./component/EmptyCart.jsx";
import { ProductContainer } from "./component/ProductContainer.jsx";
import { Product } from "./component/Product.jsx";
import { TotalContainer } from "./component/TotalContainer.jsx";
import { CheckoutContainer } from "./component/CheckoutContainer.jsx";
import { TotalDetail } from "./component/TotalDetail.jsx";

// redux
import { useSelector } from "react-redux";

function Cart() {
  const cartArray = useSelector((state) => state.cart).productArray;
  const idList = cartArray?.map((item) => item.id);
  const { dataResponse } = useGetDataList("products", idList);

  const [productList, setProductList] = useState([]);

  // Use useEffect to update productList when dataResponse changes
  useEffect(() => {
    if (dataResponse && dataResponse.length > 0) {
      const newList = dataResponse?.map((data, i) => {
        return { ...data, amount: cartArray[i].amount };
      });
      setProductList(newList);
    }
  }, [dataResponse]);

  // caculate total amount & total cost
  const totalCost = productList.reduce(
    (preTotal, curr) => (preTotal += curr.amount * curr.price),
    0
  );

  // store total money (cost+shipping-discount...) in state
  const [totalMoney, setTotalMoney] = useState(0);

  const isEmpty = productList === null || productList.length === 0;

  return (
    <>
      <NavBar></NavBar>

      <BlankDivider distance={1}></BlankDivider>
      {isEmpty ? (
        <EmptyCart></EmptyCart>
      ) : (
        <>
          <FlexContainer gap={2}>
            <ProductContainer>
              {productList !== null && (
                <>
                  {productList.map((product, i) => (
                    <Product
                      setProductList={setProductList}
                      index={i}
                      product={product}
                      productList={productList}
                      key={`product-${product.id}`}></Product>
                  ))}
                </>
              )}
            </ProductContainer>
            <div className={styles.totalContainer}>
              <TotalContainer>
                <TotalDetail
                  totalMoney={totalMoney}
                  setTotalMoney={setTotalMoney}
                  totalCost={totalCost}></TotalDetail>
              </TotalContainer>
              <CheckoutContainer></CheckoutContainer>
            </div>
          </FlexContainer>
        </>
      )}
      <BlankDivider distance={3}></BlankDivider>

      <Footer></Footer>
    </>
  );
}

export default Cart;
