const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { getAllUsers, toggleAdminStatus, deleteUser } = require("../controllers/adminController");

const adminRouter = express.Router();

// Admin authorization guard middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Admin role required." });
};

adminRouter.get("/users", isAuthenticated, isAdmin, getAllUsers);
adminRouter.post("/toggle-admin", isAuthenticated, isAdmin, toggleAdminStatus);
adminRouter.delete("/user/:id", isAuthenticated, isAdmin, deleteUser);

module.exports = adminRouter;
