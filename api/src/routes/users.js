const { Router } = require("express");
const { User } = require("../models");
const { ValidationError } = require("sequelize");
const adminRight = require("../middlewares/adminRight");

const router = new Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ where: { role: "ROLE_USER" } });
    console.log("users", users)
    res.json(users);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/users", adminRight, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        quantity: "must be greather than 0",
        title: "must not be empty",
      });
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const result = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    });
    const [, lines] = result;
    if (!lines[0]) {
      res.sendStatus(404);
    } else {
      res.json(lines[0]);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error);
      res.status(422).json({
        quantity: "must be greather than 0",
        title: "must not be empty",
      });
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.delete("/users/:id", adminRight, async (req, res) => {
  try {
    const nbLine = await User.destroy({ where: { id: req.params.id } });
    if (!nbLine) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
