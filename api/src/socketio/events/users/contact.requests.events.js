const { Contact, Conversation } = require('../../../models')
const { Op } = require('sequelize')


const contactsEvents = (socket, io) => {
    async function onContactCreate() {
        const isAdminAvailable = await (async () => {
            const sockets = await io.of("/admin").fetchSockets();
            return sockets.some(({ data }) => data.user.status !== "invisible");
        })();

        if (!isAdminAvailable) {
            throw new Error("Aucun conseiller n'est disponible pour le moment");
        }

        const pendingContact = await Contact.findOne({
            where: { userId: socket.data.user.id },
        });

        if (pendingContact) {
            return socket.emit("contact:pending", {
                data: { contact: pendingContact },
            });
        }

        const notEndedConversation = await Conversation.findOne({
            where: {
                [Op.or]: [
                    {
                        senderId: socket.data.user.id,
                    },
                    {
                        receiverId: socket.data.user.id,
                    },
                ],
                endedAt: null,
                isWithAdvisor: true,
            },
        });

        if (notEndedConversation) {
            throw new Error("Vous êtes déjà en conversation avec un conseiller");
        }

        const newContact = await Contact.create({
            userId: socket.data.user.id,
        });

        const contactWithUser = await Contact.scope('withUser').findByPk(newContact.id)

        socket.emit("contact:created", { data: { contact: contactWithUser } });

        io.of("/admin").emit("contact:created", { data: { contact: contactWithUser } });
    }

    socket.on("contact:create", onContactCreate, "contact:created");
}

module.exports = contactsEvents;

