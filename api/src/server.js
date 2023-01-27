'use strict'

const express = require("express");
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const verifyToken = require("./middlewares/verifyToken");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const logger = require("./lib/logger");
require('dotenv').config()

app.use(express.json());

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use("/api", SecurityRouter);

// app.use("/api", verifyToken, UserRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info(`Server started on port ${process.env.PORT}`);
});
