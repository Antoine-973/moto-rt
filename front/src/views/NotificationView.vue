<script setup>
import SideBarAdmin from '@/components/SideBarAdmin.vue'

import axios from "axios";
import { ref } from "vue";
import { NOTIFICATION_URI } from '@/common/api-ressources/api.ressources.uri'
import { toast } from 'vue3-toastify'
const message = ref("");
const notificationUri = NOTIFICATION_URI

const onSubmit = async () => {
    try {
        await axios.post(notificationUri, { message: message.value });
        toast.success("Notification commerciale envoyé", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
        });
    } catch (err) {
        toast.error("Une erreur est survenue", {
            autoClose: 3000,
        });
    }
};
</script>

<template>
    <main>
        <div class="grid grid-cols-12 grid-rows-1 w-screen h-screen bg-slate-900">
            <div class="h-full col-span-2">
                <SideBarAdmin/>
            </div>
            <div class="col-span-10 flex flex-col w-full p-5">
                <h1 class='text-3xl text-white'>Envoi d'une notification commerciale</h1>
                <div class='p-5'>
                    <form class='grid grid-cols-12 grid-rows-1' @submit.prevent="onSubmit">
                        <div class="col-span-10">
                            <input v-model='message' class="rounded-none input input-bordered w-full" autofocus required type="text" />
                        </div>
                        <div class="col-span-2">
                            <button class="rounded-none btn w-full" type="submit">Envoyer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>