import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import BoardUser from '../views/BoardUser.vue'
import BoardAdmin from '../views/BoardAdmin.vue'

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
            path: '/profile',
            name: 'ProfileView',
            // lazy-loaded
            component: ProfileView,
        },
        {
            path: '/user',
            name: 'BoardUser',
            // lazy-loaded
            component: BoardUser,
        },
        {
            path: '/admin',
            name: 'BoardAdmin',
            // lazy-loaded
            component: BoardAdmin,
        },
    ],
})

export default router
