const { Model, DataTypes } = require('sequelize')
const connection = require('./db')

class Conversation extends Model {}

Conversation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: 'conversation',
        paranoid: true,
        defaultScope: {
            attributes: { exclude: ['deletedAt', 'updatedAt'] },
            include: ['sender', 'receiver'],
        },
    }
)

Conversation.addScope('withMessages', {
    attributes: {
        exclude: ['deletedAt', 'updatedAt'],
    },
    include: ['sender', 'receiver', 'messages'],
})

module.exports = Conversation
