import environment from '../../environments/environment.js'

const USER_BASE = `${environment.API_BASE_URL}/user`
const AUTH_BASE = `${environment.API_BASE_URL}/auth`

export const API_RESSOURCE_URI = {
    USER_BASE: USER_BASE,
    AUTH_BASE: AUTH_BASE,
}
