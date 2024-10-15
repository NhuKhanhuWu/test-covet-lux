/** @format */
import RenderQueryData from "../RenderQueryData";
import ListHeader from "../ListHeader/ListHeader";
import FlexContainer from "../FlexContainer";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./RecommendProduct.module.css";

import useGetData from "../../hooks/useGetData";
import { useMediaQuery } from "react-responsive";

function RecommendProduct({ query, offset }) {
  // responesive
  const isSmallTablet = useMediaQuery({
    query: "(max-width: 680px)",
  });
  const productQty = isSmallTablet ? 6 : 5;

  const { isLoading, isError, dataResponse } = useGetData(
    `${query}offset=${offset}&limit=${productQty}`
  );

  return (
    <RenderQueryData
      isError={isError}
      isLoading={isLoading}
      isEmptyList={dataResponse.length === 0}>
      <ListHeader
        title={"Best seller"}
        url={"/test-covet-lux/products"}></ListHeader>
      <FlexContainer elClass={styles.productContainer}>
        {dataResponse.map((product, i) => (
          <ProductItem product={product} key={`new-prd-${i}`}></ProductItem>
        ))}
      </FlexContainer>
    </RenderQueryData>
  );
}

export default RecommendProduct;
