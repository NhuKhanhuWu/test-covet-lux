/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatMessage {
  sender: "ai" | "user";
  message: string;
}

interface ChatState {
  chatArray: ChatMessage[];
}

const initialState: ChatState = {
  chatArray: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatMessage>) => {
      if (!action.payload.message) return;

      // add new chat
      state.chatArray.push(action.payload);

      // call api
    },

    editChat: (
      state,
      action: PayloadAction<{ index: number; message: ChatMessage }>
    ) => {
      if (action.payload.index >= state.chatArray.length) return;

      // remove chat from index to end
      state.chatArray = state.chatArray.slice(0, action.payload.index);

      // add new chat
      state.chatArray.push(action.payload.message);

      // call api
    },
  },
});

export const { addChat, editChat } = chatSlice.actions;
export default chatSlice.reducer;
