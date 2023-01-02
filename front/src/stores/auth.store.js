import { defineStore } from 'pinia'
import jwt_decode from 'jwt-decode'
import router from '../router/router.js'
import AuthService from '../services/auth.service'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: jwt_decode(JSON.parse(localStorage.getItem('user')).token),
        returnUrl: null,
    }),
    actions: {
        async login(email, password) {
            const jwtToken = await AuthService.login({ email, password })

            this.user = jwt_decode(jwtToken.token)

            await router.push(this.returnUrl || '/')
        },
        logout() {
            this.user = null
            localStorage.removeItem('user')
            router.push('/login')
        },
    },
})
