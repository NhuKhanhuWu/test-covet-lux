/** @format */

import FlexContainer from "../../../components/FlexContainer";
import RenderQueryData from "../../../components/RenderQueryData";
import useGetDataList from "../../../hooks/useGetDataList";
import styles from "../OrderDetail.module.css";

/** @format */
function Product({ product, amount }) {
  return (
    <FlexContainer gap={2} margin={0} elClass={styles.product}>
      <img
        alt={product.title}
        src={product.images[0].replace("[", "").replace('"', "")}></img>

      <FlexContainer margin={0} spaceBetween={true} gap={0}>
        <div className={styles.inforContent}>
          <p className={styles.productTitle}>{product.title}</p>
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
