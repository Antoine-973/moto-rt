class TokenService {
    getToken() {
        return JSON.parse(localStorage.getItem('token'))
    }

    setToken(token) {
        localStorage.setItem('token', token)
    }

    removeToken() {
        localStorage.removeItem('token')
    }
}

export default new TokenService()
