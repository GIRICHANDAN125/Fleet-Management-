// // src/models/Driver.js
// const mongoose = require("mongoose");

// const driverSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     phone: {
//       type: String, // keep as string, easier for leading 0 etc.
//       required: true,
//       trim: true,
//     },
//     licenseNumber: {
//       type: String,
//       required: true,
//       trim: true,
//       unique: true,
//     },
//     licenseExpiry: {
//       type: Date,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Driver", driverSchema);
const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    licenseExpiry: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
