/** @format */

import useGetLocal from "../../hooks/useGetLocal.jsx";
import { useEffect, useState } from "react";

import styles from "./Contact.module.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import InputField from "../../components/InputField/InputField.jsx";
import { TxtArea } from "../../components/InputField/InputField.jsx";
import MessageBox from "../../components/MessageBox/MessageBox.jsx";
import PageIntro from "../../components/PageIntro/PageIntro.jsx";

const contactForm = [
  {
    id: "name",
    label: "Name",
    isRequired: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    isRequired: true,
  },
  {
    id: "message",
    label: "Your thoughts",
    type: "textarea",
  },
];

const pageIntro = {
  header: "Contact us!",
  paragraph: `If you need questions answered, suggestions or you have new ideas,
          please don't hesitate to contact us now! We will listen and support
          you our best!`,
};

function Contact() {
  const [isSubmit, setSubmit] = useState(false);

  useEffect(
    function () {
      if (!isSubmit) return;

      // clear input field
      const input = document.querySelectorAll("input"); //email, name
      input.forEach((item) => (item.value = ""));

      const textArea = document.querySelector("textarea"); //message
      textArea.value = "";
    },
    [isSubmit]
  );

  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);
  }

  return (
    <>
      <NavBar></NavBar>

      <main className={styles.container}>
        <PageIntro
          header={pageIntro.header}
          paragraph={pageIntro.paragraph}></PageIntro>

        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          {contactForm.slice(0, 2).map((field, i) => (
            <InputField
              field={field}
              key={i}
              isRequired={field.isRequired}></InputField>
          ))}

          <TxtArea field={contactForm[2]} elClass={styles.txtArea}></TxtArea>

          <button
            type="sumnit"
            className={`fill-btn ${isSubmit ? "disable-btn" : ""}`}>
            Submit
          </button>
        </form>
      </main>

      <MessageBox isShowed={isSubmit} setShow={setSubmit}>
        <ion-icon
          name="checkmark-circle"
          class="icon"
          style={{ color: "rgb(88 252 97)" }}></ion-icon>
        <p>Your message has been sended!</p>
      </MessageBox>

      <Footer></Footer>
    </>
  );
}

export default Contact;
