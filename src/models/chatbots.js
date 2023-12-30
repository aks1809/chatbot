const chatbots = (sequelize, DataTypes) => {
  return sequelize.define('chatbots', {
    chatbot_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatbot_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    chatbot_owner: {
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
    tableName: 'chatbots',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chatbot_id" },
        ]
      },
      {
        name: "chatbots_FK",
        using: "BTREE",
        fields: [
          { name: "chatbot_owner" },
        ]
      },
    ]
  });
};

export default chatbots;