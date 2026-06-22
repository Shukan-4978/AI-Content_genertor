const asyncHandler = require("express-async-handler");
const axios = require("axios");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");
require("dotenv").config();

const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400);
    throw new Error("Prompt is required");
  }

  try {
    const response = await axios.post(
      "https://genai.vedshil.com/v1/chat/completions",
      {
        model: "Kryonex-G",
        messages: [
          {
            role: "system",
            content: "You are an expert AI content generator. Generate only the direct article/blog post content. Do not include conversational remarks, intros (e.g., 'Sure, here is...'), notes, or outros. Ensure beautiful text formatting with clean margins by using clear Markdown headings and double newlines for paragraph spacing."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 600,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API KEY:", process.env.API_KEY);

    console.log("API Response:");
console.dir(response.data, { depth: null });

    const content =response?.data?.choices?.[0]?.message?.content?.trim();

    const newContent = await ContentHistory.create({
      user: req?.user?._id,
      content,
    });

    const userFound = await User.findById(req?.user?._id);
    if (!userFound) {
      res.status(404);
      throw new Error("User not found");
    }
    userFound.contentHistory.push(newContent?._id);
    userFound.apiRequestCount += 1;
    await userFound.save();

    res.status(200).json(content);
  }catch (error) {
  console.log("STATUS:", error.response?.status);

  console.log("RESPONSE DATA:");
  console.dir(error.response?.data, { depth: null });

  return res.status(500).json({
    success: false,
    error: error.response?.data || error.message,
  });
}
});

module.exports = { openAIController };
