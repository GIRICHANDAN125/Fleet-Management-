const axios = require("axios");

const API = process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/api/telemetry` : "http://localhost:5001/api/telemetry";

// Use real vehicleId from DB
const VEHICLE_ID = "PUT_YOUR_VEHICLE_ID_HERE";

// Bangalore sample route
let lat = 12.9716;
let lng = 77.5946;

setInterval(async () => {
  lat += Math.random() * 0.001;
  lng += Math.random() * 0.001;
  const speed = Math.floor(Math.random() * 60) + 20;

  try {
    await axios.post(API, {
      vehicleId: VEHICLE_ID,
      lat,
      lng,
      speed,
    });

    console.log("GPS sent", lat, lng);
  } catch (err) {
    console.error("GPS error");
  }
}, 4000);
