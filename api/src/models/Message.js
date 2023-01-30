const { Model, DataTypes } = require('sequelize')
const connection = require('./db')

class Message extends Model {}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        conversationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize: connection,
        modelName: 'message',
        paranoid: true,
    }
)

module.exports = Message
