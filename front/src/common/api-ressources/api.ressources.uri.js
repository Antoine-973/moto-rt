import environment from '../../environments/environment'

const BASE_URI = `${environment.API_BASE_URL}`
const USER_BASE = `${environment.API_BASE_URL}/users`

export const API_RESSOURCE_URI = {
    USER_BASE: USER_BASE,
    USER_REGISTER: `${BASE_URI}/register`,
    USER_LOGIN: `${BASE_URI}/login`,
    USER_LOGOUT: `${BASE_URI}/logout`,
    USER_CONFIRM: `${BASE_URI}/confirm`,
    USER_ME: `${BASE_URI}/me`,
}
