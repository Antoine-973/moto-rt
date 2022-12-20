const db = require('../models')
const User = db.user

const isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
}

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.get().isAdmin
            ? next()
            : res.status(403).send({
                  message: 'Require Admin Role!',
              })
    })
}

const authMiddleware = {
    isAuth: isAuth,
    isAdmin: isAdmin,
}
module.exports = authMiddleware
