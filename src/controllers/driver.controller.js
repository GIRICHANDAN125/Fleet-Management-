const Driver = require("../models/Driver");

exports.getDrivers = async (req, res) => {
  const drivers = await Driver.find().sort({ createdAt: -1 });
  res.json(drivers);
};

exports.createDriver = async (req, res) => {
  const driver = await Driver.create(req.body);
  res.status(201).json(driver);
};

exports.deleteDriver = async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.json({ message: "Driver deleted" });
};
