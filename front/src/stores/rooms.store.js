import { defineStore } from 'pinia';
import RoomsService from '@/services/rooms.service'

export const useRoomsStore = defineStore({
    id: 'rooms',
    state: () => ({
        rooms: [],
        currentRoom: null,
    }
    ),
    actions: {
        async getRooms() {
            return RoomsService.getRooms().then(
                (response) => {
                    this.rooms = response
                    return Promise.resolve(response)
                },
                (error) => {
                    return Promise.reject(error)
                }
            )
        },
        async getRoom(id) {
            return RoomsService.getRoom(id).then(
                (response) => {
                    this.currentRoom = response
                    return Promise.resolve(response)
                },
                (error) => {
                    return Promise.reject(error)
                }
            )
        },
        async createRoom(room) {
            return RoomsService.createRoom(room).then(
                (response) => {
                    this.rooms.push(response.data)
                    return Promise.resolve(response.data)
                }
            )
        },
        async updateRoom(room) {
            return RoomsService.updateRoom(room).then(
                (response) => {
                    const index = this.rooms.findIndex((r) => r.id === room.id)
                    this.rooms[index] = response.data
                    return Promise.resolve(response.data)
                }
            )
        },
        async deleteRoom(id) {
            return RoomsService.deleteRoom(id).then(
                (response) => {
                    const index = this.rooms.findIndex((r) => r.id === id)
                    this.rooms.splice(index, 1)
                    return Promise.resolve(response.data)
                }
            )
        }
    }
});