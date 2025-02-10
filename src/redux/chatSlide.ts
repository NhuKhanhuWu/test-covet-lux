/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatMessage {
  sender: "ai" | "user";
  message: string;
}

interface ChatState {
  chatArray: ChatMessage[];
  isLoading: boolean;
  err: string;
}

const initialState: ChatState = {
  chatArray: [],
  isLoading: false,
  err: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // add new chat
    addChat: (state, action: PayloadAction<ChatMessage>) => {
      if (!action.payload.message) return;

      // add new chat
      state.chatArray.push(action.payload);
    },

    // edit chat
    editChat: (
      state,
      action: PayloadAction<{ index: number; message: ChatMessage }>
    ) => {
      if (action.payload.index >= state.chatArray.length) return;

      // remove chat from index to end
      state.chatArray = state.chatArray.slice(0, action.payload.index);

      // add new chat
      state.chatArray.push(action.payload.message);
    },

    // set loading status
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // set err message
    setErr: (state, action) => {
      state.err = action.payload;
    },
  },
});

export const { addChat, editChat, setIsLoading, setErr } = chatSlice.actions;
export default chatSlice;
