<script setup>
    import authService from '../services/auth.service'
    import { useRoute } from 'vue-router'

    const route = useRoute();
    const token = route.params.token;
    console.log(token);
    const requestIsValided = authService.verifyAccount(token);
</script>

<template>
    <main>
        <div v-if='requestIsValided'>
            <h1>Account verified</h1>
            <p>Your account has been verified. You can now log in.</p>
        </div>
        <div v-else>
            <h1>Invalid request</h1>
            <p>The request is invalid or has expired.</p>
        </div>
    </main>
</template>