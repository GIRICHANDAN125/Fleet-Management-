const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    sourceCity: {
      type: String,
      required: true,
      trim: true,
    },
    destinationCity: {
      type: String,
      required: true,
      trim: true,
    },
    routePolyline: [
      {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      }
    ],
    totalDistanceKm: {
      type: Number,
      required: true,
    },
    totalDurationMin: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", routeSchema);
