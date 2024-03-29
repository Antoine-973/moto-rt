import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import ConfirmAccountView from '../views/ConfirmAccountView.vue'
import { useAuthStore } from '@/stores'
import RoomsView from '../views/RoomsView.vue'
import RoomView from '@/views/RoomView.vue'
import ConversationView from '@/views/ConversationView.vue'
import ConversationsView from '@/views/ConversationsView.vue'
import NotificationView from '@/views/NotificationView.vue'
import ContactsRequestsView from '@/views/ContactsRequestsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'HomeView',
            meta: { role: 'Guest' },
            component: HomeView,
        },
        {
            path: '/login',
            name: 'LoginView',
            meta: { role: 'Guest' },
            component: LoginView,
        },
        {
            path: '/register',
            name: 'RegisterView',
            meta: { role: 'Guest' },
            component: RegisterView,
        },
        {
            path: '/dashboard',
            name: 'DashboardView',
            meta: { role: 'ROLE_USER' },
            component: DashboardView,
        },
        {
            path: '/notification',
            name: 'NotificationView.vue',
            meta: { role: 'ROLE_ADMIN' },
            component: NotificationView,
        },
        {
            path: '/conversations/requests/',
            name: 'ConversationRequestsView',
            meta: { role: 'ROLE_CONSEILLER' },
            component: ContactsRequestsView,
        },
        {
            path: '/conversations',
            name: 'ConversationsView',
            meta: { role: 'ROLE_USER' },
            component: ConversationsView,
        },
        {
            path: '/conversations/:id',
            name: 'ConversationView',
            meta: { role: 'ROLE_USER' },
            component: ConversationView,
        },
        {
            path: '/rooms',
            name: 'RoomsView',
            meta: { role: 'ROLE_USER' },
            component: RoomsView,
        },
        {
            path: '/rooms/:id',
            name: 'RoomView',
            meta: { role: 'ROLE_USER' },
            component: RoomView,
            params: true,
        },
        {
            path: '/confirm/:token',
            name: 'ConfirmAccountView',
            meta: { role: 'Guest' },
            component: ConfirmAccountView,
        },
    ],
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const token = localStorage.getItem('token')
    if (to.meta.role !== 'Guest') {
        if (token) {
            authStore
                .me()
                .then((response) => {
                    if (
                        to.meta.role === response.role ||
                        response.role === 'ROLE_ADMIN'
                    ) {
                        next()
                    }
                })
                .catch((error) => {
                    console.log(error)
                    next({ name: 'LoginView' })
                })
        } else {
            next({ name: 'LoginView' })
        }
    } else {
        if (to.name === 'LoginView' || to.name === 'RegisterView') {
            if (token) {
                const user = authStore.me().then((response) => {
                    return response
                })
                if (user) {
                    next({ name: 'HomeView' })
                } else {
                    next()
                }
            } else {
                next()
            }
        } else {
            next()
        }
    }
})

export default router
