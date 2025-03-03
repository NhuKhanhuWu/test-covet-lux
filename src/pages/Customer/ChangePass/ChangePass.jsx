/** @format */
import { useEffect, useReducer, useState } from "react";
import { BlankDivider } from "../../components/Divider";
import FlexContainer from "../../components/FlexContainer";
import Footer from "../../components/Footer/Footer";
import InputField from "../../components/InputField/InputField";
import NavBar from "../../components/NavBar/NavBar";
import SideBarAcc from "../../components/SideBarAcc/SideBarAcc";
import MessageBox from "../../components/MessageBox/MessageBox.jsx";
import styles from "./ChangePass.module.css";

import useGetData from "../../hooks/useGetData";
import { useSelector } from "react-redux";

const old_pass_field = {
  id: "curr_pass",
  label: "Current password",
  type: "password",
};

const new_pass_field = {
  id: "new_pass",
  label: "New password",
  type: "password",
};

const verify_new_pas_field = {
  id: "verify_new_pass",
  label: "Verify password",
  type: "password",
};

const init_form_state = {
  isWrongPass: false,
  isNewPassInvalid: false,
  isSubmit: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case "wrongPass":
      return { ...state, isWrongPass: true };

    case "correctPass":
      return { ...state, isWrongPass: false };

    case "newPassInvalid":
      return { ...state, isNewPassInvalid: true };

    case "newPassValid":
      return { ...state, isNewPassInvalid: false };

    case "submit":
      return {
        ...state,
        isSubmit: true,
      };

    case "unSubmit":
      return {
        ...state,
        isSubmit: false,
      };

    default:
      throw "Unknown action";
  }
}

function ChangePass() {
  // get user infor
  const userId = useSelector((state) => state.user).user.id;
  const { dataResponse: user } = useGetData(`users/${userId}`);
  const [dataRes, setDataRes] = useState(null);
  const [isDisplay, setDisplay] = useState(false); //display message

  //   form validation
  const [formState, dispacth] = useReducer(formReducer, init_form_state);
  const [isDisable, setDisable] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    dispacth({ type: "submit" });
  }

  console.log(
    formState.isWrongPass,
    formState.isNewPassInvalid,
    formState.isSubmit
  );

  useEffect(
    function () {
      async () => {
        // if not submit yet
        if (!formState.isSubmit) return;

        const currPass = document.querySelector("#curr_pass").value;
        const newPass = document.querySelector("#new_pass").value;
        const verifyPass = document.querySelector("#verify_new_pass").value;

        // form verification
        if (currPass !== user.password) {
          dispacth({ type: "wrongPass" });
          return;
        } else {
          dispacth({ type: "correctPass" });
        }

        if (newPass !== verifyPass) {
          dispacth({ type: "newPassInvalid" });
          setTimeout(() => dispacth({ type: "unSubmit" }, 5000));
          return;
        } else {
          dispacth({ type: "newPassValid" });
        }

        // send request
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: newPass }),
        };

        setDisable(true);
        fetch(`https://api.escuelajs.co/api/v1/users/${userId}`, requestOptions)
          .then((response) => response.json())
          .then((data) => setDataRes(data))
          .then(dispacth({ type: "unSubmit" }))
          .then(() => {
            setDisplay(true);
            setDisable(false);
          });

        // reload page
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      };
    },
    [formState.isSubmit, user.id, userId]
  );

  return (
    <>
      <NavBar></NavBar>
      <BlankDivider></BlankDivider>

      <FlexContainer>
        <SideBarAcc></SideBarAcc>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <InputField field={old_pass_field} isRequired={true}></InputField>
          <InputField field={new_pass_field} isRequired={true}></InputField>
          <InputField
            field={verify_new_pas_field}
            isRequired={true}></InputField>

          {/* display wrong pass message */}
          {formState.isWrongPass && formState.isSubmit ? (
            <span className="red-txt">Wrong password!</span>
          ) : (
            ""
          )}

          {/* display not identical pass message */}
          {formState.isNewPassInvalid && formState.isSubmit ? (
            <span className="red-txt">New passwords are not identical!</span>
          ) : (
            ""
          )}

          <button
            type="submit"
            className={`fill-btn ${isDisable ? "disable-btn" : ""}`}
            disabled={isDisable}>
            Submit
          </button>
        </form>
        <MessageBox isShowed={isDisplay} setShow={setDisplay}>
          <ion-icon
            name="checkmark-circle"
            class="icon"
            style={{ color: "rgb(88 252 97)" }}></ion-icon>
          <span>Password change successfully</span>
        </MessageBox>
      </FlexContainer>

      <BlankDivider distance={1}></BlankDivider>
      <Footer></Footer>
    </>
  );
}

export default ChangePass;
