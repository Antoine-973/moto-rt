import { defineStore } from 'pinia';
import CustomersService from '@/services/customers.service'

export const useCustomersStore = defineStore({
    id: 'customers',
    state: () => ({
        customers: [],
        currentCustomer: null,
    }
    ),
    actions: {
        async getCustomers() {
            return CustomersService.getCustomers().then(
                (response) => {
                    this.customers = response
                    return Promise.resolve(response)
                },
                (error) => {
                    return Promise.reject(error)
                }
            )
        },
        async getCustomer(id) {
            return CustomersService.getCustomer(id).then(
                (response) => {
                    this.currentCustomer = response.data
                    return Promise.resolve(response.data)
                },
                (error) => {
                    return Promise.reject(error)
                }
            )
        },
        async createCustomer(customer) {
            return CustomersService.createCustomer(customer).then(
                (response) => {
                    this.customers.push(response.data)
                    return Promise.resolve(response.data)
                }
            )
        },
        async updateCustomer(customer) {
            return CustomersService.updateCustomer(customer).then(
                (response) => {
                    const index = this.customers.findIndex((r) => r.id === customer.id)
                    this.customers[index] = response.data
                    return Promise.resolve(response.data)
                }
            )
        },
        async deleteCustomer(id) {
            return CustomersService.deleteCustomer(id).then(
                (response) => {
                    const index = this.customers.findIndex((r) => r.id === id)
                    this.customers.splice(index, 1)
                    return Promise.resolve(response.data)
                }
            )
        }
    }
});