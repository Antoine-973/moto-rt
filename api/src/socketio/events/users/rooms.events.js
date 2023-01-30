const Room = require('../../../models/Room')
const { Message } = require('../../../models')

const roomsEvents = (socket, io) => {
    const onMessage = async (roomId, text) => {
        console.log('[socket.io]: room:message:send')

        const userInRoom = socket.rooms.has(`room:${roomId}`)

        if (!userInRoom) {
            throw new Error('User not in room')
        }

        const message = await Message.create({
            text,
            roomId,
            userId: socket.data.user.id,
        })

        io.to(`room:${roomId}`).emit('room:message:received', {
            data: { message },
        })
    }

    const onJoin = async (roomId) => {
        console.log('[socket.io]: room:join', roomId)

        Room.scope('withMessages').findByPk(roomId).then(async (room) => {
            if (!room) {
                throw new Error('Room not found')
            }

            const sockets = await io.in(`room:${room.id}`).fetchSockets()

            const uniqueUserIds = new Set(sockets.map(({ data }) => data.user.id))

            const isUserInRoom = uniqueUserIds.has(socket.data.user.id)

            const isRoomFull = uniqueUserIds.size >= room.limit

            if (
                socket.data.user.role !== 'ROLE_ADMIN' &&
                !isUserInRoom &&
                isRoomFull
            ) {
                throw new Error('Room is full')
            }

            socket.join(`room:${roomId}`)

            socket.emit('room:joined', { data: { room } })
        })
    }

    const onLeave = async (roomId) => {
        console.log('[socket.io]: room:leave', roomId)

        socket.leave(`room:${roomId}`)

        socket.emit('room:left', { data: { roomId } })
    }

    const onRooms = async () => {
        console.log('[socket.io]: rooms')
        const rooms = await Room.findAll()

        socket.emit('rooms', { data: { rooms } })
    }

    socket.on('room:message:send', onMessage)
    socket.on('room:join', onJoin)
    socket.on('room:leave', onLeave)
    socket.on('rooms', onRooms)
}

module.exports = roomsEvents
