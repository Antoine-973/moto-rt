<script setup>
    import { storeToRefs } from 'pinia';

    import { useAuthStore } from '../stores';

    const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);

    console.log(authUser.value.user);
</script>

<template>
        <div class="flex flex-col items-center bg-gray-900 h-screen text-white border-r border-1 border-gray-700">
            <div class='p-5'>
                <h1 class='text-4xl font-bold'>MotoRT</h1>
            </div>
            <div class="avatar p-3">
                <div class="w-32 rounded-full">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <div class='pt-1 pb-5 text-lg font-bold'>{{authUser.username}}</div>
            <router-link class="btn w-full bg-gray-900 border-0" to='/'>Demande de communication</router-link>
            <router-link class="btn w-full bg-gray-900 border-0" to='/'>Button</router-link>
            <router-link class="btn w-full bg-gray-900 border-0" to='/'>Button</router-link>
            <router-link class="btn w-full bg-gray-900 border-0" to='/'>Button</router-link>
        </div>
</template>