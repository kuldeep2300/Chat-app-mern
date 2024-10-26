const User = require("../models/user");
const { validateToken } = require("../services/generateToken");

const protectRoute = (cookieName) => {
  return async (req, res, next) => {
    // console.log("Inside protectRoute middleware");

    const token = req.cookies[cookieName];
    if(!token) return next();

    try {
      const payload = validateToken(token);
      req.user = payload;

    } catch (error) {
      console.log("Error in protectRoute middleware:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
    return next();
  };
};
module.exports = protectRoute;
