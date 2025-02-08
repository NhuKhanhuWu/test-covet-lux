/** @format */

import { GoogleGenerativeAI } from "@google/generative-ai";

const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);

async function useGetDraft(title, description) {
  if (!title || !description) return;

  // get model of AI
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  // message to AI
  const prompt = `write detailed task drafts for this task
                  title: ${title}
                  description: ${description}
                  note:
                  - don't separate into small tasks, all the step should be separated to JAVASCRIPT ARRAY and put into description, don't put them into one single string!!
                  - tasks should be label by number for primary steps and character for secondary steps
                  - if the task is valid, reply with this json format
                  {title: "title here",
                  description: ["1. Step 1", "a. Step 1.1", "b. Step 1.2", "2. Step 2"],
                  sender: "ai",
                  type: "task"}
                  - if the task not is valid (doesn't have meaning, its meaning is not a task) , reply with this format
                  {message: "Error, the task is not valid or it doesn't have meaning", 
                  sender:"system",  
                  type: "error"}
                  - using only space, charatater, number for the response, no "enter", "tab",... 
                  - avoid "Bad control character in string literal in JSON"
                  - no aditional note, just json response like normal api, I use the respone to parse to string, to if you add anything other than json will cause error so please don't add any note, or key changes, ...`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Await response.text() to get the actual string
    const textResponse = await response.text();

    // Slice correctly (ensure slicing makes sense for your data)
    const trimmedResponse = textResponse.slice(7, -4);

    // Parse JSON if it's a valid JSON string
    const parsedResponse = JSON.parse(trimmedResponse);

    return parsedResponse;
  } catch (error) {
    throw new Error(error);
  }
}

export default useGetDraft;
