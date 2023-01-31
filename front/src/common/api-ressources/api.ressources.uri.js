import environment from '../../environments/environment'

const BASE_URI = `${environment.API_BASE_URL}`
export const ROOMS_URI = `${BASE_URI}/rooms`
export const CUSTOMERS_URI = `${BASE_URI}/users`
export const NOTIFICATION_URI = `${BASE_URI}/notification`

export const API_RESSOURCE_URI = {
    USER_REGISTER: `${BASE_URI}/register`,
    USER_LOGIN: `${BASE_URI}/login`,
    USER_LOGOUT: `${BASE_URI}/logout`,
    USER_CONFIRM: `${BASE_URI}/confirm`,
    USER_ME: `${BASE_URI}/me`,
}
