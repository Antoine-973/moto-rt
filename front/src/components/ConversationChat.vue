<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ChatMessage from './ChatMessage.vue'
import { useConversationsStore } from '@/stores/conversations.store'
import { useAuthStore } from '@/stores'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'

const route = useRoute()
const conversationId = route.params.id
const conversationStore = useConversationsStore()
const authStore = useAuthStore();
const conversation = computed(() => conversationStore.conversations[conversationId]);
const message = ref("");
const socket = authStore.socket
const messages = computed(() => conversation.value.messages || []);

const sortedMessages = computed(() =>
    messages.value.slice().sort((a, b) => {
        if (new Date(a.createdAt) > new Date(b.createdAt)) {
            return 1;
        }

        return -1;
    })
);

const sendMessage = async () => {
    if (!message.value) {
        return;
    }

    socket.emit("conversation:message:send", +conversationId, message.value);

    message.value = "";
};

onMounted(() => {
    socket.emit("conversation", +conversationId);

    socket.on("conversation", ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 3000,
                });
            }
            return;
        }

        conversationStore.updateConversation(data.conversation);
    });

    socket.on("conversation:message:received", async ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 3000,
                });
            }

            return;
        }

        conversationStore.addMessage(conversationId, data.message);
    });
});

onUnmounted(() => {
    socket.off("conversation");
    socket.off("conversation:message:received");
});
</script>

<template>
    <div>
        <h1 class='text-3xl text-white'>{{conversation.receiver.username}}</h1>
        <div class='bg-gray-800 rounded-lg w-full h-full mt-5 relative'>
            <div class='p-5'>
                <div>
                    <ChatMessage
                        v-for="message in sortedMessages"
                        :key="message.id"
                        :message="message"
                    />
                </div>
            </div>
            <div class='absolute bottom-0 w-full'>
                <div class='grid grid-cols-12 grid-rows-1 w-full'>
                    <div class="col-span-11 w-full">
                        <input v-model.trim='message' class="rounded-none input input-bordered w-full" autofocus type="text" @keyup.enter="sendMessage" />
                    </div>
                    <div class="col-span-1 w-full">
                        <button class="rounded-none btn w-full" @click="sendMessage">
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

