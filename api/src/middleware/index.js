const authMiddleware = require('./authMiddleware')
const verifySignUp = require('./verifySignUp')

module.exports = {
    authMiddleware: authMiddleware,
    verifySignUp,
}
