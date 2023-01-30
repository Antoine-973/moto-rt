require('dotenv').config()
const mailer = require('nodemailer')

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
})

module.exports.confirmationEmail = async (email, token) => {
    const url = `${process.env.FRONT_URL}/confirm/${token}`
    try {
        transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Confirm your email address',
            html: `Please click on the following link to confirm your email address: ${url}`,
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports.resetPasswordEmail = async (email, id) => {
    const url = `${process.env.FRONT_URL}/reset-password/${id}`
    transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Reset your password',
        html: `Please click on the following link to reset your password: ${url}`,
    })
}
