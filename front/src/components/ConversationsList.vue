<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useConversationsStore } from '@/stores/conversations.store'
import { useAlertStore, useAuthStore } from '@/stores'

const conversationsStore = useConversationsStore();
const authStore = useAuthStore();
const socket = authStore.socket
const alertStore = useAlertStore();
const conversations = computed(() => Object.values(conversationsStore.conversations));

onMounted(() => {
    socket.emit("conversations");

    socket.on("conversations", ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                alertStore.error(error.message)
            }

            return;
        }

        conversationsStore.updateConversations(data.conversations);
    });
});

onUnmounted(() => {
    socket.off("conversations");
});
</script>

<template>
    <div v-if='conversations.length !== 0' class='grid grid-cols-12 grid-rows-4 bg-grey-800 w-full p-5 gap-5'>
        <div v-for='conversation in conversations' :key='conversation.id' class='col-span-2'>
            <div class="card w-84 bg-gray-800 text-primary-content">
                <div class="card-body">
                    <h2 class="card-title">{{conversation.receiver.username}}</h2>
                    <div class="card-actions justify-end">
                        <RouterLink :to='{name: "ConversationView", params: {id: conversation.id}}' class="btn btn-primary">Discuter</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class='flex flex-col items-center justify-center h-2/3 gap-3'>
        <h2 class='text-2xl text-white'>Vous n'avez aucune discussions</h2>
    </div>
</template>