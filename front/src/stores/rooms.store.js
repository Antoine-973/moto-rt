import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoomsStore = defineStore('rooms', () => {
    const rooms = ref({})

    const updateRooms = (newRooms) => {
        rooms.value = newRooms.reduce((accumulator, room) => {
            const existingRoom = accumulator[room.id]

            if (existingRoom) {
                accumulator[room.id] = { ...existingRoom, ...room }
            } else {
                accumulator[room.id] = { messages: [], users: [], ...room }
            }

            return accumulator
        }, rooms.value)
    }

    const updateRoom = (newRoom) => {
        rooms.value[newRoom.id] = { ...rooms.value[newRoom.id], ...newRoom }
    }

    const addMessage = (roomId, message) => {
        rooms.value[roomId]?.messages?.push(message)
    }

    return {
        rooms,
        updateRooms,
        updateRoom,
        addMessage,
    }
})
