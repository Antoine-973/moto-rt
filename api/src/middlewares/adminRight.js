module.exports = (socket, next) => {
    const { user } = socket.data;

    if (!user) {
        return next(new Error("Authorization error: No user found"));
    }

    if (user.role !== "ROLE_ADMIN") {
        return next(new Error("Authorization error: User is not an admin"));
    }

    next();
}