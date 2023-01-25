const { Router } = require('express')
const { createToken } = require('../lib/jwt')
const verifyToken = require('../middlewares/verifyToken')
const { User, AccountValidationRequest } = require('../models')
const { comparePassword } = require('../lib/bcrypt')
const {body, validationResult} = require('express-validator');
const { confirmationEmail } = require('../mailer/mailer')
const RefreshToken = require('../models/RefreshToken')
require('dotenv').config();

const router = new Router()

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            return res.status(401).json({
                email: 'Email not found',
            })
        }
        if (comparePassword(req.body.password, user.password) === false) {
            return res.status(401).json({
                password: 'Password is incorrect',
            })
        }
        const token = createToken(user);
        console.log(token)

        console.log(process.env.JWT_REFRESH_EXPIRATION, process.env.JWT_EXPIRATION)
        const refreshToken = await RefreshToken.createToken(user);
        console.log(refreshToken)

        return res.status(200).send({
            token: token,
        });
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
})

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        try {
            const user = await User.findOne({
                where: {email: req.body.email},
                paranoid: true}
            ) ;
            if(user)
                return res.status(400).json({message: "User already exists."});
            else {
                const user = await User.create(req.body);

                confirmationEmail(user.email, user.id);

                res.status(201).json(user);
            }
        } catch (error) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            } else {
                res.sendStatus(500)
                console.error(error)
            }
        }
})

router.get('/confirm/:token', async (req, res) => {
    try {
        const token = await AccountValidationRequest.findOne({
            where: {token: req.params.token},
            paranoid: true
        });

        if(!token){
            return res.status(400).json({message: "Invalid token."});
        }
        else if (token.createdAt < Date.now() - 60 * 60 * 1000) {
            return res.status(400).json({message: "Token expired."});
        }
        else {
            const user = await User.findByPk(token.userId);
            await user.update({isVerified: true});
            await token.destroy();
            res.json({message: "Account validated."});
        }
    }
    catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
})

router.post(("/refreshtoken"), async (req, res) => {
    const {refreshToken : requestToken} = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        const refreshToken = await RefreshToken.findOne({where: {token: requestToken}});

        console.log(refreshToken)

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            await refreshToken.destroy();

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = createToken(user);

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
});

router.get(("/me"), [verifyToken], async (req, res) => {
    const user = await User.findByPk(req.user.id);
    res.json(user);
});

module.exports = router
