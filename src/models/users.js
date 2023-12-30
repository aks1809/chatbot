const users = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(25),
      allowNull: true,
      unique: "phone_number_UNIQUE"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    is_admin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "phone_number_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone_number" },
        ]
      },
    ]
  });
};

export default users;