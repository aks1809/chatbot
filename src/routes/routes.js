import { Router } from "express";
import UserRoutes from "./user.routes.js";
import ChatbotRoutes from "./chatbot.routes.js";
import ConversationRoutes from "./converssation.routes.js";

const routes = new Router();

routes.use("/user", UserRoutes);
routes.use("/chatbot", ChatbotRoutes);
routes.use("/conversation", ConversationRoutes);

routes.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  res.send("Route Not Found!");
});

export default routes;
