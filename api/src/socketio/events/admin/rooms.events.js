const Room = require('../../../models/Room')

const roomsEvents = (socket, io) => {
    async function createRoom(room) {
        const { name, description, limit } = room

        const newRoom = await Room.create({
            name,
            description,
            limit,
        })

        io.emit('roomCreated', newRoom)

        io.of('/').emit('roomCreated', newRoom)
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

        io.emit('roomUpdated', updatedRoom)

        io.of('/').emit('roomUpdated', updatedRoom)
    }

    async function deleteRoom(id) {
        const deletedRoom = await Room.destroy({
            where: {
                id,
            },
        }).then(() => {
            io.emit('roomDeleted', deletedRoom)

            io.of('/').emit('roomDeleted', deletedRoom)
        })
    }

    async function restoreRoom(id) {
        const restoredRoom = await Room.restore({
            where: {
                id,
            },
        })

        io.emit('roomRestored', restoredRoom)

        io.of('/').emit('roomRestored', restoredRoom)
    }

    socket.on('createRoom', createRoom)
    socket.on('updateRoom', updateRoom)
    socket.on('deleteRoom', deleteRoom)
    socket.on('restoreRoom', restoreRoom)
}

module.exports = roomsEvents
