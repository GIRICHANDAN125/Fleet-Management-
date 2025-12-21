// src/controllers/tripController.js
const Trip = require("../models/Trip");
const notify = require("../utils/notify");

/* --------------------------------------------------
   GET /api/trips
-------------------------------------------------- */
exports.list = async (req, res) => {
  try {
    const q = {};

    if (req.query.status) q.status = req.query.status;
    if (req.query.driverId) q.driverId = req.query.driverId;
    if (req.query.vehicleId) q.vehicle = req.query.vehicleId;

    const trips = await Trip.find(q)
      .populate("vehicle")           // ✅ type + number
      .sort({ createdAt: -1 })
      .limit(200);

    res.json(trips);
  } catch (err) {
    console.error("Trip list error", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/trips/:id/status
exports.changeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["Upcoming", "Started", "Moving", "Maintenance", "Completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const trip = await Trip.findById(req.params.id).populate("vehicle");
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.status = status;

    if (status === "Started") trip.startedAt = new Date();
    if (status === "Completed") trip.completedAt = new Date();

    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error("Status update error", err);
    res.status(400).json({ message: "Status update failed" });
  }
};

/* --------------------------------------------------
   POST /api/trips
   Auto status based on time (2 hour rule)
-------------------------------------------------- */
exports.create = async (req, res) => {
  try {
    const {
      vehicle,
      startLocation,
      endLocation,
      tripDate,
      tripTime,
    } = req.body;

    if (!vehicle || !startLocation || !endLocation || !tripDate || !tripTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ⏰ AUTO STATUS LOGIC
    const tripStart = new Date(`${tripDate}T${tripTime}`);
    const now = new Date();
    const diffHours = (tripStart - now) / (1000 * 60 * 60);

    let status = "Scheduled";        // default
    if (diffHours > 2) status = "Upcoming";
    else if (diffHours <= 2 && diffHours > 0) status = "Started";
    else if (diffHours <= 0) status = "Moving";

    const trip = await Trip.create({
      vehicle,
      startLocation,
      endLocation,
      tripDate,
      tripTime,
      status,
    });

    const populatedTrip = await trip.populate("vehicle");

    const io = req.app.get("io");
    if (io) io.emit("trip:created", populatedTrip);

    res.status(201).json(populatedTrip);
  } catch (err) {
    console.error("Create trip error", err);
    res.status(400).json({ message: "Failed to create trip" });
  }
};

/* --------------------------------------------------
   GET /api/trips/:id
-------------------------------------------------- */
exports.getOne = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate("vehicle");
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (err) {
    console.error("Get trip error", err);
    res.status(400).json({ message: "Invalid id" });
  }
};

/* --------------------------------------------------
   PUT /api/trips/:id
-------------------------------------------------- */
exports.update = async (req, res) => {
  try {
    const updated = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("vehicle");

    if (!updated) return res.status(404).json({ message: "Trip not found" });

    const io = req.app.get("io");
    if (io) io.emit("trip:updated", updated);

    res.json(updated);
  } catch (err) {
    console.error("Update trip error", err);
    res.status(400).json({ message: "Failed to update trip" });
  }
};

/* --------------------------------------------------
   POST /api/trips/:id/status
-------------------------------------------------- */
exports.changeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["Upcoming", "Started", "Moving", "Completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const trip = await Trip.findById(req.params.id).populate("vehicle");
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.status = status;

    if (status === "Started") trip.startedAt = new Date();
    if (status === "Completed") trip.completedAt = new Date();

    await trip.save();

    const io = req.app.get("io");
    if (io) io.emit("trip:statusChanged", { tripId: trip._id, status, trip });

    notify.sendStatusChangeNotification({ trip, status });

    res.json(trip);
  } catch (err) {
    console.error("Change status error", err);
    res.status(400).json({ message: "Failed to update status" });
  }
};
