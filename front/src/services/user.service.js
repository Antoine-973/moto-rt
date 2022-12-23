import axios from 'axios';
import authHeader from './auth-header';
import { API_RESSOURCE_URI } from '../common/api-ressources/api.ressources.uri'


class UserService {
    register(user) {
        console.log(API_RESSOURCE_URI.USER_REGISTER)
        return axios.post(API_RESSOURCE_URI.USER_REGISTER, {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }

    getAllUsers() {
        return axios.get(API_RESSOURCE_URI.USER_BASE, { headers: authHeader() });
    }

    getUserById(id) {
        return axios.get(`${API_RESSOURCE_URI.USER_BASE}/${id}`, { headers: authHeader() });
    }

    updateUser(id, user) {
        return axios.put(`${API_RESSOURCE_URI.USER_BASE}/${id}`, user, { headers: authHeader() });
    }

    deleteUser(id) {
        return axios.delete(`${API_RESSOURCE_URI.USER_BASE}/${id}`, { headers: authHeader() });
    }
}

export default new UserService();