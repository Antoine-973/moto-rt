import { defineStore } from 'pinia';

import { useAuthStore } from '../stores';
import UserService from '../services/user.service';

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
        user: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            try {
                this.users = await UserService.getAllUsers();
            } catch (error) {
                this.users = { error };
            }
        },
        async getById(id) {
            this.user = { loading: true };
            try {
                this.user = await UserService.getUserById(id);
            } catch (error) {
                this.user = { error };
            }
        },
        async update(id, params) {
            await UserService.updateUser(id, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // update auth user in pinia state
                authStore.user = user;
            }
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.users.find(x => x.id === id).isDeleting = true;

            await UserService.deleteUser(id);

            // remove user from list after deleted
            this.users = this.users.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});