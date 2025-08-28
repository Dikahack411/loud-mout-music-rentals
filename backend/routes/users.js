const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/auth");

const router = express.Router();

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          $or: [
            {
              name: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
            {
              email: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const roleFilter = req.query.role ? { role: req.query.role } : {};

    const count = await User.countDocuments({
      ...keyword,
      ...roleFilter,
    });

    const users = await User.find({
      ...keyword,
      ...roleFilter,
    })
      .select("-password")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      users,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get user by ID (admin)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("rentalHistory")
      .populate("favorites");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update user (admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.role = req.body.role || user.role;
      user.address = req.body.address || user.address;
      user.isVerified =
        req.body.isVerified !== undefined
          ? req.body.isVerified
          : user.isVerified;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        address: updatedUser.address,
        isVerified: updatedUser.isVerified,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get user statistics (admin)
// @route   GET /api/users/stats
// @access  Private/Admin
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const adminUsers = await User.countDocuments({ role: "admin" });
    const regularUsers = await User.countDocuments({ role: "user" });

    const newUsersThisMonth = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    res.json({
      totalUsers,
      verifiedUsers,
      adminUsers,
      regularUsers,
      newUsersThisMonth,
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Routes
router.route("/").get(protect, admin, getUsers);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

router.get("/stats", protect, admin, getUserStats);

module.exports = router;
