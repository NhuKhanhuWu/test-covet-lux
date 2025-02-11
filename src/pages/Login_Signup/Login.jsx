/** @format */
import useGetData from "../../hooks/useGetData.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import styles from "./Login_Signup.module.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import FormPage from "../../components/FormPage/FormPage";
import InputField from "../../components/InputField/InputField.jsx";
import { Link } from "react-router-dom";
import { login } from "../../redux/userSlide.js";
import { Form, Formik } from "formik";
import {
  emailValidation,
  passwordValidation,
} from "../../components/InputField/Validate.js";

const LOGIN_FORM = [
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "abc@mail.com",
    name: "email",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "******",
    isPassword: true,
    name: "password",
  },
];

function Options() {
  return (
    <div>
      <p>
        Dont have an account yet?{" "}
        <Link to={"/test-covet-lux/signup"} className="link">
          Sign up here!
        </Link>
      </p>

      <p>
        For testing, click{" "}
        <a href="https://api.escuelajs.co/api/v1/users/1" className="link">
          here
        </a>
      </p>
    </div>
  );
}

function Login() {
  const { dataResponse: userList } = useGetData("users"); // get all user to check
  const [isShowPass, setIsShowPass] = useState(false); // show pass
  const [loginErr, setLoginErr] = useState(""); // show login err message
  const dispatch = useDispatch();
  const loginValidation = Yup.object().shape({
    email: emailValidation,
    password: passwordValidation,
  });

  function handleLogin(values) {
    // check username, pass
    const user = userList.find(
      (user) => user.email === values.email && user.password === values.password
    );

    // if email/pass not corerct
    if (!user) {
      setLoginErr("Email/Password is not correct");
      return;
    }

    // if email/pass corerct
    // store in redux
    dispatch(login({ id: user.id, avatar: user.avatar }));

    // redirect to homepage
    window.location.replace("/test-covet-lux");
  }

  return (
    <>
      <NavBar></NavBar>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidation}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleLogin}>
        {({ handleSubmit }) => (
          <Form id="login" onSubmit={handleSubmit}>
            <FormPage backgroundImg={"https://shorturl.at/lTpKz"}>
              {/* header */}
              <h1 className={styles.formTitle}>Log in</h1>

              {loginErr && <p style={{ color: "red" }}>{loginErr}</p>}

              {LOGIN_FORM.map((field, i) => (
                <InputField
                  isShowPass={isShowPass}
                  setShowPass={setIsShowPass}
                  field={field}
                  key={`login-field${i}`}
                  form={"login"}
                  isPassword={field.isPassword}></InputField>
              ))}

              <button
                type="submit"
                form="login"
                className={`fill-btn ${styles.loginBtn}`}>
                LOGIN
              </button>

              <Options></Options>
            </FormPage>
          </Form>
        )}
      </Formik>
      <Footer></Footer>
    </>
  );
}

export default Login;
