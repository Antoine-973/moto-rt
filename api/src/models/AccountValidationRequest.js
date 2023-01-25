const {Model, DataTypes} = require('sequelize');
const connection = require('./db');
const bcryptjs = require('bcryptjs');

class AccountValidationRequest extends Model {}

AccountValidationRequest.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: 'accountValidationRequest',
        paranoid: true
    }
);

module.exports = AccountValidationRequest;