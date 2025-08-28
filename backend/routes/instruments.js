const express = require("express");
const Instrument = require("../models/Instrument");
const { protect, admin, optionalAuth } = require("../middleware/auth");

const router = express.Router();

// @desc    Get all instruments
// @route   GET /api/instruments
// @access  Public
const getInstruments = async (req, res) => {
  try {
    const pageSize = 12;
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
              description: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
            {
              brand: {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const categoryFilter = req.query.category
      ? { category: req.query.category }
      : {};
    const conditionFilter = req.query.condition
      ? { condition: req.query.condition }
      : {};
    const availabilityFilter =
      req.query.available === "true"
        ? { isAvailable: true, isActive: true }
        : {};

    const count = await Instrument.countDocuments({
      ...keyword,
      ...categoryFilter,
      ...conditionFilter,
      ...availabilityFilter,
    });

    const instruments = await Instrument.find({
      ...keyword,
      ...categoryFilter,
      ...conditionFilter,
      ...availabilityFilter,
    })
      .populate("createdBy", "name")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      instruments,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    console.error("Get instruments error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get single instrument
// @route   GET /api/instruments/:id
// @access  Public
const getInstrumentById = async (req, res) => {
  try {
    const instrument = await Instrument.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (instrument) {
      res.json(instrument);
    } else {
      res.status(404).json({ error: "Instrument not found" });
    }
  } catch (error) {
    console.error("Get instrument error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Create a instrument
// @route   POST /api/instruments
// @access  Private/Admin
const createInstrument = async (req, res) => {
  try {
    const instrument = new Instrument({
      ...req.body,
      createdBy: req.user._id,
    });

    const createdInstrument = await instrument.save();
    res.status(201).json(createdInstrument);
  } catch (error) {
    console.error("Create instrument error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update a instrument
// @route   PUT /api/instruments/:id
// @access  Private/Admin
const updateInstrument = async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      brand,
      model,
      description,
      images,
      dailyRate,
      weeklyRate,
      monthlyRate,
      condition,
      serialNumber,
      specifications,
      isAvailable,
      isActive,
      location,
      tags,
      lastMaintenance,
      nextMaintenance,
      notes,
    } = req.body;

    const instrument = await Instrument.findById(req.params.id);

    if (instrument) {
      instrument.name = name || instrument.name;
      instrument.category = category || instrument.category;
      instrument.subcategory = subcategory || instrument.subcategory;
      instrument.brand = brand || instrument.brand;
      instrument.model = model || instrument.model;
      instrument.description = description || instrument.description;
      instrument.images = images || instrument.images;
      instrument.dailyRate = dailyRate || instrument.dailyRate;
      instrument.weeklyRate = weeklyRate || instrument.weeklyRate;
      instrument.monthlyRate = monthlyRate || instrument.monthlyRate;
      instrument.condition = condition || instrument.condition;
      instrument.serialNumber = serialNumber || instrument.serialNumber;
      instrument.specifications = specifications || instrument.specifications;
      instrument.isAvailable =
        isAvailable !== undefined ? isAvailable : instrument.isAvailable;
      instrument.isActive =
        isActive !== undefined ? isActive : instrument.isActive;
      instrument.location = location || instrument.location;
      instrument.tags = tags || instrument.tags;
      instrument.lastMaintenance =
        lastMaintenance || instrument.lastMaintenance;
      instrument.nextMaintenance =
        nextMaintenance || instrument.nextMaintenance;
      instrument.notes = notes || instrument.notes;

      const updatedInstrument = await instrument.save();
      res.json(updatedInstrument);
    } else {
      res.status(404).json({ error: "Instrument not found" });
    }
  } catch (error) {
    console.error("Update instrument error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Delete a instrument
// @route   DELETE /api/instruments/:id
// @access  Private/Admin
const deleteInstrument = async (req, res) => {
  try {
    const instrument = await Instrument.findById(req.params.id);

    if (instrument) {
      await instrument.remove();
      res.json({ message: "Instrument removed" });
    } else {
      res.status(404).json({ error: "Instrument not found" });
    }
  } catch (error) {
    console.error("Delete instrument error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get instrument categories
// @route   GET /api/instruments/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Instrument.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get instrument subcategories
// @route   GET /api/instruments/subcategories/:category
// @access  Public
const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Instrument.distinct("subcategory", {
      category: req.params.category,
    });
    res.json(subcategories);
  } catch (error) {
    console.error("Get subcategories error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Toggle favorite instrument
// @route   POST /api/instruments/:id/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const user = req.user;
    const instrumentId = req.params.id;

    const isFavorite = user.favorites.includes(instrumentId);

    if (isFavorite) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== instrumentId
      );
    } else {
      user.favorites.push(instrumentId);
    }

    await user.save();
    res.json({
      message: isFavorite ? "Removed from favorites" : "Added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Toggle favorite error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Routes
router
  .route("/")
  .get(optionalAuth, getInstruments)
  .post(protect, admin, createInstrument);

router
  .route("/:id")
  .get(getInstrumentById)
  .put(protect, admin, updateInstrument)
  .delete(protect, admin, deleteInstrument);

router.get("/categories", getCategories);
router.get("/subcategories/:category", getSubcategories);
router.post("/:id/favorite", protect, toggleFavorite);

module.exports = router;
