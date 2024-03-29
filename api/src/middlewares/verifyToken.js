const { decodeToken } = require('../lib/jwt')

module.exports = (req, res, next) => {
    const header = req.headers['authorization']
    if (!header) {
        return res.sendStatus(401)
    }
    const [type, token] = header.split(/\s+/)
    if (type !== 'Bearer') {
        return res.sendStatus(401)
    }
    const user = decodeToken(token)
    if (!user) {
        return res.sendStatus(401, { message: 'Invalid token' })
    }
    req.user = user
    next()
}
