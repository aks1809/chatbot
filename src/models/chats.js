const chats = (sequelize, DataTypes) => {
  return sequelize.define('chats', {
    chat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    initiated_by: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'conversations',
        key: 'conversation_id'
      }
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'chats',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
      {
        name: "chats_FK",
        using: "BTREE",
        fields: [
          { name: "conversation_id" },
        ]
      },
    ]
  });
};

export default chats;