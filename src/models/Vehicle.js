const mongoose = require("mongoose");

/* =========================
   Helper functions
   ========================= */
function normalizeType(v) {
  if (!v) return v;
  v = v.toString().toLowerCase();
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function normalizeStatus(v) {
  if (!v) return v;
  v = v.toString().toLowerCase();

  if (v === "on trip" || v === "ontrip") return "On Trip";
  if (v === "maintenance") return "Maintenance";
  if (v === "idle") return "Idle";
  if (v === "delayed" || v === "delay") return "Delayed";

  return v;
}

/* =========================
   Vehicle Schema
   ========================= */
const VehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      match: /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/,
    },

    type: {
      type: String,
      required: true,
      enum: ["Bus", "Truck", "Car", "Van"],
      set: normalizeType,
    },

    status: {
      type: String,
      enum: ["Idle", "On Trip", "Maintenance", "Delayed"], // 🔥 FIX
      default: "Idle",
      set: normalizeStatus,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
