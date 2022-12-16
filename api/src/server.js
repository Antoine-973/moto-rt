'use strict'

const express = require('express')
// Boot express

const cors = require('cors')

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

const app = express()
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const port = 8080
const db = require('../models')
const User = db.user

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db')
    initial()
})

function initial() {
    User.create({
        email: 'admin@localhost',
        password: 'admin',
        firstname: 'admin',
        lastname: 'admin',
        age: 36,
        isVerified: true,
        confirmationCode: 'admin',
        isAdmin: true,
        isReported: false,
    })
    User.create({
        email: 'user@localhost',
        password: 'user',
        firstname: 'user',
        lastname: 'user',
        age: 25,
        isVerified: true,
        confirmationCode: 'user',
        isAdmin: false,
        isReported: false,
    })
}

const LocalStrategy = require('passport-local').Strategy

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cookieSession({
        name: 'mysession',
        keys: ['vueauthrandomkey'],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
)

app.use(passport.initialize())
app.use(passport.session())

// Application routing
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)
app.use('/api', (req, res, next) => {
    res.status(200).send({ data: 'Hello moto-rc !' })
})

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`))
