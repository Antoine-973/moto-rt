const { Model, DataTypes } = require('sequelize')
const connection = require('./db')
const models = require('./index')

class Room extends Model {}

Room.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [2, 50],
                    msg: 'Room name must be between 3 and 50 characters',
                },
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 255],
                    msg: 'Room description must be between 3 and 255 characters',
                }
            },
        },
        limit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 20,
            validate: {
                min: {
                    args: [2],
                    msg: 'Room limit must be at least 2',
                },
                max: {
                    args: [20],
                    msg: 'Room limit must be at most 20',
                },
            },
        }
    },
    {
        sequelize: connection,
        modelName: 'room',
        paranoid: true,
    }
)

Room.associate = (models) => {
    Room.belongsToMany(models.User, {
        through: 'user_room',
        as: 'users',
        foreignKey: 'roomId',
    })

    Room.hasMany(models.Message, {
        as: 'messages',
        foreignKey: 'roomId',
    })
}



module.exports = Room