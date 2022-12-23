import axios from 'axios';
import { API_RESSOURCE_URI } from '../common/api-ressources/api.ressources.uri'

class AuthService {
    login(user) {
        return axios
            .post(API_RESSOURCE_URI.USER_LOGIN, {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();