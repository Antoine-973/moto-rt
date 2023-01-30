import axios from "axios";
import environment from '../environments/environment'

const instance = axios.create({
    baseURL: environment.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;