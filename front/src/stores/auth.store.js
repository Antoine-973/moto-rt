import { defineStore } from 'pinia'
import AuthService from '../services/auth.service'
import axios from 'axios'
import TokenService from '@/services/TokenService'

const token = localStorage.getItem('token') || null

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: token,
        user: null,
        loggedIn: !!token || false,
    }),
    actions: {
        me() {
            if (!this.token) {
                return Promise.reject('No JWT token provided.')
            }

            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${this.token}`

            return AuthService.me().then((user) => {
                this.user = user
                return Promise.resolve(user)
            })
        },
        async login(email, password) {
            return AuthService.login({ email, password }).then(
                (user) => {
                    this.user = user
                    this.loggedIn = true
                    return Promise.resolve(user)
                },
                (error) => {
                    this.loggedIn = false
                    this.user = null
                    return Promise.reject(error)
                }
            )
        },
        async register(user) {
            return AuthService.register(user).then(
                (response) => {
                    this.loggedIn = false
                    return Promise.resolve(response.data)
                },
                (error) => {
                    this.loggedIn = false
                    return Promise.reject(error)
                }
            )
        },
        logout() {
            TokenService.removeToken()
            this.token = null
            this.user = null
            this.loggedIn = false
        },
        refreshToken(accessToken) {
            this.loggedIn = false
            this.user = { ...this.user, accessToken }
        },
    },
})
