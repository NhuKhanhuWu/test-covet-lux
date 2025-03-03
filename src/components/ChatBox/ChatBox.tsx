/** @format */
import React, { useState } from "react";
import { FC } from "react";

import styles from "./ChatBox.module.css";
import { ChatInput } from "./ChatInput";
import MessageContainer from "./MessageContainer";

export interface ChatMessage {
  sender: "ai" | "user";
  message: string;
}

interface ChatIconProps {
  isExpanded: boolean;
  setIsExpanded: Function;
}

interface ChatIconProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatIcon: FC<ChatIconProps> = ({ isExpanded, setIsExpanded }) => {
  const handleClick = () => setIsExpanded((prev) => !prev);

  return (
    <button className={styles.chatIcon} onClick={handleClick}>
      <span className="material-symbols-outlined text-2xl">chat</span>
    </button>
  );
};

// CHAT BOX
const ChatBox: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {!isExpanded ? (
        <ChatIcon
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}></ChatIcon>
      ) : (
        <div className={`${styles.chatBox} flex flex-col z-999`}>
          {/* header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-3 text-2xl font-medium">
            <p className="title">Chat Box AI</p>
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={() => setIsExpanded((isExpanded) => !isExpanded)}>
              minimize
            </span>
          </div>

          {/* message container */}
          <MessageContainer></MessageContainer>

          {/* chat input */}
          <ChatInput sender={"ai"} message={""} />
        </div>
      )}
    </>
  );
};

export default ChatBox;
