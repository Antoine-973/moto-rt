const Room = require('../../../models/Room')
const roomsEvents = (socket, io) => {
    async function createRoom(room) {
        const { name, description, limit } = room

        const newRoom = await Room.create({
            name,
            description,
            limit,
        })

        io.emit('room:created', newRoom)

        io.of('/').emit('room:created', newRoom)
    }

    async function updateRoom(room) {
        const { id, name, description, limit } = room

        const updatedRoom = await Room.update(
            {
                name,
                description,
                limit,
            },
            {
                where: {
                    id,
                },
            }
        )

        io.emit('room:updated', updatedRoom)

        io.of('/').emit('room:updated', updatedRoom)
    }

    async function deleteRoom(id) {
        const deletedRoom = await Room.destroy({
            where: {
                id,
            },
        })

        io.emit('room:deleted', deletedRoom)

        io.of('/').emit('room:deleted', deletedRoom)
    }

    async function restoreRoom(id) {
        const restoredRoom = await Room.restore({
            where: {
                id,
            },
        })

        io.emit('room:restored', restoredRoom)

        io.of('/').emit('room:restored', restoredRoom)
    }

    socket.on('room:create', createRoom)
    socket.on('room:update', updateRoom)
    socket.on('room:delete', deleteRoom)
    socket.on('room:restore', restoreRoom)
}

module.exports = roomsEvents
