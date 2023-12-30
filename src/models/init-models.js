import { DataTypes } from "sequelize";
import _chats from "./chats.js";
import _chatbots from "./chatbots.js";
import _conversations from "./conversations.js";
import _users from "./users.js";
import sequelize from "../config/database.js";

const initModels = () => {
  const chats = _chats(sequelize, DataTypes);
  const conversations = _conversations(sequelize, DataTypes);
  const chatbots = _chatbots(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  conversations.belongsTo(chatbots, { as: "chatbot", foreignKey: "chatbot_id"});
  chatbots.hasMany(conversations, { as: "conversations", foreignKey: "chatbot_id"});
  chatbots.belongsTo(users, { as: "chatbot_owner_user", foreignKey: "chatbot_owner"});
  users.hasMany(chatbots, { as: "chatbots", foreignKey: "chatbot_owner"});
  conversations.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(conversations, { as: "conversations", foreignKey: "user_id"});
  chats.belongsTo(conversations, { as: "conversation", foreignKey: "conversation_id"});
  conversations.hasMany(chats, { as: "chats", foreignKey: "conversation_id"});

  return {
    chats,
    conversations,
    chatbots,
    users
  };
}

export default initModels;
