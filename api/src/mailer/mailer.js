require('dotenv').config();
const mailer = require('nodemailer');
const AccountValidationRequest = require('../models/AccountValidationRequest');

console.log(process.env.EMAIL_ADDRESS, process.env.EMAIL_PASSWORD);
const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports.confirmationEmail = async (email, id) => {
    // generate a token using the user id and its email
    const token = new AccountValidationRequest({
        userId: id,
        token: require('crypto').randomBytes(32).toString('hex')
    });
    await token.save();
    const url = `${process.env.FRONT_URL}/confirm/${token.token}`;
    console.log(url);
    transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Confirm your email address',
        html: `Please click on the following link to confirm your email address: ${url}`
    });
}

module.exports.resetPasswordEmail = async (email, id) => {
    const url = `${process.env.FRONT_URL}/reset-password/${id}`;
    transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Reset your password',
        html: `Please click on the following link to reset your password: ${url}`
    });
}