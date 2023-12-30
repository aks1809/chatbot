import { Router } from "express";
import initModels from "../models/init-models.js";

const models = initModels();

const routes = new Router();

routes.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number } = req.body;

    const existingUser = await models.users.findOne({ where: { email, phone_number } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await models.users.create({
      first_name, 
      last_name,
      email,
      password,
      phone_number,
      created_at: new Date().getTime()
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routes;
