/** @format */

import useGetDataList from "../../../hooks/useGetDataList";

// general component
import FlexContainer from "../../../components/FlexContainer";
import RenderQueryData from "../../../components/RenderQueryData";
import ListHeader from "../../../components/ListHeader/ListHeader";
import { BlankDivider } from "../../../components/Divider";

// page component
import styles from "./Checkout.module.css";
import PersonalInfor from "./component/PersonalInfor.jsx";
import Payment from "./component/Payment";
import ProductList from "./component/ProductList";
import Total from "./component/Total";
import { Link, useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../redux/cartSlide";
import { addOrder } from "../../../redux/ordersSlide";
import { Form, Formik } from "formik";
import useGetLocal from "../../../hooks/useGetLocal.jsx";
import {
  cardCodeValidate,
  expiredDateValidate,
  nameValidate,
  payMethodValidate,
  phoneValidate,
  txtNumValidate,
  visaPassValidate,
} from "../../../components/InputField/Validate.js";
import * as Yup from "yup";

// validation
const whenOnlinePayment = (schema) =>
  schema.when("paymentMethod", {
    is: "ePayment",
    then: (s) => s.required("This field is required"),
    otherwise: (s) => s.notRequired(),
  });
const validationFields = {
  name: nameValidate,
  phone: phoneValidate,
  city: txtNumValidate,
  province: txtNumValidate,
  ward: txtNumValidate,
  specificAddress: txtNumValidate,
  paymentMethod: payMethodValidate,
  cardCode: whenOnlinePayment(cardCodeValidate),
  expiredDate: whenOnlinePayment(expiredDateValidate),
  password: whenOnlinePayment(visaPassValidate),
  ownerName: whenOnlinePayment(nameValidate),
};
const validationSchema = Yup.object().shape(validationFields);

function BuyBtn() {
  // check if user login
  const isLogin = useSelector((state) => state.user).user.id !== undefined;

  return (
    <div className={styles.btnContainer}>
      <button
        type="submit"
        form="paymentInfor"
        className={`${styles.buyBtn} fill-btn`}>
        BUY NOW
      </button>

      {!isLogin && (
        <p
          className={`${styles.noteTxt} copyRight`}
          style={{ textAlign: "center" }}>
          <Link to="/test-covet-lux/login" className="link">
            Login
          </Link>{" "}
          to track your order.
        </p>
      )}
    </div>
  );
}

function Checkout() {
  // get product from redux & database
  const cart = useSelector((state) => state.cart).productArray;
  const { dataResponse, isLoading, isError } = useGetDataList(
    "products",
    cart.map((item) => item.id)
  );

  // get personal infor from local storage
  const infor = useGetLocal("personal_infor");
  const initPersonalInfor = {
    // pre-fill form
    name: infor?.name,
    phone: infor?.phone,
    city: infor?.city,
    province: infor?.provine,
    ward: infor?.ward,
    specificAddress: infor?.specificAddress,
  };

  const dispatch = useDispatch(); // store orders, clear cart

  // handle checkout
  const productList = dataResponse.map((item, i) => {
    return {
      ...item,
      amount: cart[i].amount,
    };
  });

  const total = productList.reduce(
    (pre, curr) => (pre += curr.amount * curr.price),
    0
  ); // calc total money
  const orderId = new Date().valueOf(); // create orderId

  // redirect to 'by_success' page
  const redirect = useNavigate();
  function handleBuy(values) {
    // store order
    const { ...newOrder } = values;

    dispatch(
      addOrder({
        ...newOrder,
        id: orderId,
        products: cart,
        status: "placed",
        goodsTotal: total,
        deliverFee: total >= 100 ? 0 : 5,
      })
    );

    // clear cart
    dispatch(reset());

    redirect;
    redirect(`/test-covet-lux/buy_success?order_id=${orderId}`, {
      replace: true,
    });
  }

  return (
    <>
      <FlexContainer elClass={styles.checkoutContainer}>
        {/* checkout form */}
        <div className={styles.leftCol}>
          <ListHeader
            title={"Personal information"}
            className={styles.header}></ListHeader>
          <Formik
            initialValues={initPersonalInfor}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleBuy}>
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                id="paymentInfor"
                className={`columnContent ${styles.inforForm}`}>
                <PersonalInfor></PersonalInfor>
                <Payment></Payment>
              </Form>
            )}
          </Formik>
        </div>
        {/* checkout form */}

        {/* product */}
        <div style={{ flexGrow: "1" }}>
          <ListHeader
            title={"Order information"}
            className={styles.header}></ListHeader>

          <RenderQueryData
            isError={isError}
            isLoading={isLoading}
            isEmptyList={
              !Array.isArray(productList) && productList.length === 0
            }>
            <ProductList productList={productList}></ProductList>
          </RenderQueryData>

          <ListHeader
            title={"Total detail"}
            className={styles.header}></ListHeader>
          <Total total={total}></Total>
          <BuyBtn></BuyBtn>
        </div>
      </FlexContainer>

      <BlankDivider></BlankDivider>
    </>
  );
}

export default Checkout;
