const { Model, DataTypes } = require('sequelize')
const connection = require('./db')

class Room extends Model {}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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
                },
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
        },
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

Room.addScope('withMessages', {
    attributes: {
        exclude: ['deletedAt', 'updatedAt'],
    },
    include: {
        association: 'messages',
        order: [['createdAt', 'DESC']],
    },
})

Room.seed = async () => {
    await Room.bulkCreate([
        {
            name: 'Salle de discussion 1',
            description:
                'La première salle de discussion avec une limite de 3 personnes',
            limit: 3,
        },
        {
            name: 'Salle de discussion 2',
            description:
                'La deuxième salle de discussion avec une limite de 5 personnes',
            limit: 5,
        },
        {
            name: 'Salle de discussion 3',
            description:
                'La troisième salle de discussion avec une limite de 10 personnes',
            limit: 10,
        },
        {
            name: 'Salle de discussion 4',
            description:
                'La quatrième salle de discussion avec une limite de 20 personnes',
            limit: 20,
        },
    ])
}

module.exports = Room
