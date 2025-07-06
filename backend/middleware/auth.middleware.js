const { verifyToken } = require("../utils/auth");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Token is not valid" });
  }

  req.user = decoded;
  next();
};

module.exports = {
  authMiddleware,
};
