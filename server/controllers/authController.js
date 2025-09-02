const User = require("../models/User");
const bcrypt = require("bcryptjs");
const admin = require("../config/firebase");
const { sendTokenResponse } = require("../utils/token");

/**
 * @desc Register user via email/password
 */
// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashed });

//     sendTokenResponse(res, user, { id: user._id }, 201);
//   } catch (err) {
//     res.status(500).json({ msg: "Registration failed", error: err.message });
//   }
// };


exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({
      msg: "Registration successful. Please log in.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};


/**
 * @desc Login user via email/password
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    sendTokenResponse(user, res, 201);
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};

/**
 * @desc Login/Register user via Google OAuth (Firebase)
 */
exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { uid, name, email, picture } = decoded;

    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({
        uid,
        name: name || "Anonymous",
        email: email || "",
        avatar: picture || "",
      });
    }

    sendTokenResponse(user, res, 201);
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid Google token",
      error: err.message,
    });
  }
};
