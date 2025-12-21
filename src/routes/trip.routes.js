const express = require("express");
const router = express.Router();

const Trip = require("../models/Trip");
const tripController = require("../controllers/tripController");
const Alert = require("../models/alert.model");

router.patch("/:id/status", async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  if (req.body.status === "Moving") {
    await Alert.create({
      type: "Report",
      title: `Delay Alert: Trip #${trip._id}`,
      severity: "critical",
      relatedTrip: trip._id,
    });
  }

  res.json(trip);
});


/* --------------------------------------------------
   CREATE TRIP
   POST /api/trips
-------------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    const populatedTrip = await trip.populate("vehicle");
    res.status(201).json(populatedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* --------------------------------------------------
   LIST TRIPS
   GET /api/trips
-------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("vehicle")
      .sort({ createdAt: -1 });

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id/status", async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(trip);
});

/* --------------------------------------------------
   CHANGE STATUS
   POST /api/trips/:id/status
-------------------------------------------------- */
router.post("/:id/status", tripController.changeStatus);

module.exports = router;
