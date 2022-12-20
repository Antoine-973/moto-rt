'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

require('dotenv').config()

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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const cookieSession = require('cookie-session')
app.use(require('cookie-parser')())
app.use(
    require('express-session')({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new LocalStrategy(function (username, password, done) {
        User.findOne({ username: username })
            .populate('roles', '-__v')
            .exec((err, user) => {
                if (err) {
                    return done(err)
                }

                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' })
                }

                var passwordIsValid = bcrypt.compareSync(
                    password,
                    user.password
                )

                if (!passwordIsValid) {
                    return done(null, false, { message: 'Incorrect password.' })
                }

                var authorities = []

                for (let i = 0; i < user.roles.length; i++) {
                    authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
                }

                // user details
                const user_information = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                }

                return done(null, user_information)
            })
    })
)

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

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
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (username, password, done) => {
            let user = users.find((user) => {
                return user.email === username && user.password === password
            })

            if (user) {
                done(null, user)
            } else {
                done(null, false, { message: 'Incorrect username or password' })
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    let user = users.find((user) => {
        return user.id === id
    })

    done(null, user)
})

// set port, listen for requests
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`))
