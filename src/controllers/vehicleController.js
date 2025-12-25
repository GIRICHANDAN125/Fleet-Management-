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
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   MAINTENANCE
   ========================= */
exports.markMaintenance = async (req, res) => {
  console.log("✅ Maintenance API HIT", req.params.id, req.body);

  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status: "Maintenance" },
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await Alert.create({
      type: "Maintenance",
      title: `${vehicle.vehicleNumber} - ${req.body.issue}`,
      severity: "warning"
    });

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   DELAY
   ========================= */
exports.markDelay = async (req, res) => {
  console.log("✅ Delay API HIT", req.params.id, req.body);

  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status: "Delayed" },
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await Alert.create({
      type: "Delay",
      title: `${vehicle.vehicleNumber} - ${req.body.delayTime}`,
      severity: "critical"
    });

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GENERIC STATUS
   ========================= */
exports.updateVehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
