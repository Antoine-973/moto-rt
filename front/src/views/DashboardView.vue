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
        <div class="grid grid-cols-12 grid-rows-1 w-full h-full bg-slate-900">
            <div class="h-screen col-span-2">
                <SideBar v-if='!isAdmin'/>
                <SideBarAdmin v-else/>
            </div>
            <div class="col-span-10">

            </div>
        </div>
    </main>
</template>