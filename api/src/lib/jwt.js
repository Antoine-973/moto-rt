const jwt = require('jsonwebtoken')
const jwtExpiration = process.env.JWT_EXPIRATION
require('dotenv').config()

exports.createToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: jwtExpiration + 's',
        algorithm: 'HS512',
    })
}

exports.decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return {
            id: decoded.id,
            role: decoded.role,
        }
    } catch (error) {
        return null
    }
}
