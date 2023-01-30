const { Model, DataTypes } = require('sequelize')
const connection = require('./db')

class ResetPasswordRequest extends Model {}

ResetPasswordRequest.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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
        modelName: 'resetPasswordRequest',
        paranoid: true,
    }
)

module.exports = ResetPasswordRequest
