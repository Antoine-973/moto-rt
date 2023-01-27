const { Router } = require('express')
const { createToken } = require('../lib/jwt')
const verifyToken = require('../middlewares/verifyToken')
const { User, AccountValidationRequest } = require('../models')
const { comparePassword } = require('../lib/bcrypt')
const { body, validationResult } = require('express-validator')
const { confirmationEmail } = require('../mailer/mailer')
require('dotenv').config()

const router = new Router()

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            return res.status(401).json({
                message:
                    "Aucun utilisateur n'est associé à cette adresse email",
            })
        }
        if (comparePassword(req.body.password, user.password) === false) {
            return res.status(401).json({
                message: 'Mot de passe incorrect',
            })
        }
        if (!user.isVerified) {
            return res.status(401).json({
                message: "Votre compte n'est pas vérifié",
            })
        }
        const token = createToken(user)

        return res.status(200).send({
            token: token,
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post(
    '/register',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        try {
            const user = await User.findOne({
                where: { email: req.body.email },
                paranoid: true,
            })
            if (user)
                return res.status(400).json({ message: 'User already exists.' })
            else {
                const tokenInUrl = require('crypto')
                    .randomBytes(32)
                    .toString('hex')

                try {
                    await confirmationEmail(req.body.email, tokenInUrl)
                } catch (error) {
                    res.sendStatus(500)
                }

                const user = await User.create(req.body)
                const token = new AccountValidationRequest({
                    userId: user.id,
                    token: tokenInUrl,
                })
                await token.save()

                res.status(201).json(user)
            }
        } catch (error) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            } else {
                res.sendStatus(500)
                console.error(error)
            }
        }
    }
)

router.get('/confirm/:token', async (req, res) => {
    try {
        const token = await AccountValidationRequest.findOne({
            where: { token: req.params.token },
            paranoid: true,
        })

        if (!token) {
            return res.status(400).json({ message: 'Invalid token.' })
        } else if (token.createdAt < Date.now() - 60 * 60 * 1000) {
            return res.status(400).json({ message: 'Token expired.' })
        } else {
            const user = await User.findByPk(token.userId)
            await user.update({ isVerified: true })
            await token.destroy()
            res.json({ message: 'Account validated.' })
        }
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
})

router.get('/me', verifyToken, async (req, res) => {
    try {
        const safeUser = await User.scope('withoutPassword').findOne({
            where: { id: req.user.id },
        })

        if (!safeUser) {
            res.status(403).json({
                message:
                    'User not found. Please make a new signin request or contact support',
            })
        }

        res.status(200).json(safeUser)
    } catch (err) {
        return res.status(500).send({ message: err })
    }
})

module.exports = router
