const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  registerUser,
  loginUser,
  googleLogin,
} = require("../controllers/authController");

// Traditional Auth
router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// Google OAuth (Firebase token-based)
router.post("/google", googleLogin);

module.exports = router;
