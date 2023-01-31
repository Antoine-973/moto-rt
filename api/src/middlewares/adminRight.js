module.exports = (req, res, next) => {
    if (!req.user) {
        return next(new Error('Authorization error: No user found'))
    }

    if (req.user.role !== 'ROLE_ADMIN') {
        return next(new Error('Authorization error: User is not an admin'))
    }

    next()
}
