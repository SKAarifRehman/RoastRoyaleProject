// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    // unique: true, // UID from Firebase if available
  },
  googleId: {
    type: String,
    // unique: true,
    sparse: true, // allows null values to be unique
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String, // only for local users
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
