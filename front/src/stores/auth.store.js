import { defineStore } from 'pinia'
import AuthService from '../services/auth.service'
import axios from 'axios'
import TokenService from '@/services/token.service'
import router from '@/router/router'
import { ref, watch } from 'vue'
import { io } from 'socket.io-client'
import environment from '../environments/environment'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', () => {
    const tokenInLocalStorage = localStorage.getItem('token') || null

    const token = ref(tokenInLocalStorage)
    const user = ref(null)
    const socket = ref(null)
    const adminSocket = ref(null)
    const loggedIn = ref(!!tokenInLocalStorage || false)
    const eventSource = ref(null)

    watch(user, (newUser) => {
        if (newUser) {
            socket.value = io(environment.SOCKET_IO_URL, {
                auth: { token: token.value },
            })
            if (newUser.role === 'ROLE_ADMIN') {
                adminSocket.value = io(`${environment.SOCKET_IO_URL}/admin`, {
                    auth: { token: token.value },
                })
            }
            if (newUser.role !== 'ROLE_ADMIN') {
                eventSource.value = new EventSource(
                    `${environment.API_BASE_URL}/sse`,
                    { withCredentials: true }
                )
            }
        } else {
            socket.value.disconnect()
            adminSocket.value.disconnect()
            eventSource.value.close()
        }
    })

    const displayNotification = (event) => {
        if (!event.data) return

        const data = JSON.parse(event.data)

        if (!data.message) return

        toast.info(data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
        })
    }

    watch(eventSource, (event) => {
        if (!event) return

        event.addEventListener('notification', displayNotification)
    })

    const me = async () => {
        if (!token.value) {
            logout()
            return Promise.reject('No JWT token provided.')
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

        return AuthService.me()
            .then((response) => {
                user.value = response
                return Promise.resolve(response)
            })
            .catch((error) => {
                logout()
                return Promise.reject(error)
            })
    }
    const login = async (email, password) => {
        return AuthService.login({ email, password }).then(
            (response) => {
                token.value = response.token
                loggedIn.value = true
                return Promise.resolve(response)
            },
            (error) => {
                loggedIn.value = false
                user.value = null
                return Promise.reject(error)
            }
        )
    }
    const register = async (user) => {
        return AuthService.register(user).then(
            (response) => {
                loggedIn.value = false
                return Promise.resolve(response.data)
            },
            (error) => {
                loggedIn.value = false
                return Promise.reject(error)
            }
        )
    }
    const logout = () => {
        TokenService.removeToken()
        token.value = null
        user.value = null
        loggedIn.value = false
        router.push({ name: 'LoginView' })
    }

    return {
        token,
        user,
        socket,
        adminSocket,
        loggedIn,
        me,
        login,
        register,
        logout,
    }
})
