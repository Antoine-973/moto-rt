import axios from 'axios'
import { CUSTOMERS_URI } from '@/common/api-ressources/api.ressources.uri'

class CustomersService {
    getCustomers() {
        return axios
            .get(CUSTOMERS_URI)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    getCustomer(id) {
        return axios
            .get(`${CUSTOMERS_URI}/${id}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    createCustomer(customer) {
        return axios.post(CUSTOMERS_URI, {
            name: customer.name,
            description: customer.description,
            limit: customer.limit,
        })
    }

    updateCustomer(customer) {
        return axios.put(`${CUSTOMERS_URI}/${customer.id}`, {
            name: customer.name,
            description: customer.description,
        })
    }

    deleteCustomer(id) {
        return axios.delete(`${CUSTOMERS_URI}/${id}`)
    }
}

export default new CustomersService()