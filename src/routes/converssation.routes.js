import { Router } from "express";
import constants from "../config/constants.js";
import initModels from "../models/init-models.js";
import axios from "axios";

const models = initModels();

const routes = new Router();

const generateOpenAIResponse = async (conversationMessages) => {
  try {
    const response = await axios.post(
      constants.OPENAI_ENDPOINT,
      {
        model: "gpt-3.5-turbo",
        messages: conversationMessages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${constants.OPENAI_KEY}`,
        },
      }
    );

    return response?.data?.choices[0]?.message?.content || "No response from OpenAI";
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    console.error("Response data:", error.response?.data);
    console.error("Response status:", error.response?.status);
    return "Error generating response";
  }
};

routes.post("/converse", async (req, res) => {
  try {
    const { user_id, chatbot_id, message } = req.body;

    // Check if the user exists
    const user = await models.users.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a conversation already exists between the user and the bot
    let conversation = await models.conversations.findOne({
      where: {
        user_id,
        chatbot_id,
      },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await models.conversations.create({
        user_id,
        chatbot_id,
        created_at: new Date().getTime(),
      });
    }
    const previousChats = await models.chats.findAll({
      where: {
        conversation_id: conversation.conversation_id,
      },
      order: [["created_at", "ASC"]], // Order by creation time to get previous chats in chronological order
    });

    // Create an array of message objects for the entire conversation
    const conversationMessages = previousChats.map((chat) => ({
      role: chat.initiated_by === "USER" ? "user" : "assistant",
      content: chat.message,
    }));

    // Add the latest user message to the conversation
    conversationMessages.push({
      role: "user",
      content: message,
    });

    // Generate response from OpenAI
    const openaiResponse = await generateOpenAIResponse(conversationMessages);

    // Save the user's message to the Chats table
    const [userChat, assistantChat] = await Promise.all([
      models.chats.create({
        conversation_id: conversation.conversation_id,
        initiated_by: "USER",
        message,
        created_at: new Date().getTime(),
      }),
      models.chats.create({
        conversation_id: conversation.conversation_id,
        initiated_by: "ASSISTANT",
        message: openaiResponse,
        created_at: new Date().getTime(),
      }),
    ]);

    res
      .status(201)
      .json({
        message: "Conversation started successfully",
        chat: assistantChat,
      });
  } catch (error) {
    console.error("Error during conversation start:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routes;
