"use strict";

const express = require("express");
// Boot express
const app = express();
const port = 8080;

// Application routing
app.use("/", (req, res, next) => {
    res.status(200).send({ data: "Hello moto-rc !" });
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
