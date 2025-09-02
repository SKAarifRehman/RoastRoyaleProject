// controllers/uploadController.js
const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.status(200).json({ filename: req.file.filename });
};

module.exports = { uploadImage };