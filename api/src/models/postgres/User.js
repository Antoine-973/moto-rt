const bcryptjs = require('bcryptjs')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'users',
        {
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            isVerified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            confirmationCode: {
                type: Sequelize.STRING,
                unique: true,
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isReported: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
            paranoid: true,
            hooks: {
                beforeCreate: async (user) => {
                    user.password = await bcryptjs.hash(
                        user.password,
                        await bcryptjs.genSalt()
                    )
                },
                beforeUpdate: async (user, { fields }) => {
                    if (fields.includes('password')) {
                        user.password = await bcryptjs.hash(
                            user.password,
                            await bcryptjs.genSalt()
                        )
                    }
                },
            },
        }
    )
}
