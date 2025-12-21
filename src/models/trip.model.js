const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    startLocation: {
      type: String,
      required: true,
    },

    endLocation: {
      type: String,
      required: true,
    },

    tripDate: {
      type: String,
      required: true,
    },

    tripTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Scheduled", "Started", "Moving", "Completed"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
