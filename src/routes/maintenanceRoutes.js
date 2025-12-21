const express = require("express");
const router = express.Router();
const {
  getMaintenance,
  createMaintenance,
  updateMaintenance
} = require("../controllers/maintenanceController");
const { auth, authorize } = require("../middlewares/authMiddleware");

router.get("/", auth, getMaintenance);
router.post("/", auth, authorize("admin", "manager"), createMaintenance);
router.put("/:id", auth, authorize("admin", "manager"), updateMaintenance);

module.exports = router;
