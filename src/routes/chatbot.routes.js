import { Router } from "express";
import initModels from "../models/init-models.js";

const models = initModels();

const routes = new Router();

routes.post("/register", async (req, res) => {
  try {
    const { chatbot_name, chatbot_owner } = req.body;

    // Check if the user (owner) exists
    const owner = await models.users.findByPk(chatbot_owner);

    if (!owner) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the chatbot
    const newChatbot = await models.chatbots.create({
      chatbot_name,
      chatbot_owner,
      created_at: new Date().getTime()
    });

    res
      .status(201)
      .json({ message: "Chatbot created successfully", chatbot: newChatbot });
  } catch (error) {
    console.error("Error during chatbot creation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routes;
