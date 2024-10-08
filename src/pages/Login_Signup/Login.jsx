/** @format */
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import FormPage from "../../components/FormPage/FormPage";
import InputField from "../../components/InputField/InputField.jsx";
import { Link } from "react-router-dom";
import styles from "./Login_Signup.module.css";
import logo from "../../../public/logo-no-background.png";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData.jsx";

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

function Login() {
  // show pass
  const [isShowPass, setShowPass] = useState(false);

  // login
  const [isSubmit, setSubmit] = useState(false);
  const { dataResponse: userList, isLoading, isError } = useGetData("users");

  // display message
  const [isLoginSucces, setLoginSucces] = useState(false);

  useEffect(
    function () {
      if (!isSubmit) return;

      // get email, pass
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      // check username, pass
      const user = userList.find((user) => user.email === email);

      // if login success
      if (user !== undefined && user.password === password) {
        setLoginSucces(true);

        // store user in local storage
        localStorage.setItem("user", JSON.stringify(user));

        // redirect to homepage
        window.location.replace("/test-covet-lux");
      } else {
        setLoginSucces(false);
        // setSubmit(false);
      }
    },
    [isSubmit, userList]
  );

  function handleLogin(e) {
    e.preventDefault();
    setSubmit(!isSubmit);
  }

  return (
    <>
      <NavBar></NavBar>
      <form id="login" onSubmit={(e) => handleLogin(e)}>
        <FormPage backgroundImg={"https://shorturl.at/lTpKz"} title={"Login"}>
          <img className={`img ${styles.logo}`} src={logo} alt="logo"></img>
          {isSubmit && !isLoginSucces && (
            <p style={{ color: "red" }}>Wrong email/password</p>
          )}

          {LOGIN_FORM.map((field, i) => (
            <InputField
              isShowPass={isShowPass}
              setShowPass={setShowPass}
              field={field}
              key={`login-field${i}`}
              form={"login"}
              isRequired={true}
              isPassword={field.isPassword}></InputField>
          ))}
          {/* <p>Show password</p> */}

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
                href="https://api.escuelajs.co/api/v1/users/1"
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
