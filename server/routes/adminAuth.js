const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/user");
const Event = require("../models/event");
const FAQ = require("../models/faq");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { verifyAdminToken, verifySuperAdmin } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

// Admin Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  wrapAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new ExpressError(400, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new ExpressError(400, "Invalid credentials");
    }

    // Create admin token (Separate from User token)
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      success: true,
      message: "Admin logged in successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  }),
);

// Super Admin Create Admin
router.post(
  "/create-admin",
  verifyAdminToken,
  verifySuperAdmin,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  wrapAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new ExpressError(400, "Admin already exists with that email");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "admin", // New admins are standard admins
      createdBy: req.admin.id,
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  }),
);

// Admin Dashboard
router.get(
  "/dashboard",
  verifyAdminToken,
  wrapAsync(async (req, res) => {
    // Fetch real-time statistics from the database
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalAdmins = await Admin.countDocuments();
    const totalFAQs = await FAQ.countDocuments();

    res.json({
      success: true,
      message: "Welcome to the Admin Dashboard",
      data: {
        admin: req.admin,
        stats: {
          totalUsers,
          totalEvents,
          totalAdmins,
          totalFAQs,
        },
      },
    });
  }),
);

module.exports = router;
