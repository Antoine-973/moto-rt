import axios from 'axios'
import { API_RESSOURCE_URI } from '@/common/api-ressources/api.ressources.uri'
import TokenService from './token.service'

class AuthService {
    me() {
        return axios
            .get(API_RESSOURCE_URI.USER_ME)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    login(user) {
        return axios
            .post(API_RESSOURCE_URI.USER_LOGIN, {
                email: user.email,
                password: user.password,
            })
            .then((response) => {
                if (response.data.token) {
                    TokenService.setToken(response.data.token)
                }

                return response.data
            })
    }

    register(user) {
        return axios.post(API_RESSOURCE_URI.USER_REGISTER, {
            username: user.username,
            email: user.email,
            password: user.password,
        })
    }

    verifyAccount(token) {
        return axios
            .get(`${API_RESSOURCE_URI.USER_CONFIRM}/${token}`)
            .then((response) => {
                return response.data
            })
    }
}

export default new AuthService()
