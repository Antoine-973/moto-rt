<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoomsStore } from '@/stores/rooms.store'
import * as Yup from 'yup'
import { useAlertStore, useAuthStore } from '@/stores'
import { Field, Form } from 'vee-validate'
import ChatMessage from '@/components/ChatMessage.vue'

const route = useRoute()
const roomId = route.params.id
const roomsStore = useRoomsStore()

const room = computed(() => roomsStore.rooms[roomId])
const messages = computed(() => room.value?.messages || []);
console.log(messages.value)

const schema = Yup.object().shape({
    message: Yup.string().required('Le message est requis')
});

const alertStore = useAlertStore()
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
                alertStore.error(error.message)
            }

            return;
        }

        roomsStore.updateRoom(data.room);
    });

    socket.on("room:message:received", ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                alertStore.error(error.message)
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

const sendMessage = (values) => {
    const { message } = values;

    console.log(message)

    if (!message.value) {
        return;
    }

    socket.emit("room:message:send", roomId, message.value);

    message.value = "";
};
</script>

<template>
    <div>
        <h1 class='text-3xl text-white'>{{room.name}}</h1>
        <p>{{room.description}}</p>
        <div class='bg-gray-800 rounded-lg w-full h-full mt-5 relative'>
            <div class='p-5'>
                <div v-if="sortedMessages.length">
                    <ChatMessage
                        v-for="message in sortedMessages"
                        :key="message.id"
                        :message="message"
                    />
                </div>
            </div>
            <div class='absolute bottom-0 w-full'>
                <Form v-slot="{ errors, isSubmitting }" :validation-schema="schema" @submit="sendMessage">
                    <div v-if="errors.apiError" class="label-text-alt text-red-500">{{errors.apiError}}</div>
                    <label class="label">
                        <span class="label-text-alt text-red-500">{{ errors.message }}</span>
                    </label>
                    <div class='grid grid-cols-12 grid-rows-1 w-full'>
                        <div class="col-span-11 w-full">
                            <Field name="message" type="text" class="rounded-none input input-bordered w-full" :class="{ 'is-invalid': errors.message }" />
                        </div>
                        <div class="col-span-1 w-full">
                            <button class="rounded-none btn w-full" :disabled="isSubmitting">
                                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                                Envoyer
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>