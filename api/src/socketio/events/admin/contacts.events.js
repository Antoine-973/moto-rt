const { Contact, Conversation } = require('../../../models')


const contactsEvents = (socket, io) => {

    const onContactAccept = async(contactId) => {
        if (typeof contactId !== "number") {
            throw new Error("Identifiant de demande invalide");
        }

        const contact = await Contact.findOne({
            where: { id: contactId },
        });

        if (!contact) {
            throw new Error("Demande non trouvée");
        }

        if (contact.status !== "pending") {
            throw new Error("La demande n'est pas en attente");
        }

        const updateContact = await Contact.update(
            { status: "accepted" },
            { where: { id: contactId } }
        );


        const conversation = await Conversation.create({
            senderId: socket.data.user.id,
            receiverId: contact.userId,
            isWithAdvisor: true,
        });

        socket.emit("contact:accepted", {
            data: { contact: updateContact, conversation },
        });

        io.of("/")
            .to(`user:${contact.userId}`)
            .emit("contact:accepted", {
                data: {
                    contact: updateContact,
                    conversation: conversation,
                },
            });
    }

    const onContactRefuse = async (contactId) => {
        if (typeof contactId !== "number") {
            throw new Error("Identifiant de demande invalide")
        }


        const contact = await Contact.findOne({
            where: { id: contactId },
        });

        if (!contact) {
            throw new Error("Demande non trouvée")
        }

        if (contact.status !== "pending") {
            throw new Error("La demande a déjà été traitée")
        }

        const updatedContact = await Contact.update(
            { status: "refused" },
            { where: { id: contactId } }
        );

        const result = { data: { contact: updatedContact } };

        socket.emit("contact:refused", result);

        io.of("/").to(`user:${contact.userId}`).emit("contact:refused", result);
    }

    const onContacts = async () => {
        const contacts = await Contact.findAll({
            order: [["createdAt", "DESC"]],
        });

        socket.emit("contacts", { data: { contacts } });
    }

    socket.on('contact:accept',onContactAccept);
    socket.on('contact:refuse', onContactRefuse);
    socket.on('contacts', onContacts);
}

module.exports = contactsEvents;

