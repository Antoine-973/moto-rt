<template>
    <div>
        <h1>Hi {{authUser?.username}}!</h1>
        <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '../stores';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

</script>