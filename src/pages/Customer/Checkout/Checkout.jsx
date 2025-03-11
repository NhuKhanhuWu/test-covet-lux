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
  name: nameValidate.required(),
  phone: phoneValidate.required(),
  city: txtNumValidate.required(),
  district: txtNumValidate.required(),
  ward: txtNumValidate.required(),
  specificAddress: txtNumValidate.required(),
  paymentMethod: payMethodValidate,
  cardCode: whenOnlinePayment(cardCodeValidate),
  expiredDate: whenOnlinePayment(expiredDateValidate),
  password: whenOnlinePayment(visaPassValidate),
  ownerName: whenOnlinePayment(nameValidate),
};
const validationSchema = Yup.object().shape(validationFields);

function BuyBtn({ handleSubmit }) {
  // check if user login
  const isLogin = useSelector((state) => state.user).user.id !== undefined;

  return (
    <div className={styles.btnContainer}>
      <button
        onClick={handleSubmit}
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
  const infor = useGetLocal("personal_infor") || {};
  const initPersonalInfor = {
    name: infor.name || "",
    phone: infor.phone || "",
    city: infor.city || "",
    district: infor.district || "",
    ward: infor.ward || "",
    specificAddress: infor.specificAddress || "",
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

  // redirect to 'by_success' page
  const redirect = useNavigate();
  function handleBuy(values, { setSubmitting }) {
    // store order
    const { ...newOrder } = values;
    const orderId = new Date().valueOf(); // create orderId

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

    redirect(`/test-covet-lux/buy_success?order_id=${orderId}`, {
      replace: true,
    });

    setSubmitting(false);
  }

  return (
    <>
      <FlexContainer elClass={styles.checkoutContainer}>
        {/* checkout form */}
        <Formik
          initialValues={initPersonalInfor}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleBuy}>
          {({ handleSubmit }) => (
            <>
              {/* checkout form */}
              <div className={styles.leftCol}>
                <ListHeader
                  title={"Personal information"}
                  className={styles.header}></ListHeader>

                <Form
                  onSubmit={handleSubmit}
                  id="paymentInfor"
                  className={`columnContent ${styles.inforForm}`}>
                  <PersonalInfor></PersonalInfor>
                  <Payment></Payment>
                </Form>
              </div>

              {/* product */}
              <div style={{ flexGrow: "1" }}>
                <ListHeader
                  title={"Order information"}
                  className={styles.header}></ListHeader>

                <RenderQueryData
                  isError={isError}
                  isLoading={isLoading}
                  isEmptyList={!productList || productList.length === 0}>
                  <ProductList productList={productList}></ProductList>
                </RenderQueryData>

                <ListHeader
                  title={"Total detail"}
                  className={styles.header}></ListHeader>
                <Total total={total}></Total>
                <BuyBtn handleSubmit={handleSubmit}></BuyBtn>
              </div>
            </>
          )}
        </Formik>
      </FlexContainer>

      <BlankDivider></BlankDivider>
    </>
  );
}

export default Checkout;
