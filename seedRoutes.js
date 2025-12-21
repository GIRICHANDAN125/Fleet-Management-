// seedRoutes.js
require('dotenv').config();
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');
const Route = require('./src/models/Route');

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB for seeding.');

    // Optional: clear existing routes (uncomment if you want a fresh seed)
    // await Route.deleteMany({});
    // console.log('Cleared existing routes.');

    const routes = [
      {
        sourceCity: 'Bengaluru',
        destinationCity: 'Hyderabad',
        routePolyline: [
          { lat: 12.9716, lng: 77.5946 },
          { lat: 13.2, lng: 77.8 },
          { lat: 17.385, lng: 78.4867 },
        ],
        totalDistanceKm: 570,
        totalDurationMin: 510,
      },
      {
        sourceCity: 'Hyderabad',
        destinationCity: 'Mumbai',
        routePolyline: [
          { lat: 17.385, lng: 78.4867 },
          { lat: 18.5, lng: 76.5 },
          { lat: 19.076, lng: 72.8777 },
        ],
        totalDistanceKm: 710,
        totalDurationMin: 650,
      },
      {
        sourceCity: 'Delhi',
        destinationCity: 'Punjab',
        routePolyline: [
          { lat: 28.7041, lng: 77.1025 },
          { lat: 29.0, lng: 75.5 },
          { lat: 31.1471, lng: 75.3412 },
        ],
        totalDistanceKm: 380,
        totalDurationMin: 330,
      },
      {
        sourceCity: 'Goa',
        destinationCity: 'Mumbai',
        routePolyline: [
          { lat: 15.2993, lng: 74.124 },
          { lat: 15.8, lng: 73.8 },
          { lat: 19.076, lng: 72.8777 },
        ],
        totalDistanceKm: 590,
        totalDurationMin: 540,
      },
      {
        sourceCity: 'Bengaluru',
        destinationCity: 'Goa',
        routePolyline: [
          { lat: 12.9716, lng: 77.5946 },
          { lat: 14.0, lng: 75.0 },
          { lat: 15.2993, lng: 74.124 },
        ],
        totalDistanceKm: 560,
        totalDurationMin: 500,
      },
    ];

    await Route.insertMany(routes);
    console.log('Routes seeded');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
