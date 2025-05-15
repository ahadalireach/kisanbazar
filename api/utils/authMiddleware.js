const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// Middleware to protect routes
exports.verifyToken = async (req, res, next) => {
  let token;

  // Check if auth header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Not authorized as an admin" });
  }
};

// Middleware to check if user is farmer
exports.isFarmer = (req, res, next) => {
  if (req.user && req.user.role === "farmer") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Not authorized as a farmer" });
  }
};

// Middleware to check if user is consumer
exports.isConsumer = (req, res, next) => {
  if (req.user && req.user.role === "consumer") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Not authorized as a consumer" });
  }
};
