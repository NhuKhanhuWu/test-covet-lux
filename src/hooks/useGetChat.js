/** @format */

import { GoogleGenerativeAI } from "@google/generative-ai";

const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);

async function useGetChat(message) {
  if (!message) return;

  // get model of AI
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  // message to AI
  const prompt = `suppose you are a chat bot for an e-commerce website, write response for this
                  message: ${message}
                  note:
                  - reply with this json format
                  {sender: "ai",
                  message: "message here"}
                  - if the task not is valid (doesn't have meaning), reply with this format
                  {sender: "ai",
                  message: "Sorry, i cannot understand your question. Can you explain it?"}
                  - using only space, charatater, number for the response, no "enter", "tab",... 
                  - avoid "Bad control character in string literal in JSON"
                  - no aditional note, just json response like normal api, I use the respone to parse to string, to if you add anything other than json will cause error so please don't add any note, or key changes, ...`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;

    // get the actual string
    const textResponse = response.text();

    // Slice correctly (ensure slicing makes sense for your data)
    const trimmedResponse = textResponse.slice(7, -4);

    // Parse JSON if it's a valid JSON string
    const parsedResponse = JSON.parse(trimmedResponse);

    return parsedResponse;
  } catch (error) {
    throw new Error(error);
  }
}

export default useGetChat;
