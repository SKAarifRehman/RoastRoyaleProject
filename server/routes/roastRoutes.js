const express = require("express");
const router = express.Router();
const {
  createRoast,
  getRoasts,
  setWinner,
} = require("../controllers/roastController");

router.post("/create", createRoast);
router.get("/all", getRoasts);
// router.put("/set-winner", setWinner);

module.exports = router;
