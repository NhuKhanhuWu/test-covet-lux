/** @format */
import FlexContainer from "../../components/FlexContainer.jsx";

import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import SideBarAcc from "../../components/SideBarAcc/SideBarAcc.jsx";
import InputField from "../../components/InputField/InputField.jsx";
import MessageBox from "../../components/MessageBox/MessageBox.jsx";

import useGetLocal from "../../hooks/useGetLocal.jsx";
import GridContainer from "../../components/GridContainer.jsx";

import styles from "./Account.module.css";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";

function Account() {
  // get user infor
  const user = useGetLocal("personal_infor");

  // handle submit form
  const [isSubmit, setSubmit] = useState(false);

  useEffect(
    function () {
      if (!isSubmit) return;

      // get form input
      const inputEls = document.querySelectorAll(".inputInfor");
      let userInfor = {};
      inputEls?.forEach((input) => {
        userInfor[input.id] = input.value;
      });

      // store in local storage
      localStorage.setItem("personal_infor", JSON.stringify(userInfor));

      // display message
      setShowMessage(true);
    },
    [isSubmit]
  );

  // form template
  const accountForm = [
    { id: "name", label: "Full name", value: user?.name },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      value: user?.phone,
      placeholder: "+84 | 0213 456 789",
      pattern: "(\\+84|0)\\d{7,10}",
      maxLength: 10,
    },
    { id: "city", label: "City/provine", value: user?.city },
    { id: "provine", label: "Provine", value: user?.provine },
    { id: "ward", label: "Ward", value: user?.ward },
    {
      id: "specificAddress",
      label: "Specific Address",
      value: user?.specificAddress,
    },
  ];

  // display message box
  const [isShowMessage, setShowMessage] = useState(false);

  return (
    <>
      <NavBar></NavBar>

      {/* mobile side bar: start */}
      <MediaQuery maxWidth={539}>
        <SideBarAcc></SideBarAcc>
      </MediaQuery>
      {/* mobile side bar: end */}

      <FlexContainer>
        <MediaQuery minWidth={540}>
          <SideBarAcc></SideBarAcc>
        </MediaQuery>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmit(true);
          }}>
          <GridContainer numCol={2} gapCol={6} elClass={styles.formFiels}>
            {accountForm.map((field, i) => (
              <InputField field={field} key={i}></InputField>
            ))}

            <button type="submit" className="fill-btn">
              Save change
            </button>
          </GridContainer>
        </form>
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
      <Footer></Footer>
    </>
  );
}

export default Account;
