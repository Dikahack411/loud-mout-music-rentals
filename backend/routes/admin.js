const express = require("express");
const User = require("../models/User");
const Instrument = require("../models/Instrument");
const Rental = require("../models/Rental");
const { protect, admin } = require("../middleware/auth");

const router = express.Router();

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // User statistics
    const totalUsers = await User.countDocuments();
    const newUsersThisMonth = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    // Instrument statistics
    const totalInstruments = await Instrument.countDocuments();
    const availableInstruments = await Instrument.countDocuments({
      isAvailable: true,
      isActive: true,
    });
    const rentedInstruments = await Instrument.countDocuments({
      isAvailable: false,
    });

    // Rental statistics
    const totalRentals = await Rental.countDocuments();
    const activeRentals = await Rental.countDocuments({ status: "active" });
    const completedRentals = await Rental.countDocuments({
      status: "completed",
    });
    const pendingRentals = await Rental.countDocuments({ status: "pending" });

    // Revenue statistics
    const totalRevenue = await Rental.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const monthlyRevenue = await Rental.aggregate([
      {
        $match: {
          status: "completed",
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // Recent activities
    const recentRentals = await Rental.find()
      .populate("user", "name email")
      .populate("instrument", "name brand")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentUsers = await User.find()
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // Category distribution
    const categoryStats = await Instrument.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Monthly rental trends (last 6 months)
    const monthlyTrends = await Rental.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 5,
              1
            ),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({
      users: {
        total: totalUsers,
        newThisMonth: newUsersThisMonth,
      },
      instruments: {
        total: totalInstruments,
        available: availableInstruments,
        rented: rentedInstruments,
      },
      rentals: {
        total: totalRentals,
        active: activeRentals,
        completed: completedRentals,
        pending: pendingRentals,
      },
      revenue: {
        total: totalRevenue[0]?.total || 0,
        monthly: monthlyRevenue[0]?.total || 0,
      },
      recentActivities: {
        rentals: recentRentals,
        users: recentUsers,
      },
      categoryStats,
      monthlyTrends,
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get admin analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
  try {
    const { period = "month" } = req.query;
    let startDate;

    switch (period) {
      case "week":
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
        break;
      case "quarter":
        startDate = new Date(
          new Date().getFullYear(),
          Math.floor(new Date().getMonth() / 3) * 3,
          1
        );
        break;
      case "year":
        startDate = new Date(new Date().getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
    }

    // Revenue analytics
    const revenueData = await Rental.aggregate([
      { $match: { status: "completed", createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Popular instruments
    const popularInstruments = await Rental.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: "$instrument",
          rentalCount: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { rentalCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "instruments",
          localField: "_id",
          foreignField: "_id",
          as: "instrument",
        },
      },
      { $unwind: "$instrument" },
    ]);

    // User activity
    const userActivity = await Rental.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: "$user",
          rentalCount: { $sum: 1 },
          totalSpent: { $sum: "$totalAmount" },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);

    // Category performance
    const categoryPerformance = await Rental.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $lookup: {
          from: "instruments",
          localField: "instrument",
          foreignField: "_id",
          as: "instrument",
        },
      },
      { $unwind: "$instrument" },
      {
        $group: {
          _id: "$instrument.category",
          rentalCount: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    res.json({
      revenueData,
      popularInstruments,
      userActivity,
      categoryPerformance,
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get system health
// @route   GET /api/admin/health
// @access  Private/Admin
const getSystemHealth = async (req, res) => {
  try {
    // Database connection status
    const dbStatus =
      mongoose.connection.readyState === 1 ? "connected" : "disconnected";

    // Check for overdue rentals
    const overdueRentals = await Rental.countDocuments({
      status: "active",
      endDate: { $lt: new Date() },
    });

    // Check for instruments needing maintenance
    const maintenanceDue = await Instrument.countDocuments({
      nextMaintenance: { $lte: new Date() },
    });

    // Check for pending payments
    const pendingPayments = await Rental.countDocuments({
      paymentStatus: "pending",
      status: { $in: ["confirmed", "active"] },
    });

    // System metrics
    const systemMetrics = {
      database: dbStatus,
      overdueRentals,
      maintenanceDue,
      pendingPayments,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      nodeVersion: process.version,
    };

    res.json(systemMetrics);
  } catch (error) {
    console.error("Get system health error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Send system notification
// @route   POST /api/admin/notifications
// @access  Private/Admin
const sendNotification = async (req, res) => {
  try {
    const { type, message, recipients, data } = req.body;

    // TODO: Implement notification system
    // This could integrate with email services, push notifications, etc.

    res.json({
      message: "Notification sent successfully",
      type,
      recipients: recipients?.length || 0,
    });
  } catch (error) {
    console.error("Send notification error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Export data
// @route   GET /api/admin/export/:type
// @access  Private/Admin
const exportData = async (req, res) => {
  try {
    const { type } = req.params;
    const { format = "json" } = req.query;

    let data;

    switch (type) {
      case "rentals":
        data = await Rental.find()
          .populate("user", "name email phone")
          .populate("instrument", "name brand model category")
          .sort({ createdAt: -1 });
        break;
      case "instruments":
        data = await Instrument.find()
          .populate("createdBy", "name")
          .sort({ createdAt: -1 });
        break;
      case "users":
        data = await User.find().select("-password").sort({ createdAt: -1 });
        break;
      default:
        return res.status(400).json({ error: "Invalid export type" });
    }

    if (format === "csv") {
      // TODO: Implement CSV export
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${type}_${Date.now()}.csv`
      );
      res.send("CSV export not implemented yet");
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error("Export data error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Routes
router.get("/dashboard", protect, admin, getDashboardStats);
router.get("/analytics", protect, admin, getAnalytics);
router.get("/health", protect, admin, getSystemHealth);
router.post("/notifications", protect, admin, sendNotification);
router.get("/export/:type", protect, admin, exportData);

module.exports = router;
