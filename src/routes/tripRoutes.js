// src/routes/tripRoutes.js
const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripController");
// if you have auth middleware, you can import and wrap.
// const { protect } = require("../middlewares/authMiddleware");

router.get("/", /*protect,*/ tripController.list);
router.post("/", /*protect,*/ tripController.create);
router.get("/:id", /*protect,*/ tripController.getOne);
router.put("/:id", /*protect,*/ tripController.update);
router.post("/:id/assign", /*protect,*/ tripController.assign);
router.post("/:id/status", /*protect,*/ tripController.changeStatus);

module.exports = router;
