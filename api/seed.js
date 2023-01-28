const { connection } = require('./src/models')

connection
    .sync({
        force: true,
        alter: true,
    })
    .then(() => {
        for (const model of Object.values(connection.models)) {
            if (model.seed) {
                console.log(`Seeding ${model.name}...`)
                model.seed()
                console.log(`Seeded ${model.name} completed`)
            }
        }
        console.log('Database seeded')
    })
    .finally(() => {
        connection.close()
    })
