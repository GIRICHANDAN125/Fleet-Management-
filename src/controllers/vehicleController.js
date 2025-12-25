const Vehicle = require("../models/Vehicle");
const Alert = require("../models/alert.model");

/* =========================
   GET ALL VEHICLES
   ========================= */
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate("driver", "name phone")
      .sort({ createdAt: -1 });

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   ADD VEHICLE
   ========================= */
exports.addVehicle = async (req, res) => {
  try {
    const { vehicleNumber, type, status, driver } = req.body;

    const vehicle = await Vehicle.create({
      vehicleNumber,
      type,
      status,
      driver: driver || null,
    });

    await vehicle.populate("driver", "name phone");
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   🔧 MAINTENANCE UPDATE
   ========================= */
exports.markMaintenance = async (req, res) => {
  try {
    const { issue } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.status = "Maintenance";
    await vehicle.save();

    await Alert.create({
      type: "Maintenance",
      title: `${vehicle.vehicleNumber} – ${issue}`,
      severity: "warning",
      resolved: false,
    });

    res.json({ message: "Vehicle marked as maintenance" });
  } catch (err) {
    res.status(500).json({ message: "Maintenance update failed" });
  }
};

/* =========================
   🚨 DELAY UPDATE (FIXED)
   ========================= */
exports.markDelay = async (req, res) => {
  try {
    const { delayTime } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.status = "Delayed";
    await vehicle.save();

    await Alert.create({
      type: "Report",
      title: `Delay Alert: ${vehicle.vehicleNumber} – ${delayTime}`,
      severity: "critical",
      resolved: false,
    });

    res.json({ message: "Vehicle delay updated" });
  } catch (err) {
    res.status(500).json({ message: "Delay update failed" });
  }
};

/* =========================
   GENERIC STATUS UPDATE
   ========================= */
exports.updateVehicleStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.status = status;
    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Status update failed" });
  }
};
