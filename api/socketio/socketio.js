const { Server } = require('socket.io')
const verifyToken = require('./middlewares/verifyToken')
const adminRight = require('./middlewares/adminRight')

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        }
    });

    io.use(verifyToken);

    io.use(adminRight);
}