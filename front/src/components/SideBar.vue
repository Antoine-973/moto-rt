<script setup>
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
    const user = authStore.user
</script>

<template>
        <div class="flex flex-col items-center bg-gray-900 h-full text-white border-r border-1 border-gray-700">
            <div class='p-5'>
                <router-link to='/' class='text-4xl font-bold'>MotoRT</router-link>
            </div>
            <div class="avatar p-3">
                <div class="avatar online placeholder">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-24">
                        <span class="text-xl">{{user.username}}</span>
                    </div>
                </div>
            </div>
            <div class='pt-1 pb-5 text-lg font-bold'>{{user.username}}</div>
            <router-link class="btn w-full bg-gray-900 border-0 rounded-none" to='/dashboard'>Tableau de bord</router-link>
            <router-link class="btn w-full bg-gray-900 border-0" to='/rooms'>Salons de discussions</router-link>
            <router-link class="btn w-full bg-gray-900 border-0" to='/conversations'>Mes conversations</router-link>
            <button class="btn btn-error w-full rounded-none border-0 text-white" @click="authStore.logout">Déconnexion</button>
        </div>
</template>