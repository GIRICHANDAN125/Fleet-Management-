// // src/routes/telemetryRoutes.js
// const express = require("express");
// const Telemetry = require("../models/Telemetry");

// const router = express.Router();

// // POST /api/telemetry
// // body: { vehicleId, lat, lng, speed?, timestamp? }
// router.post("/", async (req, res) => {
//   try {
//     const { vehicleId, lat, lng, speed, timestamp } = req.body;

//     if (!vehicleId || lat == null || lng == null) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     const doc = await Telemetry.create({
//       vehicleId,
//       lat,
//       lng,
//       speed: speed || 0,
//       timestamp: timestamp || new Date(),
//     });

//     // emit realtime update to frontend
//     const io = req.app.get("io");
//     if (io) {
//       io.emit("telemetry:update", {
//         vehicleId,
//         lat,
//         lng,
//         speed: speed || 0,
//         timestamp: doc.timestamp,
//       });
//     }

//     res.status(201).json(doc);
//   } catch (err) {
//     console.error("Telemetry create error", err);
//     res.status(500).json({ message: "Failed to save telemetry" });
//   }
// });

// // GET /api/telemetry/:vehicleId?from=&to=   (history / playback)
// router.get("/:vehicleId", async (req, res) => {
//   try {
//     const { vehicleId } = req.params;
//     const { from, to } = req.query;

//     const q = { vehicleId };
//     if (from || to) q.timestamp = {};
//     if (from) q.timestamp.$gte = new Date(from);
//     if (to) q.timestamp.$lte = new Date(to);

//     const points = await Telemetry.find(q)
//       .sort({ timestamp: 1 })
//       .limit(500);

//     res.json(points);
//   } catch (err) {
//     console.error("Telemetry history error", err);
//     res.status(500).json({ message: "Failed to fetch telemetry" });
//   }
// });

// module.exports = router;



// src/routes/telemetryRoutes.js
const express = require("express");
const {
  receiveTelemetry,
  getTelemetryHistory,
} = require("../controllers/telemetryController");

const router = express.Router();

// POST /api/telemetry
router.post("/", receiveTelemetry);

// GET /api/telemetry/:vehicleId?from=&to=   (optional history playback)
router.get("/:vehicleId", getTelemetryHistory);

module.exports = router;
