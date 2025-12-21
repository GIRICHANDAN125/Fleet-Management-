// backend/src/simulators/telemetrySimulator.js
const axios = require("axios");

// Put one of your real vehicle _id values from MongoDB here
// (you can copy from Vehicles collection in MongoDB Compass)
const VEHICLE_ID = "6933289589bc9e5915eb6c09";

const API_URL = process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/api/telemetry` : "http://localhost:5001/api/telemetry";

// simple route around Bangalore as example
const path = [
  { lat: 12.9716, lng: 77.5946 },
  { lat: 12.9730, lng: 77.6000 },
  { lat: 12.9750, lng: 77.6050 },
  { lat: 12.9780, lng: 77.6100 },
  { lat: 12.9800, lng: 77.6150 },
];

let index = 0;

async function sendPing() {
  const point = path[index];
  index = (index + 1) % path.length;

  try {
    await axios.post(API_URL, {
      vehicleId: VEHICLE_ID,
      lat: point.lat,
      lng: point.lng,
      speed: 40 + Math.floor(Math.random() * 20),
    });
    console.log("sent telemetry:", point);
  } catch (err) {
    console.error("telemetry send error:", err.message);
  }
}

// send every 5 seconds
setInterval(sendPing, 5000);
console.log("Telemetry simulator started...");
