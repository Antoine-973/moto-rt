import axios from 'axios'
import authHeader from './auth-header'
import { API_RESSOURCE_URI } from '@/common/api-ressources/api.ressource.uri'

class UserService {
    getAllUsers() {
        return axios.get(API_RESSOURCE_URI.USER_BASE + 'users', {
            headers: authHeader(),
        })
    }
}

export default new UserService()
