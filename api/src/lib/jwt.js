const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    firtsname: user.firtsname,
    lastname: user.lastname,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1y",
    algorithm: "HS512",
  });
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      id: decoded.id,
      name: decoded.name,
    };
  } catch (error) {
    return null;
  }
};
