import { defineStore } from 'pinia'
import { useAuthPreferencesStore } from './auth-preferences'
import { useAuthEmailStore } from './auth-email'

export const useAuthUserStore = defineStore('authUser', {
    // convert to a function
    state: () => ({
    firstName: '',
    lastName: '',
    userId: null
}),
    getters: {
    // firstName getter removed, no longer needed
    fullName: (state) => `${state.firstName} ${state.lastName}`,
        loggedIn: (state) => state.userId !== null,
        // must define return type because of using `this`
        fullUserDetails (state) {
        // import from other stores
        const authPreferencesStore = useAuthPreferencesStore()
        const authEmailStore = useAuthEmailStore()
        return {
            ...state,
            // other getters now on `this`
            fullName: this.fullName,
            ...authPreferencesStore.$state,
            ...authEmailStore.details
        }
    }
},
actions: {
    // no context as first argument, use `this` instead
    async loadUser (id) {
        if (this.userId !== null) throw new Error('Already logged in')
        const res = await api.user.load(id)
        this.updateUser(res)
    },
    // mutations can now become actions, instead of `state` as first argument use `this`
    updateUser (payload) {
        this.firstName = payload.firstName
        this.lastName = payload.lastName
        this.userId = payload.userId
    },
    // easily reset state using `$reset`
    clearUser () {
        this.$reset()
    }
}
})