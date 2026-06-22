const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Seed Admin user
    const adminEmail = "admin@gen.ai";
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);
      const adminUser = new User({
        username: "System Admin",
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
        subscriptionPlan: "Premium",
        monthlyRequestCount: 1000,
        trialActive: false,
        trialExpires: new Date(),
      });
      await adminUser.save();
      console.log("Admin user seeded successfully: admin@gen.ai / admin123");
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
