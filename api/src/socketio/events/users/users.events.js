const User = require('../../../models/User')

const usersEvents = (socket, io) => {

    const onUsers = async () => {
        const customers = await User.findAll({
            where: {
                role: 'ROLE_USER'
            }
        })

        socket.emit('users', { data: { customers } })
    }

    socket.on('users', onUsers)
}

module.exports = usersEvents
