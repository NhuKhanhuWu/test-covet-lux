/** @format */

import { Link } from "react-router-dom";
import useGetDataList from "../../../hooks/useGetDataList";

import styles from "../OrderDetail.module.css";
import FlexContainer from "../../../components/FlexContainer";
import RenderQueryData from "../../../components/RenderQueryData";
import Img from "../../../components/Img";

/** @format */
function Product({ product, amount }) {
  return (
    <FlexContainer gap={2} margin={0} elClass={styles.product}>
      <Img alt={product.title} imgSrc={product.images[0]}></Img>

      <FlexContainer margin={0} spaceBetween={true} gap={0}>
        <div className={styles.inforContent}>
          <Link
            to={`/test-covet-lux/product?product_id=${product.id}`}
            className={styles.productTitle}>
            {product.title}
          </Link>
          <p>X{amount}</p>
          <p>${product.price}</p>
        </div>

        <span>${amount * product.price}</span>
      </FlexContainer>
    </FlexContainer>
  );
}

function OrderProducts({ orderInfor }) {
  // get product list in order
  const orderProducts = orderInfor.products;

  //   get products infor
  const {
    dataResponse: productsList,
    isError,
    isLoading,
  } = useGetDataList(
    "products",
    orderProducts.map((product) => product.id)
  );

  return (
    <div className={styles.orderProducts}>
      <h2 className={styles.inforHeader}>Products</h2>

      <RenderQueryData
        isError={isError}
        isLoading={isLoading}
        isEmptyList={productsList.length === 0}>
        <div className={styles.productsContainer}>
          {productsList.map((product, i) => (
            <Product
              product={product}
              amount={orderInfor.products[i].amount}
              key={`product-${i}`}></Product>
          ))}
        </div>
      </RenderQueryData>
    </div>
  );
}

export default OrderProducts;
