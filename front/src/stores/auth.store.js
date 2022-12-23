import { defineStore } from 'pinia';

import router from '../router/router.js';
import AuthService from '../services/auth.service'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            console.log('login');
            const user = await AuthService.login({ email, password });

            console.log("dfiohzhfze", user);

            // update pinia state
            this.user = user;

            // stores user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            await router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});