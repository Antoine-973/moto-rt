import axios from 'axios';
import { API_RESSOURCE_URI } from '../common/api-ressources/api.ressources.uri'
import TokenService from './TokenService'

class AuthService {
    login(user) {
        return axios
            .post(API_RESSOURCE_URI.USER_LOGIN, {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response)
                if (response.data.token) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    verifyAccount(token) {
        return axios.get(`${API_RESSOURCE_URI.USER_CONFIRM}/${token}`).then(response => {
            return response.data;
        })
    }

    logout() {
        TokenService.removeUser();
    }
}

export default new AuthService();