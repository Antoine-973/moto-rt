const {Model, DataTypes} = require('sequelize');
const connection = require('./db');

class Contact extends Model {}

Contact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending',
        }
    },
    {
        sequelize: connection,
        modelName: 'contact',
        paranoid: true,
        scopes: {
            withUser: {
                attributes: {exclude: ['deletedAt', 'updatedAt']},
                include: ['user'],
            }
        }
    }
);

module.exports = Contact;