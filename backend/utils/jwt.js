dotenv.config();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { JWT_SECRET } = process.env;

exports = signinJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

exports = verifyJWT = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(403).jso;
    throw new CustomError(error.message, 401);
  }
};
