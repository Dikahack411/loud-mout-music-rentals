const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes - require authentication
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ error: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Not authorized as admin" });
  }
};

// Optional auth - doesn't require authentication but adds user if available
const optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      // Token is invalid but we don't fail the request
      console.error("Optional auth error:", error);
    }
  }

  next();
};

// Verify email middleware
const requireEmailVerification = (req, res, next) => {
  if (req.user && !req.user.isVerified) {
    return res.status(403).json({
      error: "Email verification required",
      message: "Please verify your email address before proceeding",
    });
  }
  next();
};

module.exports = {
  protect,
  admin,
  optionalAuth,
  requireEmailVerification,
};
