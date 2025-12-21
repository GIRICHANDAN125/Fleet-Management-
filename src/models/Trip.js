// // const mongoose = require("mongoose");

// // const pointSchema = new mongoose.Schema({
// //   address: { type: String },
// //   lat: { type: Number },
// //   lng: { type: Number },
// //   time: { type: Date },
// // });

// // const tripSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, default: "" },
// //     customer: { type: String, default: "" },

// //     pickup: pointSchema,
// //     dropoff: pointSchema,

// //     vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", default: null },
// //     driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", default: null },

// //     cargo: { type: String, default: "" },
// //     weightKg: { type: Number, default: 0 },

// //     status: {
// //       type: String,
// //       enum: ["scheduled", "assigned", "enroute", "completed", "cancelled"],
// //       default: "scheduled",
// //     },

// //     scheduledAt: { type: Date },
// //     startedAt: { type: Date },
// //     completedAt: { type: Date },

// //     notes: { type: String, default: "" },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Trip", tripSchema);

// const mongoose = require("mongoose");

// const TripSchema = new mongoose.Schema(
//   {
//     vehicle: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vehicle",
//       required: true,
//     },

//     startLocation: {
//       type: String,
//       required: true,
//     },

//     endLocation: {
//       type: String,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["Planned", "Ongoing", "Completed"],
//       default: "Planned",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Trip", TripSchema);

const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    startLocation: String,
    endLocation: String,

    tripDate: String,   // "2025-01-19"
    tripTime: String,   // "09:30"

    status: {
      type: String,
      enum: ["Upcoming", "Started", "Moving", "Maintenance", "Completed"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
