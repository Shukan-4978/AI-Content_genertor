const express = require("express");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();
const usersRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
const openAIRouter = require("./routes/openAIRouter");
const razorpayRouter = require("./routes/razorpayRouter");
const adminRouter = require("./routes/adminRouter");
const User = require("./models/User");
const connectDB = require("./utils/connectDB");
require("dotenv").config();

console.log("API_KEY:", process.env.API_KEY);
console.log("PORT:", process.env.PORT);

connectDB();

const app = express();
const PORT = process.env.PORT || 8090;

// Cron for the trial period: runs every hour
cron.schedule("0 * * * *", async () => {
  try {
    const today = new Date();
    const updatedUser = await User.updateMany(
      { trialActive: true, trialExpires: { $lt: today } },
      {
        trialActive: false,
        subscriptionPlan: "Free",
        monthlyRequestCount: 5,
      }
    );
    console.log("Trial cron:", updatedUser?.modifiedCount ?? 0, "users updated");
  } catch (error) {
    console.log(error);
  }
});

// Cron for Free plan: runs on the 1st of every month at 00:00
cron.schedule("0 0 1 * *", async () => {
  try {
    const today = new Date();
    await User.updateMany(
      { subscriptionPlan: "Free", nextBillingDate: { $lt: today } },
      { monthlyRequestCount: 0 }
    );
  } catch (error) {
    console.log(error);
  }
});

// Cron for Basic plan: runs on the 1st of every month at 00:00
cron.schedule("0 0 1 * *", async () => {
  try {
    const today = new Date();
    await User.updateMany(
      { subscriptionPlan: "Basic", nextBillingDate: { $lt: today } },
      { monthlyRequestCount: 0 }
    );
  } catch (error) {
    console.log(error);
  }
});

// Cron for Premium plan: runs on the 1st of every month at 00:00
cron.schedule("0 0 1 * *", async () => {
  try {
    const today = new Date();
    await User.updateMany(
      { subscriptionPlan: "Premium", nextBillingDate: { $lt: today } },
      { monthlyRequestCount: 0 }
    );
  } catch (error) {
    console.log(error);
  }
});

// ---- middlewares ----
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// ---- Routes ----
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully!" });
});
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/razorpay", razorpayRouter);
app.use("/api/v1/admin", adminRouter);

// ---- Error handler ----
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
