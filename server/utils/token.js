// utils/token.js
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const sendTokenResponse = (user, res, statusCode = 200) => {
  const token = generateToken(user._id);

  return res.status(statusCode).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || null,
    },
    token,
  });
};

module.exports = { generateToken, sendTokenResponse };
