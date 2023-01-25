require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwtExpiration = process.env.JWT_EXPIRATION;

exports.createToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: jwtExpiration,
    algorithm: "HS512",
  });
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      id: decoded.id,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
};
