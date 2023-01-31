import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCustomersStore = defineStore('customers', () => {
    const customers = ref({})

    const updateCustomers = (newCustomers) => {
        customers.value = newCustomers.reduce((accumulator, customer) => {
            const existingCustomer = accumulator[customer.id]

            if (existingCustomer) {
                accumulator[customer.id] = { ...existingCustomer, ...customer }
            } else {
                accumulator[customer.id] = { messages: [], users: [], ...customer }
            }

            return accumulator
        }, customers.value)
    }

    return {
        customers,
        updateCustomers,
    }
})