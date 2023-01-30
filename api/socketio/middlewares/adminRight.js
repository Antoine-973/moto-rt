const { User } = require('../models')

module.exports = (req, res, next) => {
    const userId = req.user.id

    if (User.findByPk(userId).role !== 'ROLE_ADMIN') {
        return res.sendStatus(401, { message: 'You are not allowed to do this' })
    }
    next()
}
