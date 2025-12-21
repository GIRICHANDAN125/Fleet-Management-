require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (exists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await Admin.create({
      name: "Fleet Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

seedAdmin();
