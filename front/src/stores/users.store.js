import { defineStore } from 'pinia'
import UserService from '@/services/user.service'

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
    }),
    actions: {
        async getAll() {
            // use axios to get all users
            UserService.getAllUsers().then((response) => {
                this.users = response.data
            })
        },
    },
})
