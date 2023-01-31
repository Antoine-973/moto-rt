
const { Message } = require('../../../models')

const chatBotEvents = (socket, io) => {
    const onMessage = async (text) => {
        console.log('[socket.io]: message:send')


        const message = await Message.create({
            text,
            userId: socket.data.user.id,
        })

        io.to(`room:${roomId}`).emit('message:received', {
            data: { message },
        })
    }

    socket.on('user:message:send', onMessage)
}

module.exports = chatBotEvents
