const express = require("express");
const Alert = require("../models/alert.model");

const router = express.Router();

// Get all active alerts
router.get("/", async (req, res) => {
  const alerts = await Alert.find({ resolved: false }).sort({ createdAt: -1 });
  res.json(alerts);
});

// Create alert
router.post("/", async (req, res) => {
  const alert = await Alert.create(req.body);
  res.status(201).json(alert);
});

// Resolve alert
router.patch("/:id/resolve", async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { resolved: true },
    { new: true }
  );
  res.json(alert);
});
router.patch("/:id/resolve", async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { resolved: true },
    { new: true }
  );
  res.json(alert);
});
router.post("/", async (req, res) => {
  const alert = await Alert.create(req.body);
  res.status(201).json(alert);
});



module.exports = router;
