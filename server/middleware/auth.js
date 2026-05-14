const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");

// Verify User Token (Users cannot access admin routes)
const verifyUserToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ExpressError(401, "You must be logged in as a user"));
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifying against JWT_USER_SECRET specifically
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    if (decoded.role !== "user") {
        return next(new ExpressError(403, "Invalid token role"));
    }
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ExpressError(401, "Invalid or expired user token"));
  }
};

// Verify Admin Token (Admins cannot use user tokens)
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ExpressError(401, "You must be logged in as an admin"));
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifying against JWT_ADMIN_SECRET specifically
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    if (decoded.role !== "admin" && decoded.role !== "super-admin") {
      return next(new ExpressError(403, "Invalid token role"));
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return next(new ExpressError(401, "Invalid or expired admin token"));
  }
};

// Verify Super Admin
const verifySuperAdmin = (req, res, next) => {
  if (req.admin.role !== "super-admin") {
    return next(new ExpressError(403, "You do not have permission to perform this action. Super-admin required."));
  }
  next();
};

// Generic isLoggedIn (Accepts either User OR Admin tokens)
const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ExpressError(401, "You must be logged in"));
  }

  const token = authHeader.split(" ")[1];

  // Try User Secret first
  try {
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    // If user check fails, try Admin Secret
    try {
      const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
      req.admin = decoded;
      req.user = decoded; // Set both for compatibility
      return next();
    } catch (err2) {
      return next(new ExpressError(401, "Invalid or expired token"));
    }
  }
};

// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).json({ success: false, message: message });
};

module.exports = { verifyUserToken, verifyAdminToken, verifySuperAdmin, isLoggedIn, errorHandler };
