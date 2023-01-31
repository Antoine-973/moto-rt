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
        endedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isWithAdvisor: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    },
    {
        sequelize: connection,
        modelName: 'conversation',
        paranoid: true,
        defaultScope: {
            attributes: { exclude: ['deletedAt', 'updatedAt'] },
            include: ['sender', 'receiver'],
        },
        scopes: {
            conversationWithMessages: {
                attributes: { exclude: ['deletedAt', 'updatedAt'] },
                include: ['sender', 'receiver', 'messages'],
            },
        },
    }
)

Conversation.seed = async () => {
    await Conversation.bulkCreate([
        {
            senderId: 2,
            receiverId: 3,
        },
        {
            senderId: 2,
            receiverId: 4,
        },
        {
            senderId: 2,
            receiverId: 5,
        },
        {
            senderId: 3,
            receiverId: 4,
        },
        {
            senderId: 3,
            receiverId: 5,
        },
        {
            senderId: 4,
            receiverId: 5,
        },
    ])
}

module.exports = Conversation
