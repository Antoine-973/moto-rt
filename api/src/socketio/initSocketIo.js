const { Server } = require('socket.io')
const verifyToken = require('./middlewares/verifyToken')
const adminRight = require('./middlewares/adminRight')
const initAdminEvents = require('./events/admin')
const roomsEvents = require('./events/users/rooms.events')

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    })

    io.use(verifyToken)

    initAdminEvents(io)

    const onConnection = (socket) => {
        console.log('[socket.io]: New client connected')

        const { user } = socket.data

        socket.join(`user:${user.id}`)

        socket.emit('user:connected', {
            data: { user: { ...user, role: user.role } },
        })

        roomsEvents(socket, io)

        function onDisconnect() {
            console.log('[socket.io]: Client disconnected')
        }

        socket.on('disconnect', onDisconnect)
    }

    io.on('connection', onConnection)
}
