import { defineStore } from 'pinia'
import AuthService from '../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: initialState,
    }),
    actions: {
        async login(email, password) {
            return AuthService.login({ email, password }).then(
                user => {
                    this.user = user;
                    this.status = { loggedIn: true };
                    return Promise.resolve(user);
                },
                error => {
                    this.status = { loggedIn: false };
                    this.user = null;
                    return Promise.reject(error);
                }
            );
        },
        async register(user) {
            return AuthService.register(user).then(
                response => {
                    this.status = { loggedIn: false };
                    return Promise.resolve(response.data);
                },
                error => {
                    this.status = { loggedIn: false };
                    return Promise.reject(error);
                }
            );
        },
        logout() {
            AuthService.logout();
            this.user = null;
            this.status = { loggedIn: false };
        },
        refreshToken(accessToken) {
            this.status = { loggedIn: true };
            this.user = {...this.user, accessToken};
        }
    },
})
