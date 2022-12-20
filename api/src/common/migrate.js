const { db, sequelize } = require('../models/postgres')

sequelize
    .sync({
        force: true,
        alter: true,
    })
    .then(() => {
        console.log('Database synced')
        sequelize.close()
    })
