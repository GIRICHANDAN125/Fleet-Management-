const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true
    },
    serviceType: { type: String, required: true },
    serviceDate: { type: Date, required: true },
    nextServiceDate: { type: Date },
    cost: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
