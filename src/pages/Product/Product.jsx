/** @format */
import FlexContainer from "../../components/FlexContainer.jsx";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer.jsx";
import SideBarProduct from "../../components/SideBar/SideBarProduct.jsx";
import { useSearchParams } from "react-router-dom";

function Product() {
  const [urlQuery] = useSearchParams();
  const categoryId = urlQuery.get("categoryId");
  const minPrice = urlQuery.get("minPrice");
  const maxPrice = urlQuery.get("maxPrice");
  const title = urlQuery.get("title");

  return (
    <>
      <NavBar></NavBar>

      <FlexContainer>
        <SideBarProduct></SideBarProduct>
        <div>product list</div>
      </FlexContainer>

      <Footer></Footer>
    </>
  );
}

export default Product;
