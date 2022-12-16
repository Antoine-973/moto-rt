import { defineStore } from 'pinia'
import { auth } from './auth.module'

const store = defineStore({
    modules: {
        auth,
    },
})

export default store
