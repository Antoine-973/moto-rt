const { Model, DataTypes } = require('sequelize')
const connection = require('./db')

class Message extends Model {}

Message.init(
    {
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

Message.associate = (models) => {
    Message.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
            name: 'userId',
            allowNull: false,
        }
    })
    Message.belongsTo(models.Conversation, {
        as: 'conversation',
        foreignKey: 'conversationId',
    })
    Message.belongsTo(models.Room, {
        as: 'room',
        foreignKey: 'roomId',
    })
}

module.exports = Message