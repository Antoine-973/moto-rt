<script setup>

const message = defineProps({
    message: {
        type: Object,
        required: true
    }
});
// const authStore = useAuthStore();
</script>

<template>
    <div class="chat chat-start">
        <div class="chat-bubble">{{message.message}}</div>
    </div>
</template>
