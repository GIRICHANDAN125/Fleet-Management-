// src/controllers/telemetryController.js
const Telemetry = require("../models/Telemetry");

exports.receiveTelemetry = async (req, res) => {
  try {
    const { vehicleId, lat, lng, speed, timestamp } = req.body;

    if (!vehicleId || lat == null || lng == null) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const doc = await Telemetry.create({
      vehicleId,
      lat,
      lng,
      speed: speed || 0,
      timestamp: timestamp || new Date(),
    });

    // Emit realtime update through Socket.IO
    const io = req.app.get("io");
    if (io) {
      io.emit("telemetry:update", {
        vehicleId,
        lat,
        lng,
        speed: speed || 0,
        ts: doc.timestamp, // 👈 match frontend field name
      });
    }

    return res.status(201).json(doc);
  } catch (err) {
    console.error("Telemetry create error", err);
    return res.status(500).json({ message: "Failed to save telemetry" });
  }
};

exports.getTelemetryHistory = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { from, to } = req.query;

    const q = { vehicleId };
    if (from || to) q.timestamp = {};
    if (from) q.timestamp.$gte = new Date(from);
    if (to) q.timestamp.$lte = new Date(to);

    const points = await Telemetry.find(q)
      .sort({ timestamp: 1 })
      .limit(500);

    return res.json(points);
  } catch (err) {
    console.error("Telemetry history error", err);
    return res.status(500).json({ message: "Failed to fetch telemetry" });
  }
};
