const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const {
  calculateNextBillingDate,
} = require("../utils/calculateNextBillingDate");
const {
  shouldRenewSubcriptionPlan,
} = require("../utils/shouldRenewsubcriptionPlan");
const Payment = require("../models/Payment");
const User = require("../models/User");

// Initialize Razorpay conditionally
let razorpay;
const isKeysConfigured = !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

if (isKeysConfigured) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// ----- Create Razorpay Order -----
const handleRazorpayPayment = asyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;
  const user = req?.user;
  try {
    const amountInPaise = Math.round(Number(amount) * 100);

    if (!isKeysConfigured) {
      // Return mock order for local simulation
      return res.json({
        isMock: true,
        id: "order_mock_" + Math.random().toString(36).substring(7),
        currency: "INR",
        amount: amountInPaise,
        key: "rzp_test_mockKeyId1234",
      });
    }

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        userId: user?._id?.toString(),
        userEmail: user?.email,
        subscriptionPlan,
      },
    };
    const order = await razorpay.orders.create(options);
    res.json({
      isMock: false,
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log("Razorpay Order Creation Error:", error);
    res.status(500).json({ error: error?.message || "Razorpay order creation failed" });
  }
});

// ----- Verify Razorpay payment -----
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, subscriptionPlan } = req.body;
  const user = req?.user;
  try {
    const userId = user?._id;
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Verify signature only if keys are configured and it's not a mock order
    const isMockOrder = razorpay_order_id?.startsWith("order_mock_");
    if (isKeysConfigured && !isMockOrder) {
      const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generated_signature = hmac.digest("hex");

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ status: false, message: "Payment verification signature mismatch" });
      }
    }

    let monthlyRequestCount = 0;
    let amount = 0;
    if (subscriptionPlan === "Basic") {
      monthlyRequestCount = 50;
      amount = 1600;
    } else if (subscriptionPlan === "Premium") {
      monthlyRequestCount = 100;
      amount = 4000;
    } else {
      return res.status(400).json({ status: false, message: "Invalid subscription plan" });
    }

    const newPayment = await Payment.create({
      user: userId,
      email: userFound?.email,
      subscriptionPlan,
      amount,
      currency: "INR",
      status: "success",
      reference: razorpay_payment_id || "pay_mock_" + Math.random().toString(36).substring(7),
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        subscriptionPlan,
        trialPeriod: 0,
        trialActive: false,
        nextBillingDate: calculateNextBillingDate(),
        apiRequestCount: 0,
        monthlyRequestCount,
        $addToSet: { payments: newPayment?._id },
      },
      { new: true }
    );

    return res.json({
      status: true,
      message: "Razorpay payment verified, user updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log("Razorpay Verification Error:", error);
    res.status(500).json({ error: error?.message || "Verification failed" });
  }
});

// ----- Free subscription -----
const handleFreeSubscription = asyncHandler(async (req, res) => {
  const user = req?.user;
  try {
    if (shouldRenewSubcriptionPlan(user)) {
      user.subscriptionPlan = "Free";
      user.monthlyRequestCount = 5;
      user.apiRequestCount = 0;
      user.nextBillingDate = calculateNextBillingDate();

      const newPayment = await Payment.create({
        user: user?._id,
        subscriptionPlan: "Free",
        amount: 0,
        status: "success",
        reference: Math.random().toString(36).substring(7),
        monthlyRequestCount: 0,
        currency: "usd",
      });
      user.payments.push(newPayment?._id);
      await user.save();

      return res.json({
        status: "success",
        message: "Subscription plan updated successfully",
        user,
      });
    }
    return res.status(403).json({ error: "Subscription renewal not due yet" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || "Subscription error" });
  }
});

module.exports = { handleRazorpayPayment, handleFreeSubscription, verifyPayment };
