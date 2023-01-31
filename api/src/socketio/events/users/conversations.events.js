const { Conversation, Message } = require("../../../models");
const { Op } = require("sequelize");

const conversationsEvents = (socket, io) => {

    async function onMessage(
        conversationId,
        text
    ) {
        if (typeof conversationId !== "number") {
            throw new Error("Identifiant de conversation invalide");
        }

        console.log("[socket.io]: conversation:message:send");

        const conversation = await Conversation.findOne({
            where: {
                [Op.or]: [
                    { senderId: socket.data.user.id, },
                    { receiverId: socket.data.user.id, },
                ]
            }
        })

        if (!conversation) {
            throw new Error("Conversation non trouvée");
        }

        if (conversation.endedAt) {
            throw new Error(
                "Conversation terminée, impossible d'envoyer un message"
            );
        }

        const message = await Message.create({
            text,
            conversationId,
            userId: socket.data.user.id,
        });

        const result = { data: { message } };

        socket.emit("conversation:message:received", result);

        io.to(`user:${conversation.receiver.id}`).emit(
            "conversation:message:received",
            result
        );
    }

    async function onConversation(conversationId) {
        if (typeof conversationId !== "number") {
            throw new Error("Identifiant de conversation invalide");
        }

        const conversation = await Conversation.scope("conversationWithMessages").findOne({
            where: {
                [Op.or]: [
                    { senderId: socket.data.user.id, },
                    { receiverId: socket.data.user.id, },
                ],
                id: conversationId,
            }
        })

        if (!conversation) {
            throw new Error("Conversation non trouvée");
        }

        socket.emit("conversation", { data: { conversation } });
    }

     const onConversations = async () => {
        const conversations = await Conversation.findAll({
            where: {
                [Op.or]: [
                    { senderId: socket.data.user.id, },
                    { receiverId: socket.data.user.id, },
                ]
            }
        })

        socket.emit("conversations", { data: { conversations } });
    }

    socket.on("conversation:message:send", onMessage, "conversation:message:received");
    socket.on("conversation", onConversation, "conversation");
    socket.on("conversations", onConversations, "conversations");
};

module.exports = conversationsEvents;

