/** @format */
import React from "react";
import { FC } from "react";
import { Formik, Form, Field } from "formik";

import styles from "./ChatBox.module.css";

interface ChatMessage {
  sender: "ai" | "user";
  message: string;
}

interface ChatBubbleProps {
  chat: ChatMessage;
}

const testChat: ChatMessage[] = [
  { sender: "ai", message: "Hi, how can I help you" },
  { sender: "user", message: "How to know when my order will arrive" },
];

// INPUT TEXT
const ChatInput: FC<ChatMessage> = () => {
  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values, { resetForm }) => {
        resetForm();
      }}>
      {({ values, isSubmitting }) => (
        <Form className="flex items-center gap-2 p-2 border rounded-md">
          <Field
            type="text"
            name="message"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={isSubmitting || !values.message.trim()}
            className={styles.submitBtn}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

// CHAT BUBBLE
const ChatBubble: FC<ChatBubbleProps> = ({ chat }) => {
  return (
    <div className={`py-3 px-4 rounded-3xl w-3/4 ${styles[chat.sender]}`}>
      <p>{chat.message}</p>
    </div>
  );
};

// CHAT BOX
const ChatBox: FC = () => {
  return (
    <div className={`${styles.chatBox} flex flex-col`}>
      {/* header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-3 text-2xl font-medium">
        <p className="title">Chat Box AI</p>
        <span className="material-symbols-outlined cursor-pointer">
          minimize
        </span>
      </div>

      {/* message container */}
      <div className="flex-1 flex flex-column gap-4 my-4 overflow-y-scroll">
        {testChat.map((chat, i) => (
          <ChatBubble chat={chat} key={`chat-${i}`}></ChatBubble>
        ))}
      </div>

      {/* chat input */}
      <ChatInput sender={"ai"} message={""} />
    </div>
  );
};

export default ChatBox;
