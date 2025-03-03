/** @format */

import { useEffect, useState } from "react";

import styles from "./Contact.module.css";
import InputField from "../../../components/InputField/InputField.jsx";
import { TxtArea } from "../../../components/InputField/InputField.jsx";
import MessageBox from "../../../components/MessageBox/MessageBox.jsx";
import PageIntro from "../../../components/PageIntro/PageIntro.jsx";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const contactForm = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "message",
    label: "Your thoughts",
    type: "textarea",
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string(), // Optional field, no validation needed
});

const pageIntro = {
  header: "Contact us!",
  paragraph: `If you need questions answered, suggestions or you have new ideas,
          please don't hesitate to contact us now! We will listen and support
          you our best!`,
};

function Contact() {
  const [isSubmit, setSubmit] = useState(false);

  function handleSubmit(values, { resetForm }) {
    setSubmit(true);
    resetForm();
  }

  return (
    <>
      <main className={styles.container}>
        <PageIntro
          header={pageIntro.header}
          paragraph={pageIntro.paragraph}></PageIntro>

        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {contactForm.slice(0, 2).map((field, i) => (
                <InputField field={field} key={i}></InputField>
              ))}

              <TxtArea field={contactForm[2]}></TxtArea>

              <button
                type="submit"
                className={`fill-btn ${isSubmit ? "disable-btn" : ""}`}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </main>

      <MessageBox isShowed={isSubmit} setShow={setSubmit}>
        <ion-icon
          name="checkmark-circle"
          class="icon"
          style={{ color: "rgb(88 252 97)" }}></ion-icon>
        <p>Your message has been sended!</p>
      </MessageBox>
    </>
  );
}

export default Contact;
