<script setup>

import SideBar from '../components/SideBar.vue'
import { useAuthStore } from '@/stores'
import SideBarAdmin from '@/components/SideBarAdmin.vue'
import { onMounted, onUnmounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useConversationsStore } from '@/stores/conversations.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const user = authStore.user;
const isAdmin = user.role === 'ROLE_ADMIN';
const conversationStore = useConversationsStore();
const socket = authStore.socket;
const router = useRouter();

onMounted(() => {
    socket.on("contactRequest:created", ({ errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 3000,
                }); 
            }
            return;
        }

        toast.success("Demande envoyée, un conseiller va vous contacter", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
        });
    });

    socket.on("contactRequest:pending", ({ errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 3000,
                });
            }

            return;
        }

        toast.info("Vous êtes déjà en attente d'un conseiller");
    });

    socket.on("contactRequest:accepted", ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 3000,
                });
            }

            return;
        }

        toast.success(
            "Un conseiller à accepter votre demande, cliquez ici pour rejoindre la conversation",
            {
                onClick: () => {
                    router.push({
                        name: "conversation",
                        params: { conversationId: data.conversation.id },
                    });
                },
            }
        );
        conversationStore.setConversation(data.conversation);
    });

    socket.on("contactRequest:refused", ({ errors }) => {
        if (errors) {
            for (const error of errors) {
                toast.error(error.message);
            }

            return;
        }

        toast.warning("Aucun conseiller ne peut vous contactRequester pour le moment");
    });
});

onUnmounted(() => {
    socket.off("conversations");
    socket.off("contactRequest:created");
    socket.off("contactRequest:pending");
    socket.off("contactRequest:accepted");
    socket.off("contactRequest:refused");
});

const conversationRequest =() => {
    socket.emit("contactRequest:create");
}

</script>

<template>
    <main>
        <div class="grid grid-cols-12 grid-rows-1 w-screen h-screen bg-slate-900">
            <div class="h-full col-span-2">
                <SideBar v-if='!isAdmin'/>
                <SideBarAdmin v-else/>
            </div>
            <div class="col-span-10 flex flex-col w-full p-5">
                <h1 class='text-3xl text-white'>Tableau de bord d'assistance</h1>
                <div>
                    <h2 class='text-xl text-white'>Bonjour {{ user.username }} vous avez demandez notre aide.</h2>
                    <h3 class='text-lg text-white'>Vous vous trouvez dans notre nouveau système de support client via échange instantané.</h3>
                    <p>Soyez mis en contactRequest avec un conseiller en cliquant ici :</p>
                    <button v-if="user.role !== 'ROLE_ADMIN'" class='btn btn-primary' @click="conversationRequest">Contacter un conseiller</button>
                    <p>Discuter avec les autres clients :</p>
                    <router-link to='/conversations' class='btn btn-primary'>Discuter par message privé</router-link>
                    <router-link to='/rooms' class='btn btn-primary'>Discuter dans des salons publics</router-link>
                </div>
            </div>
        </div>
    </main>
</template>