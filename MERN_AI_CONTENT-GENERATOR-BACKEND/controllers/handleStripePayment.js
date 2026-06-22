const asyncHandler = require("express-async-handler");
const {
  calculateNextBillingDate,
} = require("../utils/calculateNextBillingDate");
const {
  shouldRenewSubcriptionPlan,
} = require("../utils/shouldRenewsubcriptionPlan");
const Payment = require("../models/Payment");
const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ----- Create Stripe Payment Intent -----
const handlestripePayment = asyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;
  const user = req?.user;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "usd",
      metadata: {
        userId: user?._id?.toString(),
        userEmail: user?.email,
        subscriptionPlan,
      },
    });
    res.json({
      clientSecret: paymentIntent?.client_secret,
      paymentId: paymentIntent?.id,
      metadata: paymentIntent?.metadata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || "Stripe error" });
  }
});

// ----- Verify payment -----
const verifyPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    if (paymentIntent.status !== "succeeded") {
      return res
        .status(400)
        .json({ status: false, message: "Payment not succeeded yet" });
    }

    const metadata = paymentIntent?.metadata;
    const subscriptionPlan = metadata?.subscriptionPlan;
    const userEmail = metadata?.userEmail;
    const userId = metadata?.userId;

    const userFound = await User.findById(userId);
    if (!userFound) {
      return res
        .status(404)
        .json({ status: false, message: "User not found" });
    }

    const amount = paymentIntent?.amount / 100;
    const currency = paymentIntent?.currency;
    const reference = paymentIntent?.id;

    const newPayment = await Payment.create({
      user: userId,
      email: userEmail,
      subscriptionPlan,
      amount,
      currency,
      status: "success",
      reference,
    });

    let monthlyRequestCount = 0;
    if (subscriptionPlan === "Basic") {
      monthlyRequestCount = 50;
    } else if (subscriptionPlan === "Premium") {
      monthlyRequestCount = 100;
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid subscription plan" });
    }

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
      message: "Payment verified, user updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
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

module.exports = { handlestripePayment, handleFreeSubscription, verifyPayment };
