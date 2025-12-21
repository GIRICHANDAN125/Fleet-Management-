const Maintenance = require("../models/Maintenance");

exports.getMaintenance = async (req, res, next) => {
  try {
    const records = await Maintenance.find()
      .populate("vehicle")
      .sort({ serviceDate: -1 });

    res.json(records);
  } catch (err) {
    next(err);
  }
};

exports.createMaintenance = async (req, res, next) => {
  try {
    const record = await Maintenance.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

exports.updateMaintenance = async (req, res, next) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
};
