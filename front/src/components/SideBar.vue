<script setup>
    import { useAuthStore } from '@/stores'

    const authStore = useAuthStore()
    const user = authStore.user
</script>

<template>
        <div class="flex flex-col items-center bg-gray-900 h-full text-white border-r border-1 border-gray-700">
            <div class='p-5'>
                <h1 class='text-4xl font-bold'>MotoRT</h1>
            </div>
            <div class="avatar p-3">
                <div class="w-32 rounded-full">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <div class='pt-1 pb-5 text-lg font-bold'>{{user.username}}</div>
            <router-link class="btn w-full bg-gray-900 border-0" to='/'>Demande de communication</router-link>
            <router-link class="btn w-full bg-gray-900 border-0" to='/rooms'>Salons de discussions</router-link>
            <router-link class="btn w-full bg-gray-900 border-0" to='/customers'>Liste des clients</router-link>
            <router-link class="btn w-full bg-gray-900 border-0" to='/'>Button</router-link>
        </div>
</template>