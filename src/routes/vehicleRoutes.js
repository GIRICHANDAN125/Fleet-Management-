const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehicleController");

router.get("/", controller.getVehicles);
router.post("/", controller.addVehicle);

router.patch("/:id/maintenance", controller.markMaintenance);
router.patch("/:id/delay", controller.markDelay);

module.exports = router;
