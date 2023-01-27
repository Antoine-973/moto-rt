const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcryptjs = require("bcryptjs");

class ResetPasswordRequest extends Model {}

ResetPasswordRequest.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "resetPasswordRequest",
        paranoid: true,
    }
);

module.exports = ResetPasswordRequest;