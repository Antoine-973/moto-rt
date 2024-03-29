const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.DATABASE_URL, {
    host: process.env.DB_HOST,
    useNewUrlParser: true,
});

connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = connection;
