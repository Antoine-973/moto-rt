<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useAuthStore } from '@/stores'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const adminSocket = authStore.adminSocket
const contacts = ref({});
const router = useRouter();

onMounted(() => {
    adminSocket.emit("contacts");

    adminSocket.on("contacts", ({ data, errors }) => {
        console.log('dvuzad')
        if (errors) {
            for (const error of errors) {
                toast.error(error.message);
            }

            return;
        }

        contacts.value = data.contacts;
    });

    adminSocket.on("contact:accepted", ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message);
            }

            return;
        }

        const { conversation, contacts } = data;
        const { status, id } = contacts;
        const storeContactRequest = contacts.value[id];

        if (storeContactRequest) {
            storeContactRequest.status = status;
        }

        toast.success("Demande accepté, cliquez ici pour aller à la conversation", {
            onClick: () =>
                router.push({
                    name: "conversation",
                    params: { conversationId: conversation.id },
                }),
        });
    });

    adminSocket.on("contact:refused", ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message);
            }

            return;
        }

        if (!contacts.value) {
            return;
        }

        const { status, id } = data.contacts;

        const contacts = contacts.value[id];

        if (contacts) {
            contacts.status = status;
        }
    });

    adminSocket.on("contact:created", ({ errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message);
            }

            return;
        }

    });
});

onUnmounted(() => {
    adminSocket.off("contacts");
    adminSocket.off("contact:accepted");
    adminSocket.off("contact:refused");
    adminSocket.off("contact:created");
});

const onAcceptContact = (contactsId) => {
    adminSocket.emit("contact:accept", +contactsId);
}

const onRefuseContact = (contactsId) => {
    adminSocket.emit("contact:refuse", +contactsId);
}
</script>

<template>
    <div class='p-5'>
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                <tr>
                    <th></th>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Date de la demande</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="contact in contacts.value" :key="contact.id">
                    <td>{{ contact.user.username }}</td>
                    <td>{{ contact.user.email }}</td>
                    <td>{{ contact.status }}</td>
                    <td>{{ contact.createdAt }}</td>
                    <td v-if="contact.status === 'pending'">
                        <button @click="onAcceptContact(contact.id)" class='btn-primary'>
                            Accepter
                        </button>
                        <button @click="onRefuseContact(contact.id)" class='btn-error'>
                            Refuser
                        </button>
                    </td>
                    <div v-else class="treated">
                        <span>Demande déjà traitée</span>
                    </div>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>