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
    console.error(err);
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

    // populate driver before sending response
    await vehicle.populate("driver", "name phone");

    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
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

    // Update vehicle status
    vehicle.status = "Maintenance";
    await vehicle.save();

    // Create maintenance alert
    await Alert.create({
      type: "Maintenance",
      title: `${vehicle.type} ${vehicle.vehicleNumber} – ${issue}`,
      severity: "warning",
      resolved: false,
    });

    res.json({ message: "Maintenance alert created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Maintenance update failed" });
  }
};

/* =========================
   🚨 DELAY UPDATE
   ========================= */
exports.markDelay = async (req, res) => {
  try {
    const { delayTime } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Create delay alert
    await Alert.create({
      type: "Report",
      title: `Delay Alert: ${vehicle.vehicleNumber} – ${delayTime}`,
      severity: "critical",
      resolved: false,
    });

    res.json({ message: "Delay alert created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delay update failed" });
  }
};
