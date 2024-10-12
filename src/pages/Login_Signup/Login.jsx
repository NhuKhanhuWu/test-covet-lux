/** @format */
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import FormPage from "../../components/FormPage/FormPage";
import InputField from "../../components/InputField/InputField.jsx";
import { Link } from "react-router-dom";
import styles from "./Login_Signup.module.css";
import logo from "../../../public/icon-only.webp";
import { useEffect, useReducer, useState } from "react";
import useGetData from "../../hooks/useGetData.jsx";
import { loginSuccess } from "../../redux/userSlide.js";
import { useDispatch } from "react-redux";
import FlexContainer from "../../components/FlexContainer.jsx";

let LOGIN_FORM = [
  { id: "email", type: "email", label: "Email", placeholder: "abc@mail.com" },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "******",
    isPassword: true,
  },
];

const initState = {
  isShowPass: false,
  isSubmit: false,
  errorMess: null,
  successMess: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "toogleShowPass":
      return { ...state, isShowPass: !state.isShowPass };

    case "submit":
      return { ...state, isSubmit: true };

    case "notSubmit":
      return { ...state, isSubmit: false };

    case "setError":
      return { ...state, errorMess: action.payload };

    case "setSuccess":
      return { ...state, successMess: action.payload };

    default:
      throw "Unknown action";
  }
}

function Login() {
  // show pass
  // const [isShowPass, setShowPass] = useState(false);

  // login
  // const [isSubmit, setSubmit] = useState(false);

  // // display message
  // const [isLoginSucces, setLoginSucces] = useState(false);

  const [loginState, dispatch] = useReducer(reducer, initState); // manage login state
  const { dataResponse: userList } = useGetData("users"); // get all user to check

  // redux, store user to localStorage
  const loginDispatch = useDispatch();

  useEffect(
    function () {
      if (!loginState.isSubmit) return;

      // get email, pass
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      // check username, pass
      const user = userList.find(
        (user) => user.email === email && user.password === password
      );

      // if login success
      if (user !== undefined) {
        dispatch({ type: "setSuccess", payload: "Login successfully!" });

        // store in redux
        loginDispatch(loginSuccess({ id: user.id, avatar: user.avatar }));

        // redirect to homepage
        window.location.replace("/test-covet-lux");
      } else {
        dispatch({ type: "setError", payload: "Incorrect email/password" }); //show err message
        dispatch({ type: "notSubmit" }); //set form to un submit
        setTimeout(() => dispatch({ type: "setError", payload: null }), 5000); //hide err message
      }
    },
    [loginDispatch, loginState.isSubmit, userList]
  );

  function handleLogin(e) {
    e.preventDefault();
    dispatch({ type: "submit" });
  }

  return (
    <>
      <NavBar></NavBar>
      <form id="login" onSubmit={(e) => handleLogin(e)}>
        <FormPage backgroundImg={"https://shorturl.at/lTpKz"}>
          <FlexContainer margin={0} elClass={styles.formHeader} gap={1}>
            <img className={`img ${styles.logo}`} src={logo}></img>
            <h1 className={styles.formTitle}>Log in</h1>
          </FlexContainer>

          {loginState.errorMess && (
            <p style={{ color: "red" }}>{loginState.errorMess}</p>
          )}

          {LOGIN_FORM.map((field, i) => (
            <InputField
              isShowPass={loginState.isShowPass}
              setShowPass={() => dispatch({ type: "toogleShowPass" })}
              field={field}
              key={`login-field${i}`}
              form={"login"}
              isRequired={true}
              isPassword={field.isPassword}></InputField>
          ))}

          <button
            type="submit"
            form="login"
            className={`fill-btn ${styles.loginBtn}`}>
            LOGIN
          </button>

          <div>
            <p>
              Don't have an account yet?{" "}
              <Link to={"/test-covet-lux/signup"} className="link">
                Sign up here!
              </Link>
            </p>

            <p>
              For testing, click{" "}
              <a
                href="https://api.escuelajs.co/api/v1/users/17"
                className="link">
                here
              </a>
            </p>
          </div>
        </FormPage>
      </form>
      <Footer></Footer>
    </>
  );
}

export default Login;
