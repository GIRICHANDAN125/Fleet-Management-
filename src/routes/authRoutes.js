const router = require("express").Router();
const { login, changePassword } = require("../controllers/authController");
const { auth } = require("../middlewares/authMiddleware");

router.post("/login", login);
router.put("/change-password", auth, changePassword);

module.exports = router;
