const { decodeToken } = require('../../lib/jwt')
const { User } = require('../../models')
const sse = require('../../middlewares/sse')

module.exports = (socket, next) => {
    const token = socket.handshake.auth
    if (!token.token) {
        return next(new Error('Authentication error'))
    }
    const payloadUser = decodeToken(token.token)
    if (!payloadUser) {
        return next(new Error('Invalid token'))
    }

    User.findByPk(payloadUser.id)
        .then((user) => {
            socket.data.user = user
            return next()
        })
        .catch((error) => {
            console.log(error)
            return next(new Error('User not found'))
        })
}
