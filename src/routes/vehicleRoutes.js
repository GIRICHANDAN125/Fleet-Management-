const express = require("express");
const router = express.Router();

const {
  getVehicles,
  addVehicle,
  markMaintenance,
  markDelay,
  updateVehicleStatus
} = require("../controllers/vehicleController");

/* =========================
   VEHICLE ROUTES
   ========================= */
router.get("/", getVehicles);
router.post("/", addVehicle);

router.patch("/:id/maintenance", markMaintenance);
router.patch("/:id/delay", markDelay);
router.patch("/:id/status", updateVehicleStatus);

module.exports = router;
