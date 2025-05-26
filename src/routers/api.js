const express = require("express");
const router = express.Router();
const shipsRouter = require("./ships");

router.use("/ships", shipsRouter);

router.get("/health", (req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

router.get("/info", (req, res) => {
  res.json({
    app_name: "spaceship-js",
    version: "1.0.0",
    description: "Spaceship application ported from Python to Node.js",
  });
});

module.exports = router;
