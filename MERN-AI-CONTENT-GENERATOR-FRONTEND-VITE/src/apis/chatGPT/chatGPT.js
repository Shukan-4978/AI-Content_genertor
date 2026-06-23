import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://gen-ai-backend-1ytq.onrender.com";

//=======Content Generation=====

export const generateContentAPI = async (userPrompt) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/openai/generate-content`,
    {
      prompt: userPrompt,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
