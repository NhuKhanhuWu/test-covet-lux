/** @format */
import FlexContainer from "../../../components/FlexContainer.jsx";

import SideBarAcc from "../../../components/SideBarAcc/SideBarAcc.jsx";
import InputField from "../../../components/InputField/InputField.jsx";
import MessageBox from "../../../components/MessageBox/MessageBox.jsx";
import styles from "./Account.module.css";

import useGetLocal from "../../../hooks/useGetLocal.jsx";
import GridContainer from "../../../components/GridContainer.jsx";

import { useState } from "react";
import MediaQuery from "react-responsive";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  nameValidate,
  phoneValidate,
  txtNumValidate,
} from "../../../components/InputField/Validate.js";

const ACCOUNT_FORM = [
  { id: "name", label: "Full name", name: "name" },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+84 | 0213 456 789",
    maxLength: 10,
    name: "phone",
  },
  {
    id: "city",
    label: "City/provine",
    name: "city",
  },
  {
    id: "provine",
    label: "Provine",
    name: "provine",
  },
  { id: "ward", label: "Ward", name: "ward" },
  {
    id: "specificAddress",
    label: "Specific Address",
    name: "specificAddress",
  },
];

function Account() {
  const user = useGetLocal("personal_infor"); // get user infor
  const [isShowMessage, setShowMessage] = useState(false); // display message box

  const accountInforValidate = Yup.object().shape({
    name: nameValidate,
    phone: phoneValidate,
    city: txtNumValidate,
    provine: txtNumValidate,
    ward: txtNumValidate,
    specificAddress: txtNumValidate,
  }); // form validation
  const initValue = {
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    city: user?.city ?? "",
    provine: user?.provine ?? "",
    ward: user?.ward ?? "",
    specificAddress: user?.specificAddress ?? "",
  }; //init value

  function handleUpdateInfor(values) {
    // store in local storage
    localStorage.setItem("personal_infor", JSON.stringify(values));

    // display message
    setShowMessage(true);
  }

  return (
    <>
      {/* mobile side bar: start */}
      <MediaQuery maxWidth={539}>
        <SideBarAcc></SideBarAcc>
      </MediaQuery>
      {/* mobile side bar: end */}

      <FlexContainer>
        <MediaQuery minWidth={540}>
          <SideBarAcc></SideBarAcc>
        </MediaQuery>
        <Formik
          initialValues={initValue}
          validationSchema={accountInforValidate}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleUpdateInfor}>
          {({ handleSubmit }) => (
            <Form className={styles.form} onSubmit={handleSubmit}>
              <GridContainer numCol={2} gapCol={6} elClass={styles.formFiels}>
                {ACCOUNT_FORM.map((field, i) => (
                  <InputField field={field} key={`field-${i}`}></InputField>
                ))}

                <button type="submit" className="fill-btn">
                  Save change
                </button>
              </GridContainer>
            </Form>
          )}
        </Formik>
      </FlexContainer>

      <MessageBox isShowed={isShowMessage} setShow={setShowMessage}>
        <>
          <ion-icon
            name="checkmark-circle"
            class="icon"
            style={{ color: "rgb(88 252 97)" }}></ion-icon>
          <p>Information updated!</p>
        </>
      </MessageBox>
    </>
  );
}

export default Account;
