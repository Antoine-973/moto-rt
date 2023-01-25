require('dotenv').config();
const connection = require("./db");
const { Model, DataTypes } = require("sequelize");

class RefreshToken extends Model {}

RefreshToken.init(
    {
        token: {
            type: DataTypes.STRING,
        },
        expires: {
            type: DataTypes.DATE,
        },
        userId: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize: connection,
        modelName: "refreshToken",
        paranoid: true,
    }
);

RefreshToken.createToken = async function (user) {
    const expires = new Date();

    expires.setSeconds(expires.getSeconds() + process.env.JWT_REFRESH_EXPIRATION);

    const refreshToken = await RefreshToken.create({
        token: require('crypto').randomBytes(32).toString('hex'),
        userId: user.id,
        expires: expires.getTime(),
    });

    return refreshToken.token;
};

RefreshToken.verifyExpiration = (token) => {
    return token.expires.getTime() < new Date().getTime();
}

module.exports = RefreshToken;