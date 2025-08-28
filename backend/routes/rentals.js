const express = require("express");
const Rental = require("../models/Rental");
const Instrument = require("../models/Instrument");
const User = require("../models/User");
const { protect, admin } = require("../middleware/auth");

const router = express.Router();

// @desc    Create new rental
// @route   POST /api/rentals
// @access  Private
const createRental = async (req, res) => {
  try {
    const {
      instrumentId,
      startDate,
      endDate,
      duration,
      durationType,
      pickupLocation,
      returnLocation,
      pickupInstructions,
      returnInstructions,
      paymentMethod,
      notes,
    } = req.body;

    // Check if instrument exists and is available
    const instrument = await Instrument.findById(instrumentId);
    if (!instrument) {
      return res.status(404).json({ error: "Instrument not found" });
    }

    if (!instrument.canBeRented()) {
      return res
        .status(400)
        .json({ error: "Instrument is not available for rental" });
    }

    // Calculate total amount based on duration type
    let totalAmount = 0;
    switch (durationType) {
      case "daily":
        totalAmount = instrument.dailyRate * duration;
        break;
      case "weekly":
        totalAmount = instrument.weeklyRate * duration;
        break;
      case "monthly":
        totalAmount = instrument.monthlyRate * duration;
        break;
      default:
        return res.status(400).json({ error: "Invalid duration type" });
    }

    // Calculate deposit (10% of total amount)
    const deposit = totalAmount * 0.1;

    const rental = new Rental({
      user: req.user._id,
      instrument: instrumentId,
      startDate,
      endDate,
      duration,
      durationType,
      totalAmount,
      deposit,
      paymentMethod,
      pickupLocation,
      returnLocation,
      pickupInstructions,
      returnInstructions,
      notes,
      createdBy: req.user._id,
    });

    const createdRental = await rental.save();

    // Update instrument availability
    instrument.isAvailable = false;
    await instrument.save();

    // Populate the rental with instrument and user details
    await createdRental.populate("instrument user");

    res.status(201).json(createdRental);
  } catch (error) {
    console.error("Create rental error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get user rentals
// @route   GET /api/rentals/my-rentals
// @access  Private
const getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user._id })
      .populate("instrument")
      .sort({ createdAt: -1 });

    res.json(rentals);
  } catch (error) {
    console.error("Get my rentals error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get all rentals (admin)
// @route   GET /api/rentals
// @access  Private/Admin
const getAllRentals = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const statusFilter = req.query.status ? { status: req.query.status } : {};
    const userFilter = req.query.userId ? { user: req.query.userId } : {};

    const count = await Rental.countDocuments({
      ...statusFilter,
      ...userFilter,
    });

    const rentals = await Rental.find({
      ...statusFilter,
      ...userFilter,
    })
      .populate("user", "name email phone")
      .populate("instrument", "name brand model images")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      rentals,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    console.error("Get all rentals error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get rental by ID
// @route   GET /api/rentals/:id
// @access  Private
const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate("user", "name email phone address")
      .populate("instrument")
      .populate("createdBy", "name");

    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    // Check if user is authorized to view this rental
    if (
      rental.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(rental);
  } catch (error) {
    console.error("Get rental error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update rental status
// @route   PUT /api/rentals/:id/status
// @access  Private/Admin
const updateRentalStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    rental.status = status;
    if (adminNotes) {
      rental.adminNotes = adminNotes;
    }

    // If rental is completed, make instrument available again
    if (status === "completed") {
      const instrument = await Instrument.findById(rental.instrument);
      if (instrument) {
        instrument.isAvailable = true;
        await instrument.save();
      }
    }

    const updatedRental = await rental.save();
    await updatedRental.populate("user instrument");

    res.json(updatedRental);
  } catch (error) {
    console.error("Update rental status error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Mark rental as returned
// @route   PUT /api/rentals/:id/return
// @access  Private/Admin
const markAsReturned = async (req, res) => {
  try {
    const { actualReturnDate, damageFees, adminNotes } = req.body;

    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    // Mark as returned
    await rental.markAsReturned(actualReturnDate || new Date());

    // Add damage fees if any
    if (damageFees) {
      rental.damageFees = damageFees;
    }

    if (adminNotes) {
      rental.adminNotes = adminNotes;
    }

    const updatedRental = await rental.save();

    // Make instrument available again
    const instrument = await Instrument.findById(rental.instrument);
    if (instrument) {
      instrument.isAvailable = true;
      await instrument.incrementRentalCount();
    }

    await updatedRental.populate("user instrument");

    res.json(updatedRental);
  } catch (error) {
    console.error("Mark as returned error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Cancel rental
// @route   PUT /api/rentals/:id/cancel
// @access  Private
const cancelRental = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    // Check if user is authorized to cancel this rental
    if (
      rental.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Check if rental can be cancelled
    if (rental.status !== "pending" && rental.status !== "confirmed") {
      return res
        .status(400)
        .json({ error: "Rental cannot be cancelled at this stage" });
    }

    rental.status = "cancelled";
    rental.cancellationReason = cancellationReason;

    // Make instrument available again
    const instrument = await Instrument.findById(rental.instrument);
    if (instrument) {
      instrument.isAvailable = true;
      await instrument.save();
    }

    const updatedRental = await rental.save();
    await updatedRental.populate("user instrument");

    res.json(updatedRental);
  } catch (error) {
    console.error("Cancel rental error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get rental statistics
// @route   GET /api/rentals/stats
// @access  Private/Admin
const getRentalStats = async (req, res) => {
  try {
    const totalRentals = await Rental.countDocuments();
    const activeRentals = await Rental.countDocuments({ status: "active" });
    const completedRentals = await Rental.countDocuments({
      status: "completed",
    });
    const pendingRentals = await Rental.countDocuments({ status: "pending" });

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

    res.json({
      totalRentals,
      activeRentals,
      completedRentals,
      pendingRentals,
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
    });
  } catch (error) {
    console.error("Get rental stats error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Routes
router
  .route("/")
  .post(protect, createRental)
  .get(protect, admin, getAllRentals);

router.get("/my-rentals", protect, getMyRentals);
router.get("/stats", protect, admin, getRentalStats);
router.get("/:id", protect, getRentalById);
router.put("/:id/status", protect, admin, updateRentalStatus);
router.put("/:id/return", protect, admin, markAsReturned);
router.put("/:id/cancel", protect, cancelRental);

module.exports = router;
