/** @format */

import InputField from "../../components/InputField/InputField";
import FormPage from "../../components/FormPage/FormPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Login_Signup.module.css";
import FlexContainer from "../../components/FlexContainer";
import logo from "../../../public/icon-only.webp";
import { Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import MessageBox from "../../components/MessageBox/MessageBox";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userSlide.js";

const SIGNUP_FORM = [
  { id: "email", type: "email", label: "Email", placeholder: "abc@gmail.com" },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "password",
  },
];

const initState = {
  isSubmit: false,
  isShowPass: false,
  errorMess: null,
  successMess: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "submit":
      return { ...state, isSubmit: true };

    case "notSubmit":
      return { ...state, isSubmit: false };

    case "toggleShowPass":
      return { ...state, isShowPass: !state.isShowPass };

    case "setSuccess":
      return { ...state, successMess: action.payload };

    default:
      throw "Unknown action";
  }
}

function Signup() {
  const [signupState, dispatch] = useReducer(reducer, initState);
  const loginDispatch = useDispatch();

  function handleSignup(e) {
    e.preventDefault();
    dispatch({ type: "submit" });
  }

  useEffect(
    function () {
      async function signup() {
        if (!signupState.isSubmit) return;

        // get email, pass input
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        // CREATE NEW USER: start
        const newUser = {
          name: "User",
          email: email,
          password: password,
          avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        };

        const createUserRequest = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        };

        const newUserRes = await fetch(
          "https://api.escuelajs.co/api/v1/users/",
          createUserRequest
        );

        const newUserdata = await newUserRes.json();

        // if create success
        if (newUserdata !== undefined) {
          // display message
          dispatch({
            type: "setSuccess",
            payload: "Your account has been created",
          });
        }

        // login
        loginDispatch(
          loginSuccess({ id: newUserdata.id, avatar: newUserdata.avatar })
        );

        // redirect to homepage
        window.location.href = "/test-covet-lux";
      }

      signup();
    },
    [loginDispatch, signupState.isSubmit]
  );

  return (
    <>
      <NavBar></NavBar>

      <form onSubmit={(e) => handleSignup(e)}>
        <FormPage backgroundImg={"https://shorturl.at/lTpKz"}>
          <FlexContainer margin={0} elClass={styles.formHeader} gap={1}>
            <img className={`img ${styles.logo}`} src={logo}></img>
            <h1 className={styles.formTitle}>Sign up</h1>
          </FlexContainer>

          <InputField field={SIGNUP_FORM[0]} isRequired={true}></InputField>
          <InputField
            field={SIGNUP_FORM[1]}
            isRequired={true}
            isShowPass={signupState.isShowPass}
            setShowPass={() => dispatch({ type: "toggleShowPass" })}
            isPassword={true}></InputField>
          <button type="submit" className={`fill-btn ${styles.loginBtn}`}>
            SIGN UP
          </button>

          <div>
            <p>
              Already have an account?{" "}
              <Link to={"/test-covet-lux/login"} className="link">
                Login here!
              </Link>
            </p>
          </div>
        </FormPage>
      </form>

      <MessageBox
        isShowed={signupState.successMess !== null}
        setShow={() => dispatch({ type: "setSuccess", payload: null })}>
        <ion-icon
          name="checkmark-circle"
          class="icon"
          style={{ color: "rgb(88 252 97)" }}></ion-icon>
        <p>{signupState.successMess}!</p>
      </MessageBox>

      <Footer></Footer>
    </>
  );
}

export default Signup;
