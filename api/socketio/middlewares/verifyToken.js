const { decodeToken } = require('../../src/lib/jwt')
const { User } = require('../../src/models')

module.exports = (socket, next) => {
    const token = socket.handshake.auth;
    if (!token) {
        return next(new Error('Authentication error'))
    }
    const payloadUser = decodeToken(token)
    if (!payloadUser) {
        return next(new Error('Invalid token'))
    }

    const user = User.scope(["withConversations", "withRooms", "withRole"]).findByPk(payloadUser.id)

    if (!user) {
        return next(new Error('User not found'))
    }

    socket.data.user = user
    next()
}
