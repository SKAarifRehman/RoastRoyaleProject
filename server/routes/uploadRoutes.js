// routes/upload.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { uploadImage } = require("../controllers/uploadController");

router.post("/image", upload.single("image"), uploadImage);
module.exports = router;