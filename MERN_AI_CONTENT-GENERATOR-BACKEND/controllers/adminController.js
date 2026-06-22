const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Payment = require("../models/Payment");

// ----- Get All Users (Admin) -----
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .populate("payments")
      .sort({ createdAt: -1 });

    res.json({
      status: "success",
      count: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || "Failed to fetch user list" });
  }
});

// ----- Toggle Admin Role -----
const toggleAdminStatus = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isAdmin = !user.isAdmin;
    await user.save();
    res.json({ status: "success", message: `Admin status toggled for user: ${user.username}`, user });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

// ----- Delete User (Admin) -----
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

module.exports = { getAllUsers, toggleAdminStatus, deleteUser };
