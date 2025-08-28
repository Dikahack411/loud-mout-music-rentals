const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    instrument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instrument",
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 day"],
    },
    durationType: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: [true, "Duration type is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    deposit: {
      type: Number,
      default: 0,
      min: [0, "Deposit cannot be negative"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "active",
        "completed",
        "cancelled",
        "overdue",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "partial", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["paystack", "flutterwave", "cash", "bank_transfer"],
      required: [true, "Payment method is required"],
    },
    paymentReference: {
      type: String,
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
    },
    returnLocation: {
      type: String,
      required: [true, "Return location is required"],
    },
    pickupInstructions: {
      type: String,
      maxlength: [500, "Pickup instructions cannot exceed 500 characters"],
    },
    returnInstructions: {
      type: String,
      maxlength: [500, "Return instructions cannot exceed 500 characters"],
    },
    actualReturnDate: {
      type: Date,
    },
    lateFees: {
      type: Number,
      default: 0,
      min: [0, "Late fees cannot be negative"],
    },
    damageFees: {
      type: Number,
      default: 0,
      min: [0, "Damage fees cannot be negative"],
    },
    notes: {
      type: String,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
    adminNotes: {
      type: String,
      maxlength: [1000, "Admin notes cannot exceed 1000 characters"],
    },
    cancellationReason: {
      type: String,
      maxlength: [500, "Cancellation reason cannot exceed 500 characters"],
    },
    refundAmount: {
      type: Number,
      default: 0,
      min: [0, "Refund amount cannot be negative"],
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

// Virtual for rental duration in days
rentalSchema.virtual("durationInDays").get(function () {
  const diffTime = Math.abs(this.endDate - this.startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for is overdue
rentalSchema.virtual("isOverdue").get(function () {
  if (this.status === "active" && this.endDate < new Date()) {
    return true;
  }
  return false;
});

// Virtual for total fees
rentalSchema.virtual("totalFees").get(function () {
  return this.totalAmount + this.lateFees + this.damageFees;
});

// Method to calculate late fees
rentalSchema.methods.calculateLateFees = function () {
  if (this.actualReturnDate && this.actualReturnDate > this.endDate) {
    const daysLate = Math.ceil(
      (this.actualReturnDate - this.endDate) / (1000 * 60 * 60 * 24)
    );
    const dailyRate = this.totalAmount / this.duration;
    return daysLate * dailyRate * 1.5; // 50% penalty
  }
  return 0;
};

// Method to mark as returned
rentalSchema.methods.markAsReturned = function (returnDate = new Date()) {
  this.actualReturnDate = returnDate;
  this.status = "completed";
  this.lateFees = this.calculateLateFees();
  return this.save();
};

// Pre-save middleware to validate dates
rentalSchema.pre("save", function (next) {
  if (this.startDate >= this.endDate) {
    next(new Error("End date must be after start date"));
  }
  next();
});

module.exports = mongoose.model("Rental", rentalSchema);
