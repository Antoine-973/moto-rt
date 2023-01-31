const { Router } = require('express')

const router = new Router()

router.get('/sse', (req, res) => {
    res.initSSE()
})

const adminRight = require('../middlewares/adminRight')
const verifyToken = require('../middlewares/verifyToken')

router.post('/notification', verifyToken, adminRight, (req, res) => {
    console.log('req.body', req.body)
    const { message } = req.body

    if (!message) {
        return res.status(400).send('Message is required')
    }

    res.sendEvent('notification', { message })
    res.sendStatus(204)
})

module.exports = router
