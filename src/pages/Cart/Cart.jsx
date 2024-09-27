/** @format */
import FlexContainer from "../../components/FlexContainer";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Cart.module.css";

function Cart() {
  return (
    <>
      <NavBar></NavBar>

      <FlexContainer>
        <div>product</div>
        <div>total container</div>
      </FlexContainer>

      <Footer></Footer>
    </>
  );
}

export default Cart;
