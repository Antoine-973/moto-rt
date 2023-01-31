const verifyToken = require('../../middlewares/verifyToken')
const adminRight = require('../../middlewares/adminRight')
const roomsEvents = require('./rooms.events')
const { User } = require('../../../models')
const contactsEvents = require('./contacts.events')

const initAdminEvents = (io) => {
    const admin = io.of('/admin')

    admin.use(verifyToken)
    admin.use(adminRight)

    const onConnection = (socket) => {
        console.log('[socket.io]: New admin connected')

        const user = socket.data.user
        const userId = user.id

        console.log(`Admin connected`, user.username)

        if (user.status === 'online') {
            io.of('/').emit('admin:online', { data: { userId } })
        }

        contactsEvents(socket, io)
        roomsEvents(socket, io)

        const onDisconnect = async () => {
            console.log('[socket.io]: Admin disconnected', userId)

            const user = await User.findByPk(userId)

            if (user?.status === 'online') {
                io.of('/').emit('admin:disconnected', { data: { userId } })
            }
        }

        socket.on('disconnect', onDisconnect)
    }

    admin.on('connection', onConnection)
}

module.exports = initAdminEvents
