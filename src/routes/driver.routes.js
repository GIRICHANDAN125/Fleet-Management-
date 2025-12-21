const express = require("express");
const router = express.Router();
const {
  getDrivers,
  createDriver,
  deleteDriver,
} = require("../controllers/driver.controller");

router.get("/", getDrivers);
router.post("/", createDriver);
router.delete("/:id", deleteDriver);

module.exports = router;
