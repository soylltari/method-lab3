const express = require("express");
const Ship = require("../models/ship");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ships = await Ship.find().sort({ createdAt: -1 });
    res.json(ships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const ship = new Ship({
      name: req.body.name,
      model: req.body.model,
      capacity: req.body.capacity,
    });

    const newShip = await ship.save();
    res.status(201).json(newShip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ship = await Ship.findByIdAndDelete(req.params.id);

    if (!ship) {
      return res.status(404).json({ error: "Ship not found" });
    }

    res.json({ message: "Ship deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
