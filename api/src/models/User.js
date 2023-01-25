// Create User model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcryptjs = require("bcryptjs");

class User extends Model {}

User.init(
{
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ROLE_USER",
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
  },
  {
    sequelize: connection,
    modelName: "user",
    paranoid: true,
  }
);

User.addHook("beforeCreate", async (user) => {
    user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
});

User.addHook("beforeUpdate", async (user, { fields }) => {
  if (fields.includes("password")) {
    user.password = await bcryptjs.hash(
      user.password,
      await bcryptjs.genSalt()
    );
  }
});

module.exports = User;
