<script setup>

import SideBar from '../components/SideBar.vue'
import { useAuthStore } from '@/stores'
import SideBarAdmin from '@/components/SideBarAdmin.vue'

const authStore = useAuthStore()
const user = authStore.user;
const isAdmin = user.role === 'ROLE_ADMIN';

</script>

<template>
    <main>
        <div class="grid grid-cols-12 grid-rows-1 w-screen h-screen bg-slate-900">
            <div class="h-full col-span-2">
                <SideBar v-if='!isAdmin'/>
                <SideBarAdmin v-else/>
            </div>
            <div class="col-span-10 flex flex-col w-full p-5">
                <h1 class='text-3xl text-white'>Tableau de bord</h1>
            </div>
        </div>
    </main>
</template>