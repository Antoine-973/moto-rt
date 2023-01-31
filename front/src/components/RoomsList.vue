<script setup>
import { useRoomsStore } from '@/stores/rooms.store'
import { useAlertStore, useAuthStore } from '@/stores'
import NewRoomModal from '@/components/NewRoomModal.vue'
import { onMounted } from 'vue'
import EditRoomModal from '@/components/EditRoomModal.vue'

const authStore = useAuthStore()
const alertStore = useAlertStore()
const roomsStore = useRoomsStore()
const socket = authStore.socket
const adminSocket = authStore.adminSocket

onMounted(() => {
    socket.emit("rooms");

    socket.on("rooms", ({ data, errors }) => {
        if (errors) {
            for (const error of errors) {
                alertStore.error(error.message)
            }

            return;
        }

        roomsStore.updateRooms(data.rooms)
    });
});
const rooms = roomsStore.rooms
const user = authStore.user

const deleteRoom = (roomId) => {
    adminSocket.emit("room:delete", roomId);
}
</script>

<template>
    <div v-if='rooms.length !== 0' class='grid grid-cols-12 grid-rows-4 bg-grey-800 w-full p-5 gap-5'>
        <div v-for='room in rooms' :key='room.id' class='col-span-2'>
            <div class="card w-84 bg-gray-800 text-primary-content">
                <div class="card-body">
                    <h2 class="card-title">{{room.name}}</h2>
                    <p>{{room.description}}</p>
                    <div class="mt-5 card-actions justify-center">
                        <router-link class="btn" :to='{name: "RoomView", params: {id: room.id}}'>Rejoindre</router-link>
                    </div>
                </div>
            </div>
            <div class='mt-5 flex justify-between'>
                <div v-if='user.role === "ROLE_ADMIN"'>
                    <EditRoomModal :initial-room="room"/>
                </div>
                <div v-if='user.role === "ROLE_ADMIN"'>
                    <button class='btn btn-error' @click='deleteRoom(room.id)'>Supprimer</button>
                </div>
            </div>
        </div>
        <div v-if='user.role === "ROLE_ADMIN"' class='col-span-2'>
            <NewRoomModal />
        </div>
    </div>
    <div v-else class='flex flex-col items-center justify-center h-2/3 gap-3'>
        <h2 class='text-2xl text-white'>Il n'y aucune salle de discussions</h2>
        <div v-if='user.role === "ROLE_ADMIN"'>
            <NewRoomModal />
        </div>
    </div>
</template>