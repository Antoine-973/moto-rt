const {Model, DataTypes} = require('sequelize');
const connection = require('./db');

class Conversation extends Model {}

Conversation.init(
{
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
            attributes: {exclude: ["deletedAt", "updatedAt"]},
            include: ["sender", "receiver"],
        }
    }
);

Conversation.associate = (models) => {
    Conversation.hasMany(models.Message, {
        as: 'messages',
        foreignKey: 'conversationId',
    })
    Conversation.belongsTo(models.User, {
        as: 'sender',
        foreignKey: {
            name: 'senderId',
            allowNull: false,
        }
    })
    Conversation.belongsTo(models.User, {
        as: 'receiver',
        foreignKey: {
            name: 'receiverId',
            allowNull: false,
        }
    })
}

Conversation.addScope("withMessages", {
    attributes: {
        exclude: ["deletedAt", "updatedAt"],
    },
    include: ["sender", "receiver", "messages"],
});

module.exports = Conversation;