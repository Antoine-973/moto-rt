const { connection } = require("./src/models");

connection
  .sync({
    alter: true,
  })
  .then(() => {
    console.log("Database synced");
    connection.close();
  });
