const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.status(403).json({ message: "Missing token" });
  const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifiedUser) return res.status(403).json({ message: "Invalid token" });
  req.user = verifiedUser;
  next();
};

module.exports = auth;
