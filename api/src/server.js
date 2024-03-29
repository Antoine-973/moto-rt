'use strict'

const express = require('express')
const RoomsRouter = require('./routes/rooms')
const UsersRouter = require('./routes/users')
const SecurityRouter = require('./routes/security')
const SseRouter = require('./routes/sse')
const verifyToken = require('./middlewares/verifyToken')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const logger = require('./lib/logger')
const initSocketIo = require('./socketio/initSocketIo')
const sse = require('./middlewares/sse')
require('dotenv').config()

app.use(express.json())

const whitelist = ['http://localhost']
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
app.use(sse())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', SseRouter)

app.use('/api', SecurityRouter)

app.use('/api', verifyToken, RoomsRouter)

app.use('/api', verifyToken, UsersRouter)

const port = process.env.PORT || 3000

const server = require('http').createServer(app)

initSocketIo(server)

server.listen(port, () => {
    logger.info(`Server started on port ${process.env.PORT}`)
})
