// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fleetdb';
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (err) {
    console.error("Mongo error", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
