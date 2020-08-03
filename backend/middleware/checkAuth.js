const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["auth-token"];
  if (!token) return res.status(401).json({ message: "Access Denied!" });
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};
