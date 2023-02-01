<script setup>
import HomeCarousel from '../components/HomeCarousel.vue'
import AppNavbar from '../components/AppNavbar.vue'
import { useAuthStore } from '@/stores'
import ChatBot from '../components/ChatBot.vue'

const authStore = useAuthStore()

const guestUser = {
    id: 0,
    name: 'Guest',
    role: 'ROLE_GUEST',
}

if (!authStore.user) {
    authStore.user = guestUser
}
</script>

<template>
    <header>
        <AppNavbar />
        <HomeCarousel />
    </header>

    <main class='relative'>
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Vous avez un problème ou une question qui ne peuvent être résolu par notre chat bot ou notre FAQ ?</h1>
                    <p class="py-6">Cliquer ici pour être mis en relation avec un de nos conseiller de vente.</p>
                    <router-link class="btn btn-primary" to='/dashboard'>Demande de communication</router-link>
                </div>
            </div>
        </div>
        <ChatBot/>
    </main>
</template>