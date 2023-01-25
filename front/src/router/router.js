import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import ConfirmAccountView from '../views/ConfirmAccountView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'LoginView',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'RegisterView',
            component: RegisterView,
        },
        {
            path: '/dashboard',
            name: 'DashboardView',
            // lazy-loaded
            component: DashboardView,
        },
        {
            path: '/confirm/:token',
            name: 'ConfirmAccountView.vue',
            component: ConfirmAccountView,
        }
    ],
})

export default router
