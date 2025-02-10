/** @format */

import { Formik, Form, Field } from "formik";
import React, { FC, useEffect, useState } from "react";
import useGetChat from "../../hooks/useGetChat";

import styles from "./ChatBox.module.css";
import { ChatMessage } from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { addChat, setErr, setIsLoading } from "../../redux/chatSlide";

// INPUT TEXT
export const ChatInput: FC<ChatMessage> = () => {
  const [chat, setChat] = useState<ChatMessage>({
    sender: "user",
    message: "",
  }); // new chat from user
  const { isLoading, err } = useSelector((state) => state.chat);
  const dispatch = useDispatch(); //update chat array

  const handleSendChat: (message: string) => void = (message) => {
    const newChat: ChatMessage = { sender: "user", message: message };
    setChat(newChat); // set new chat => trigger useEffect

    dispatch(addChat(newChat));
  };

  // call api hook if there is a new chat
  useEffect(
    function () {
      if (!chat.message) return;

      async function sendChat() {
        try {
          // start loading
          dispatch(setIsLoading(true));

          // send & get response
          const response = await useGetChat(chat.message);
          dispatch(addChat(response));
        } catch (err) {
          console.error(err);
          dispatch(setErr(err));
        } finally {
          dispatch(setIsLoading(false)); // stop loading
          setChat({ sender: "user", message: "" }); // reset chat
        }
      }

      sendChat();
    },
    [chat]
  );

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values, { resetForm }) => {
        resetForm();
        handleSendChat(values.message);
      }}>
      {({ values, isSubmitting }) => (
        <Form className="flex items-center gap-2 p-2 border rounded-md">
          <Field
            type="text"
            as="textarea"
            name="message"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-md h-14 max-h-[15rem] resize-none overflow-auto"
            autocomplete="off"
          />
          <button
            type="submit"
            disabled={isSubmitting || !values.message.trim() || isLoading}
            className={`${styles.submitBtn} ${
              !values.message.trim() ? styles.disabled : ""
            }`}>
            <ion-icon name="send"></ion-icon>
          </button>
        </Form>
      )}
    </Formik>
  );
};
