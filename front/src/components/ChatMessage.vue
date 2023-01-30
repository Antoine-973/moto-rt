<script setup>

import { useAuthStore } from '@/stores'

const message = defineProps({
    message: {
        type: Object,
        required: true
    }
});

const authStore = useAuthStore()
const user = authStore.user;
const myMessage = user.id === message.message.userId
</script>

<template>
    <div v-if='!myMessage' class="chat chat-start">
        <div class="chat-bubble">{{message.message.text}}</div>
    </div>
    <div v-else class="chat chat-end">
        <div class="chat-bubble chat-bubble-primary">{{message.message.text}}</div>
    </div>
</template>
