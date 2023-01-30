const { User } = require('../../models')

module.exports = (socket, next) => {
    const user = socket.data.user

    User.findByPk(user.id)
        .then((userInDb) => {
            if (userInDb.role !== 'ROLE_ADMIN') {
                return next(new Error('User is not admin'))
            }
            return next()
        })
        .catch((error) => {
            console.log(error)
            return next(new Error('User not found'))
        })
}
