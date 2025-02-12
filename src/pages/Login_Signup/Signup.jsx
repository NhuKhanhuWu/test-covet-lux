/** @format */
import { Link } from "react-router-dom";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import InputField from "../../components/InputField/InputField";
import FormPage from "../../components/FormPage/FormPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Login_Signup.module.css";
import {
  emailValidate,
  passValidate,
} from "../../components/InputField/Validate.js";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlide";
import axios from "axios";

const SIGNUP_FORM = [
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "abc@gmail.com",
    name: "email",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Password",
    name: "password",
    isPassword: true,
  },
];

function Signup() {
  const dispatch = useDispatch();
  const [isShowPass, setIsShowPass] = useState(false); // show pass on password fied
  const [errMessage, setErrMessage] = useState("");
  const signupValidation = Yup.object().shape({
    email: emailValidate,
    password: passValidate,
  });

  async function handleSignup(values) {
    // CREATE NEW USER
    const newUser = {
      ...values,
      name: "User",
      avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    };
    try {
      // send api request
      const createUserRes = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        newUser
      );
      const createdUser = createUserRes.data;

      if (!createdUser) return;

      // login
      dispatch(login({ avatar: newUser.avatar, id: createdUser.id }));

      // redirect to homepage
      window.location.href = "/test-covet-lux";
    } catch (err) {
      setErrMessage("Invalid email");
      throw new Error(err);
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={signupValidation}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSignup}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormPage backgroundImg={"https://shorturl.at/lTpKz"}>
              {/* header */}
              <h1 className={styles.formTitle}>Sign up</h1>

              {/* err message */}
              {errMessage && (
                <p className="text-red-500 text-m mt-1">{errMessage}</p>
              )}

              {/* fields */}
              {SIGNUP_FORM.map((field, i) => (
                <InputField
                  isShowPass={isShowPass}
                  setShowPass={setIsShowPass}
                  field={field}
                  key={`login-field${i}`}
                  form={"signup"}
                  isPassword={field.isPassword}></InputField>
              ))}
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
          </Form>
        )}
      </Formik>

      <Footer></Footer>
    </>
  );
}

export default Signup;
