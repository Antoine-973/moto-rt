<script setup>
import HomeCarousel from '../components/HomeCarousel.vue'
import AppNavbar from '../components/AppNavbar.vue'
import { useAuthStore } from '@/stores'

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
        <div class='fixed bottom-5 right-5 z-50'>
            <div class="dropdown dropdown-top dropdown-left">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar online placeholder">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-16">
                        <span class="text-xl">CB</span>
                    </div>
                </label>
                <div
                    tabindex="0"
                    class="menu menu-compact dropdown-content w-[32rem] h-[32rem] p-5 shadow bg-base-100 rounded-box w-52"
                >
                    <div class="chat chat-start">
                        <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
                    </div>
                    <div class="chat chat-end">
                        <div class="chat-bubble">You underestimate my power!</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>