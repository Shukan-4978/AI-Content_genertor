const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  handleRazorpayPayment,
  handleFreeSubscription,
  verifyPayment,
} = require("../controllers/handleRazorpayPayment");

const razorpayRouter = express.Router();

razorpayRouter.post("/checkout", isAuthenticated, handleRazorpayPayment);
razorpayRouter.post("/free-plan", isAuthenticated, handleFreeSubscription);
razorpayRouter.post("/verify", isAuthenticated, verifyPayment);

module.exports = razorpayRouter;
