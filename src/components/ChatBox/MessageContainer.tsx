/** @format */
import React, { FC } from "react";
import { useSelector } from "react-redux";

import styles from "./ChatBox.module.css";
import { ChatMessage } from "./ChatBox";
import Loader from "../Loader/Loader.jsx";

interface ChatBubbleProps {
  chat: ChatMessage;
}

// CHAT BUBBLE
const ChatBubble: FC<ChatBubbleProps> = ({ chat }) => {
  return (
    <div
      className={`py-3 px-4 rounded-3xl ${styles.chatBubble} ${
        styles[chat.sender]
      }`}>
      <p>{chat.message}</p>
    </div>
  );
};

const MessageContainer: FC = () => {
  const { chatArray, isLoading } = useSelector((state) => state.chat);

  return (
    <div className="flex-1 flex flex-column gap-4 my-4 overflow-y-scroll">
      {chatArray.length > 0 ? ( // there is message
        chatArray.map(
          (
            chat,
            i //display chat
          ) => <ChatBubble chat={chat} key={`chat-${i}`}></ChatBubble>
        )
      ) : (
        <div className="flex flex-column gap-4 items-center">
          <p className="text-4xl text-center mt-4 font-semibold">
            Start chatting
          </p>
          <p>Powered by Gemini</p>
        </div>
      )}

      {/* loader */}
      {isLoading && <Loader></Loader>}
    </div>
  );
};

export default MessageContainer;
