const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Accepts token via httpOnly cookie OR `Authorization: Bearer <token>` header
// (Bearer support added so the API can be tested in Thunder Client / Postman.)
const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token = null;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded?.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
});

module.exports = isAuthenticated;
