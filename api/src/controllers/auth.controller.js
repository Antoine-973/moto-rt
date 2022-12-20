const db = require('../models')
const { user: User } = db
const passport = require('passport')
const bcrypt = require('bcryptjs')

exports.getLoggedInUser = (req, res) => {
    const user = User.find((user) => {
        return user.id === req.session.passport.user
    })
    console.log([user, req.session])
    res.send({ user: user })
}

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
        .then((user) => {
            // user isAdmin false
            user.set('isAdmin', false)
        })
        .catch((err) => {
            res.status(500).send({ message: err.message })
        })
}

exports.signin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.status(400).send([user, 'Cannot log in', info])
        }

        req.login(user, (err) => {
            res.send('Logged in')
        })
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.logout()

    console.log('logged out')

    return res.send()
}
