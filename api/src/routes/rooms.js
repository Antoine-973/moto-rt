const { Router } = require("express");
const { Room } = require("../models");
const { ValidationError } = require("sequelize");
const router = new Router();

router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.findAll({ where: req.query });
    res.json(rooms);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/rooms", async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.json(room);
    }
    catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json(error.errors);
        }
        else {
            res.sendStatus(500);
            console.error(error);
        }
    }
});

router.get("/rooms/:id", async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (room) {
        res.json(room);
        } else {
        res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

router.put("/rooms/:id", async (req, res) => {
    try {
const result = await Room.update(req.body, {
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
        res.status(400).json(error.errors);
        } else {
        res.sendStatus(500);
        }
    }
});

router.delete("/rooms/:id", async (req, res) => {
    try {
        const result = await Room.destroy({
        where: { id: req.params.id },
        });
        if (result) {
        res.sendStatus(204);
        } else {
        res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;