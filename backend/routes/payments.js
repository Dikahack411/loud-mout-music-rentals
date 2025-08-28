const express = require("express");
const Rental = require("../models/Rental");
const { protect } = require("../middleware/auth");
// Ensure fetch is available in all Node runtimes
const { fetch } = require("undici");

const router = express.Router();

// @desc    Initialize payment with Paystack
// @route   POST /api/payments/paystack/initialize
// @access  Private
const initializePaystackPayment = async (req, res) => {
  try {
    const { rentalId, email, amount, callbackUrl } = req.body;

    const rental = await Rental.findById(rentalId)
      .populate("user")
      .populate("instrument");

    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    // Verify user owns this rental
    if (rental.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const paystackData = {
      email: email || rental.user.email,
      amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
      reference: `RENTAL_${rental._id}_${Date.now()}`,
      callback_url: callbackUrl || `${process.env.FRONTEND_URL}/payment/verify`,
      metadata: {
        rental_id: rental._id.toString(),
        user_id: req.user._id.toString(),
        instrument_name: rental.instrument.name,
        duration: `${rental.duration} ${rental.durationType}`,
      },
    };

    // Initialize Paystack transaction
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paystackData),
      }
    );

    const result = await response.json();

    if (result.status) {
      // Update rental with payment reference
      rental.paymentReference = paystackData.reference;
      await rental.save();

      res.json({
        authorization_url: result.data.authorization_url,
        reference: paystackData.reference,
        access_code: result.data.access_code,
      });
    } else {
      res.status(400).json({ error: "Payment initialization failed" });
    }
  } catch (error) {
    console.error("Paystack initialization error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Verify Paystack payment
// @route   GET /api/payments/paystack/verify/:reference
// @access  Public
const verifyPaystackPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const result = await response.json();

    if (result.status && result.data.status === "success") {
      // Find rental by payment reference
      const rental = await Rental.findOne({ paymentReference: reference })
        .populate("user")
        .populate("instrument");

      if (!rental) {
        return res.status(404).json({ error: "Rental not found" });
      }

      // Update rental payment status
      rental.paymentStatus = "paid";
      rental.status = "confirmed";
      await rental.save();

      res.json({
        success: true,
        message: "Payment verified successfully",
        rental: {
          id: rental._id,
          status: rental.status,
          paymentStatus: rental.paymentStatus,
          totalAmount: rental.totalAmount,
          instrument: rental.instrument.name,
        },
      });
    } else {
      res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Paystack verification error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Initialize payment with Flutterwave
// @route   POST /api/payments/flutterwave/initialize
// @access  Private
const initializeFlutterwavePayment = async (req, res) => {
  try {
    const { rentalId, email, amount, callbackUrl } = req.body;

    const rental = await Rental.findById(rentalId)
      .populate("user")
      .populate("instrument");

    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }

    // Verify user owns this rental
    if (rental.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const flutterwaveData = {
      tx_ref: `RENTAL_${rental._id}_${Date.now()}`,
      amount: amount,
      currency: "NGN",
      redirect_url: callbackUrl || `${process.env.FRONTEND_URL}/payment/verify`,
      customer: {
        email: email || rental.user.email,
        name: rental.user.name,
        phone_number: rental.user.phone,
      },
      customizations: {
        title: "Musical Instrument Rental",
        description: `Rental for ${rental.instrument.name}`,
        logo: `${process.env.FRONTEND_URL}/logo.png`,
      },
      meta: {
        rental_id: rental._id.toString(),
        user_id: req.user._id.toString(),
        instrument_name: rental.instrument.name,
        duration: `${rental.duration} ${rental.durationType}`,
      },
    };

    // Initialize Flutterwave transaction
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flutterwaveData),
    });

    const result = await response.json();

    if (result.status === "success") {
      // Update rental with payment reference
      rental.paymentReference = flutterwaveData.tx_ref;
      await rental.save();

      res.json({
        payment_url: result.data.link,
        reference: flutterwaveData.tx_ref,
        status: result.status,
      });
    } else {
      res.status(400).json({ error: "Payment initialization failed" });
    }
  } catch (error) {
    console.error("Flutterwave initialization error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Verify Flutterwave payment
// @route   GET /api/payments/flutterwave/verify/:transactionId
// @access  Public
const verifyFlutterwavePayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const result = await response.json();

    if (result.status === "success" && result.data.status === "successful") {
      // Find rental by payment reference
      const rental = await Rental.findOne({
        paymentReference: result.data.tx_ref,
      })
        .populate("user")
        .populate("instrument");

      if (!rental) {
        return res.status(404).json({ error: "Rental not found" });
      }

      // Update rental payment status
      rental.paymentStatus = "paid";
      rental.status = "confirmed";
      await rental.save();

      res.json({
        success: true,
        message: "Payment verified successfully",
        rental: {
          id: rental._id,
          status: rental.status,
          paymentStatus: rental.paymentStatus,
          totalAmount: rental.totalAmount,
          instrument: rental.instrument.name,
        },
      });
    } else {
      res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Flutterwave verification error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get payment history
// @route   GET /api/payments/history
// @access  Private
const getPaymentHistory = async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user._id })
      .populate("instrument", "name brand model images")
      .sort({ createdAt: -1 });

    const paymentHistory = rentals.map((rental) => ({
      id: rental._id,
      instrument: rental.instrument,
      amount: rental.totalAmount,
      paymentStatus: rental.paymentStatus,
      paymentMethod: rental.paymentMethod,
      paymentReference: rental.paymentReference,
      status: rental.status,
      createdAt: rental.createdAt,
    }));

    res.json(paymentHistory);
  } catch (error) {
    console.error("Get payment history error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Routes
router.post("/paystack/initialize", protect, initializePaystackPayment);
router.get("/paystack/verify/:reference", verifyPaystackPayment);
router.post("/flutterwave/initialize", protect, initializeFlutterwavePayment);
router.get("/flutterwave/verify/:transactionId", verifyFlutterwavePayment);
router.get("/history", protect, getPaymentHistory);

module.exports = router;
