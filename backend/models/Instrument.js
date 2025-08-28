const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Instrument name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "String",
        "Wind",
        "Percussion",
        "Keyboard",
        "Electronic",
        "Accessories",
      ],
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    images: [
      {
        type: String,
        required: [true, "At least one image is required"],
      },
    ],
    dailyRate: {
      type: Number,
      required: [true, "Daily rate is required"],
      min: [0, "Daily rate cannot be negative"],
    },
    weeklyRate: {
      type: Number,
      required: [true, "Weekly rate is required"],
      min: [0, "Weekly rate cannot be negative"],
    },
    monthlyRate: {
      type: Number,
      required: [true, "Monthly rate is required"],
      min: [0, "Monthly rate cannot be negative"],
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
    },
    serialNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    specifications: {
      type: Map,
      of: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    tags: [String],
    rentalCount: {
      type: Number,
      default: 0,
    },
    lastMaintenance: {
      type: Date,
    },
    nextMaintenance: {
      type: Date,
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
instrumentSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  category: "text",
});

// Virtual for availability status
instrumentSchema.virtual("availabilityStatus").get(function () {
  if (!this.isActive) return "Inactive";
  if (!this.isAvailable) return "Rented";
  return "Available";
});

// Method to update rental count
instrumentSchema.methods.incrementRentalCount = function () {
  this.rentalCount += 1;
  return this.save();
};

// Method to check if instrument can be rented
instrumentSchema.methods.canBeRented = function () {
  return this.isActive && this.isAvailable;
};

module.exports = mongoose.model("Instrument", instrumentSchema);
