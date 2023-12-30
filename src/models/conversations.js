const conversations = (sequelize, DataTypes) => {
  return sequelize.define('conversations', {
    conversation_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatbot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chatbots',
        key: 'chatbot_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'conversations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "conversation_id" },
        ]
      },
      {
        name: "conversations_FK",
        using: "BTREE",
        fields: [
          { name: "chatbot_id" },
        ]
      },
      {
        name: "conversations_FK_1",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

export default conversations;