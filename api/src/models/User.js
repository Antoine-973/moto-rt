// Create User model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require('sequelize')
const connection = require('./db')
const bcryptjs = require('bcryptjs')

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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
            defaultValue: 'ROLE_USER',
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'online',
        },
    },
    {
        sequelize: connection,
        modelName: 'user',
        paranoid: true,
        scopes: {
            withoutPassword: {
                attributes: { exclude: ['password'] },
            },
            withMessages: {
                attributes: ['id', 'username'],
                include: 'messages',
            },
            withConversations: {
                attributes: ['id', 'username'],
                include: ['senderConversations', 'receiverConversations'],
            },
            withRooms: {
                attributes: ['id', 'username'],
                include: { association: 'rooms', through: { attributes: [] } },
            },
        },
    }
)

User.addHook('beforeCreate', async (user) => {
    user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt())
})

User.addHook('beforeUpdate', async (user, { fields }) => {
    if (fields.includes('password')) {
        user.password = await bcryptjs.hash(
            user.password,
            await bcryptjs.genSalt()
        )
    }
})

User.seed = async () => {
    await User.bulkCreate([
        {
            username: 'admin',
            email: 'admin@motort.fr',
            password: 'testtest',
            role: 'ROLE_ADMIN',
            isVerified: true,
        },
        {
            username: 'user',
            email: 'user@test.fr',
            password: 'testtest',
            role: 'ROLE_USER',
            isVerified: true,
        },
        {
            username: 'user2',
            email: 'user2@test.fr',
            password: 'testtest',
            role: 'ROLE_USER',
            isVerified: true,
        },
        {
            username: 'user3',
            email: 'user3@test.fr',
            password: 'testtest',
            role: 'ROLE_USER',
            isVerified: true,
        },
        {
            username: 'user4',
            email: 'user4@test.fr',
            password: 'testtest',
            role: 'ROLE_USER',
            isVerified: true,
        },
        {
            username: 'conseiller',
            email: 'conseiller@motort.fr',
            password: 'testtest',
            role: 'ROLE_CONSEILLER',
            isVerified: true,
        },
        {
            username: 'conseiller2',
            email: 'conseiller2@motort.fr',
            password: 'testtest',
            role: 'ROLE_CONSEILLER',
            isVerified: true,
        },
        {
            username: 'conseiller3',
            email: 'conseiller3@motort.fr',
            password: 'testtest',
            role: 'ROLE_CONSEILLER',
            isVerified: true,
        },
        {
            username: 'conseiller4',
            email: 'conseiller4@motort.fr',
            password: 'testtest',
            role: 'ROLE_CONSEILLER',
            isVerified: true,
        },
    ])
}

module.exports = User
