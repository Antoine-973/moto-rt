<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoomsStore } from '@/stores/rooms.store'
import { useAuthStore } from '@/stores'
import ChatMessage from '@/components/ChatMessage.vue'
import { toast } from 'vue3-toastify'

const message = ref("");
const route = useRoute()
const roomId = route.params.id
const roomsStore = useRoomsStore()
const room = computed(() => roomsStore.rooms[roomId])
const messages = computed(() => room.value.messages || []);

const authStore = useAuthStore()
const socket = authStore.socket

const sortedMessages = computed(() =>
    messages.value.slice().sort((a, b) => {
        if (new Date(a.createdAt) > new Date(b.createdAt)) {
            return 1;
        }

        return -1;
    })
);

onMounted(() => {
    socket.emit("room:join", roomId);

    socket.on("room:joined", ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 3000,
                });
            }

            return;
        }

        roomsStore.updateRoom(data.room);
    });

    socket.on("room:message:received", ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 3000,
                });
            }

            return;
        }

        roomsStore.addMessage(roomId, data.message);
    });
});

onUnmounted(() => {
    socket.emit("room:leave", roomId);
    socket.off("room:joined");
    socket.off("room:message:received");
});

const sendMessage = () => {
    if (!message.value) {
        return;
    }

    socket.emit("room:message:send", +roomId, message.value);

    message.value = "";
};
</script>

<template>
    <div>
        <h1 class='text-3xl text-white'>{{room.name}}</h1>
        <p>{{room.description}}</p>
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