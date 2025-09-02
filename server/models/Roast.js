// // models/Roast.js
// const mongoose = require("mongoose");

// const roastSchema = new mongoose.Schema({
//   player1: {
//     id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     roast: String,
//   },
//   player2: {
//     id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     roast: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   winner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     default: null,
//   },
// });

// module.exports = mongoose.model("Roast", roastSchema);


const mongoose = require("mongoose");

const roastSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userRoast: { type: String, required: true },
  aiRoast: { type: String, required: true },
  winner: { type: String, enum: ["User", "AI"], default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Roast", roastSchema);